import { Repository } from "typeorm";
import jwt from "jsonwebtoken";

import { AppDataSource } from "@/config/database.config";
import { User } from "@/modules/users/entities/user.entity";

import { AppError } from "@/common/error.response";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorCode } from "@/constants/error-code";
import {CreateUserDto} from "./dto/user.dto"
import {UserResponseDto} from "./dto/user.dto"
import {PasswordUtils} from "@/utils/password.util"


export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  // async getAll(): Promise<User[]> {
  //   return await this.userRepository.find();
  // }

  async registerUser(userData: CreateUserDto): Promise<{ user: UserResponseDto, token: string }> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: { phone_number: userData.phone_number }
      });

      if (existingUser) {
        throw new Error('User already exit');
      }

      const hashedPassword = await PasswordUtils.hashPassword(userData.password);

      const user = this.userRepository.create({
        ...userData,
        password: hashedPassword
      });

      const savedUser = await this.userRepository.save(user);

      const token = jwt.sign(
        { userId: savedUser.id, email: savedUser.email },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      // Map entity to response DTO (loại bỏ password)
      const userResponse = UserMapper.toResponseDto(savedUser);

      return {
        user: userResponse,
        token
      };
    } catch (error) {
      throw error;
    }
  }

  async loginUser(loginData: LoginDto): Promise<{ user: UserResponseDto, token: string }> {
    try {
      // Tìm user theo email
      const user = await this.userRepository.findOne({
        where: { email: loginData.email, isActive: true }
      });

      if (!user) {
        throw new Error('Email hoặc mật khẩu không chính xác');
      }

      // Kiểm tra password
      const isPasswordValid = await PasswordUtils.comparePassword(loginData.password, user.password);
      if (!isPasswordValid) {
        throw new Error('Email hoặc mật khẩu không chính xác');
      }

      // Tạo JWT token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      // Map entity to response DTO (loại bỏ password)
      const userResponse = UserMapper.toResponseDto(user);

      return {
        user: userResponse,
        token
      };
    } catch (error) {
      throw error;
    }
  }

  // async getById(id: number): Promise<User> {
  //   const userExists = await this.userRepository.findOne({
  //     where: { id },
  //   });
  //   if (!userExists) {
  //     throw new AppError(
  //       ErrorMessages.USER_NOT_FOUND,
  //       HttpStatusCode.NOT_FOUND,
  //       ErrorCode.USER_NOT_FOUND
  //     );
  //   }
  //   return userExists;
  // }

  // async create(userDto: CreateUserDto): Promise<User> {
  //   const findUserExists: number = await this.userRepository.count({
  //     where: { email: userDto.email },
  //   });
  //   if (findUserExists > 0) {
  //     throw new AppError(
  //       ErrorMessages.EMAIL_EXISTS,
  //       HttpStatusCode.CONFLICT,
  //       ErrorCode.EMAIL_ALREADY_EXISTS
  //     );
  //   }
  //   const newUser: User = this.userRepository.create({
  //     name: userDto.name,
  //     email: userDto.email,
  //   });
  //   await this.userRepository.save(newUser);
  //   return newUser;
  // }
}

export default new UserService();