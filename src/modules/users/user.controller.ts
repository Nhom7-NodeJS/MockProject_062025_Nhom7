import { Request, Response } from "express";
import { HttpStatusCode } from "@/constants/status-code";
import { AppResponse } from "@/common/success.response";
import { PaginationUtils } from "@/utils/pagination";
import { UserStatus } from "./enums/user.enum";
import UserService from "./user.service";

class UserController {
  async getPaginatedUsers(req: Request, res: Response) {
    const status = req.query.status as UserStatus | undefined;
    
    const paginationParams = PaginationUtils.getPaginationParams(req);
    
    const result = await UserService.getPaginatedUsers(paginationParams, status);
    
    const paginatedResponse = PaginationUtils.createPaginatedResponse(
      req,
      result.items,
      result.total
    );

    return new AppResponse({
      message: "Paginated users retrieved successfully",
      statusCode: HttpStatusCode.OK,
      data: paginatedResponse
    }).sendResponse(res);
  }

  async getUserDetail(req: Request, res: Response) {
    const { username } = req.params as { username: string };
    
    const user = await UserService.getDetailUser(username);
    
    return new AppResponse({
      message: "User detail retrieved successfully",
      statusCode: HttpStatusCode.OK,
      data: user
    }).sendResponse(res);
  }

  async editUser(req: Request, res: Response) {
    const { username } = req.params as { username: string };
    const updateData = req.body;
    
    const updatedUser = await UserService.editUserDetail(username, updateData);
    
    return new AppResponse({
      message: "User updated successfully",
      statusCode: HttpStatusCode.OK,
      data: updatedUser
    }).sendResponse(res);
  }
}

export default new UserController();