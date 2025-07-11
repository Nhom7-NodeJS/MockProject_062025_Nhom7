import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

import { AppDataSource } from "@/config/config-database";
import { User } from "@/modules/users/entities/user.entity";
import { LoginDto } from "./dto/login.dto";
import { AppError } from "@/common/error.response";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorMessages } from "@/constants/message";
import { ErrorCode } from "@/constants/error-code";
import { Role } from "@/modules/roles/entities/role.entity";

class AuthService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  public async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { username, password } = loginDto;

    const user = await this.userRepository.findOne({
      where: { username, is_deleted: false },
      relations: ["role"],
    });

    if (!user) {
      throw new AppError(
        ErrorMessages.INVALID_CREDENTIALS || "Invalid username or password",
        HttpStatusCode.UNAUTHORIZED,
        ErrorCode.INVALID_CREDENTIALS
      );
    }

    const checkPassword = await bcrypt.compare(password, user.password_hash);

    if (!checkPassword) {
      throw new AppError(
        ErrorMessages.INVALID_CREDENTIALS || "Invalid username or password",
        HttpStatusCode.UNAUTHORIZED,
        ErrorCode.INVALID_CREDENTIALS
      );
    }
    if(!user.role) {
        throw new AppError(
            "User role not found",
            HttpStatusCode.UNAUTHORIZED,
            ErrorCode.INVALID_CREDENTIALS
        );
    }
    const payload = {
      username: user.username,
      role: user.role.role_id,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET || "your-secret-key", {
      expiresIn: "1h",
    });

    return { accessToken }; 
  }
}

export default new AuthService();