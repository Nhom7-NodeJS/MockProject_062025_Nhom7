import { Repository } from "typeorm";

import { AppDataSource } from "@/config/config-database";
import { User } from "@/modules/users/entities/user.entity";

import { AppError } from "@/common/error.response";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorCode } from "@/constants/error-code";
import { CreateUserDto } from "./dto/user.dto";

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(id: number): Promise<User> {
    const userExists = await this.userRepository.findOne({
      where: { id },
    });
    if (!userExists) {
      throw new AppError(
        ErrorMessages.USER_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.USER_NOT_FOUND
      );
    }
    return userExists;
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const findUserExists: number = await this.userRepository.count({
      where: { email: userDto.email },
    });
    if (findUserExists > 0) {
      throw new AppError(
        ErrorMessages.EMAIL_EXISTS,
        HttpStatusCode.CONFLICT,
        ErrorCode.EMAIL_ALREADY_EXISTS
      );
    }
    const newUser: User = this.userRepository.create({
      name: userDto.name,
      email: userDto.email,
    });
    await this.userRepository.save(newUser);
    return newUser;
  }
}

export default new UserService();
