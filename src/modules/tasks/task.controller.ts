import { Request, Response } from 'express';
import { AppResponse } from "@/common/success.response";
import { HttpStatusCode } from "@/constants/status-code";
import { SuccessMessages } from "@/constants/message";
import { CreateTaskDto } from "./dto/create-task.dto";

import taskService from "./task.service";

class TaskController {
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
