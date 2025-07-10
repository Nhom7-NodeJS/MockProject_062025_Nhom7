import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

import { Task } from "./entities/task.entity";
import { AppDataSource } from "@/config/config-database";
import { CaseUser } from "@/modules/cases_users/entities/case_user.entity";
import { AppError } from "@/common/error.response";
import { HttpStatusCode } from "@/constants/status-code";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./enums/task.enum";

export class TaskService {
  private taskRepository: Repository<Task>;
  private caseUserRepository: Repository<CaseUser>;

  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task);
    this.caseUserRepository = AppDataSource.getRepository(CaseUser);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    // Check if the case-user assignment exists
    const caseUser = await this.caseUserRepository.findOne({
      where: {
        case_id: createTaskDto.case_id,
        username: createTaskDto.username,
      },
    });

    if (!caseUser) {
      throw new AppError(
        'User is not assigned to this case',
        HttpStatusCode.NOT_FOUND,
        'USER_NOT_ASSIGNED_TO_CASE'
      );
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      task_id: uuidv4(),
      status: createTaskDto.status || TaskStatus.WAITING_EXECUTING,
    });

    return this.taskRepository.save(task);
  }
}

export default new TaskService();
