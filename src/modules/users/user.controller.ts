import { Request, Response } from "express";

import userService from "@/modules/users/user.service";

import { AppResponse } from "@/common/success.response";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorMessages, SuccessMessages } from "@/constants/message";
import { AppError } from "@/common/error.response";
import { ErrorCode } from "@/constants/error-code";

import { CreateUserDto, UserResponseDto } from "./dto/user.dto";
import { toUserResponseDto } from "./user.mapper";

class UserController {
  async getAll(req: Request, res: Response) {
    return new AppResponse({
      message: SuccessMessages.USER.USER_GET,
      statusCode: HttpStatusCode.OK,
    }).sendResponse(res);
  }
}

export default new UserController();
