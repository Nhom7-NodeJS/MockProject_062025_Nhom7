import { Request, Response } from "express";

import { AuthenticatedRequest } from "@/middlewares/auth.middleware";
import { AppResponse } from "@/common/success.response";
import { ErrorMessages, SuccessMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";

import taskService from "./task.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { AppError } from "@/common/error.response";
import { ErrorCode } from "@/constants/error-code";

export class TaskController {
  async getAllTaskByRoleId(req: AuthenticatedRequest, res: Response) {
    const user = req.user;
    if (!user) {
      throw new AppError(
        ErrorMessages.UNAUTHORIZED,
        HttpStatusCode.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED
      );
    }

    const { caseId } = req.params;
    const result = await taskService.getAllTaskByCaseId(
      user.username,
      user.role,
      caseId
    );

    return new AppResponse({
      message: SuccessMessages.TASK.TASK_GET,
      statusCode: HttpStatusCode.OK,
      data: result,
    }).sendResponse(res);
  }

  async getTaskDetailById(req: Request, res: Response) {
    const { roleId, taskId } = req.params;
    const result = await taskService.getTaskDetailById(roleId, taskId);

    return new AppResponse({
      message: SuccessMessages.TASK.TASK_GET,
      statusCode: HttpStatusCode.OK,
      data: result,
    }).sendResponse(res);
  }

  async changeTaskStatus(req: Request, res: Response) {
    const { taskId } = req.params;

    const result = await taskService.changeTaskStatus(taskId);

    return new AppResponse({
      message: SuccessMessages.TASK.TASK_UPDATED,
      statusCode: HttpStatusCode.OK,
      data: result,
    }).sendResponse(res);
  }

  async createTask(req: Request, res: Response) {
    const createTaskDto = req.body as CreateTaskDto;

    const task = await taskService.createTask(createTaskDto);

    return new AppResponse({
      message: SuccessMessages.TASK.TASK_CREATED,
      statusCode: HttpStatusCode.CREATED,
      data: task,
    }).sendResponse(res);
  }
}
export default new TaskController();
