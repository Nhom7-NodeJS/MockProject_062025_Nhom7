import { sign, verify, SignOptions } from "jsonwebtoken";
import { Repository } from "typeorm";
import { User } from "@/modules/users/entities/user.entity";
import { Role } from "@/modules/roles/entities/role.entity";
import { AppDataSource } from "@/config/config-database";
import { compare, hash } from "bcryptjs";
import { AppError } from "@/common/error.response";
import { HttpStatusCode } from "@/constants/status-code";
import { RoleType } from "@/constants/role-type";
import { UserStatus } from "@/modules/users/enums/user.enum";
import { LoginResponseDto } from "./dto/login.dto";

export class AuthService {
  private userRepository: Repository<User>;
  private roleRepository: Repository<Role>;
  private readonly JWT_SECRET: string;
  private readonly JWT_EXPIRES_IN: string;
  private readonly SALT_ROUNDS: number;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.roleRepository = AppDataSource.getRepository(Role);
    this.JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
    this.JWT_EXPIRES_IN = "1d";
    this.SALT_ROUNDS = 10;
  }

  async validateUser(username: string, password: string): Promise<LoginResponseDto | null> {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .leftJoin("user.role", "role")
      .where("user.username = :username", { username })
      .andWhere("user.is_deleted = false")
      .select([
        "user.username AS username",
        "user.password_hash AS password_hash",
        "role.role_id AS role",
      ])
      .getRawOne();

    if (!user || !(await compare(password, user.password_hash))) {
      return null;
    }

    const token = this.generateToken(user);
    
    return {
      accessToken: token,
      user: {
        username: user.username,
        role: user.role
      }
    };
  }

  generateToken(user: User): string {
    const payload = {
      username: user.username,
      role: user.role,
    };

    const options: SignOptions = {
      expiresIn: "1d" as const,
    };

    return sign(payload, this.JWT_SECRET, options);
  }

  async signup(userData: {
    username: string;
    password: string;
    fullname: string;
    avatar_url?: string;
    dob: Date;
    phone_number?: string;
    gender?: any;
    date_attended: Date;
    roleType?: RoleType;
  }): Promise<LoginResponseDto | null> {
    const {
      username,
      password,
      fullname,
      dob,
      roleType = RoleType.CENSOR,
    } = userData;

    // Check if username or email already exists
    const existingUser = await this.userRepository
      .createQueryBuilder("user")
      .where("user.username = :username", { username })
      .andWhere("user.is_deleted = false")
      .getOne();

    if (existingUser) {
      throw new AppError(
        "Username or email already exists",
        HttpStatusCode.CONFLICT,
        "USER_ALREADY_EXISTS"
      );
    }

    // Get the default role ()
    const role = await this.roleRepository.findOne({
      where: { role_id: roleType },
    });

    if (!role) {
      throw new AppError(
        "Default role not found",
        HttpStatusCode.NOT_FOUND,
        "ROLE_NOT_FOUND"
      );
    }

    // Hash password
    const hashedPassword = await hash(password, this.SALT_ROUNDS);

    // Create and save the new user
    const newUser = this.userRepository.create({
      username,
      password_hash: hashedPassword,
      fullname,
      avatar_url: userData.avatar_url,
      dob,
      phone_number: userData.phone_number,
      gender: userData.gender,
      date_attended: userData.date_attended,
      create_at: new Date(),      
      role,
      status: UserStatus.ACTIVE,
    });

    const savedUser = await this.userRepository.save(newUser);
    
    if (!savedUser) {
      return null;
    }

    const token = this.generateToken(savedUser);
    
    return {
      accessToken: token,
      user: {
        username: savedUser.username,
        role: savedUser.role.role_id,
      },
    };
  }

  verifyToken(token: string): any {
    try {
      return verify(token, this.JWT_SECRET);
    } catch (error) {
      return null;
    }
  }

  async refreshToken(refreshToken: string) {
    const payload = this.verifyToken(refreshToken);
    if (!payload) {
      throw new AppError(
        "Invalid refresh token",
        HttpStatusCode.UNAUTHORIZED,
        "INVALID_REFRESH_TOKEN"
      );
    }

    const user = await this.userRepository.findOne({
      where: { username: payload.username },
      relations: ["role"],
    });

    if (!user) {
      throw new AppError(
        "User not found",
        HttpStatusCode.NOT_FOUND,
        "USER_NOT_FOUND"
      );
    }

    return this.generateToken(user);
  }
}

export default new AuthService();
