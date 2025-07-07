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
}

export default new UserService();
