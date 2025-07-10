import { NextFunction, Request, Response } from "express";

import { AppResponse } from "@/common/success.response";
import { SuccessMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";

import taskService from "./task.service";

export class TaskController {
  async getAllTaskByRoleId(req: Request, res: Response) {
    const { username, roleId, caseId } = req.params;
    const result = await taskService.getAllTaskByCaseId(
      username,
      roleId,
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
}

export default new TaskController();
