import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

import { AppDataSource } from "@/config/database.config";
import { AppError } from "@/common/error.response";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorCode } from "@/constants/error-code";
import { Task } from "./entities/task.entity";
import { CaseUser } from "@/modules/cases_users/entities/case_user.entity";
import { TaskStatus } from "./enums/task.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskDetailResponseDto } from "./dto/task_detail-response.dto";

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
  async getAllTaskByCaseId(
    username: string,
    roleId: string,
    caseId: string
  ): Promise<Task[]> {
    const taskList = await this.taskRepository
      .createQueryBuilder("task")
      .leftJoin("task.caseUser", "caseUser")
      .leftJoin("caseUser.user", "user")
      .leftJoin("user.role", "role")
      .where("user.username = :username", { username: username })
      .andWhere("user.role_id = :roleId", { roleId: roleId })
      .andWhere("caseUser.case_id = :caseId", { caseId: caseId })
      .andWhere("task.is_deleted = :isDeleted", { isDeleted: false })
      .select([
        "task.task_id AS taskId",
        "task.task_name AS taskName",
        "task.due_date AS deadline",
        "caseUser.case_id AS caseId",
        "task.status AS status",
      ])
      .getRawMany();

    if (!taskList) {
      throw new AppError(
        ErrorMessages.TASK_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.TASK_NOT_FOUND
      );
    }
    return taskList;
  }

  async getTaskDetailById(
    roleId: string,
    taskId: string
  ): Promise<TaskDetailResponseDto> {
    const query = this.taskRepository
      .createQueryBuilder("task")
      .leftJoin("task.caseUser", "caseUser")
      .leftJoin("caseUser.case", "case")
      .leftJoin("case.caseEvidences", "caseEvidences")
      .leftJoin("caseEvidences.evidence", "evidence")
      .where("task.task_id = :taskId", { taskId })
      .andWhere("task.is_deleted = false");

    query.select([
      "task.task_id AS taskId",
      "task.task_name AS taskName",
      "task.due_date AS deadline",
      "task.status AS status",
      "task.content AS content",
    ]);

    // Theo roleId chọn summary
    if (roleId === "FINANCIAL_INVESTIGATOR") {
      query.leftJoin("evidence.financialInvest", "financialInvest");
      query.addSelect([
        "financialInvest.summary AS summary",
        "financialInvest.attach_file AS investFile",
      ]);
    } else if (roleId === "FORENSIC_OFFICER") {
      query.leftJoin("evidence.forensicInvest", "forensicInvest");
      query.addSelect([
        "forensicInvest.summary AS summary",
        "forensicInvest.attach_file AS investFile",
      ]);
    }

    query.addSelect([
      "evidence.evidence_id AS evidenceId",
      "evidence.description AS description",
      "evidence.attach_file AS attachFile",
    ]);

    const rawResult = await query.getRawOne();

    if (!rawResult) {
      throw new AppError(
        ErrorMessages.TASK_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.TASK_NOT_FOUND
      );
    }

    return {
      taskId: rawResult.taskId,
      taskName: rawResult.taskName,
      deadline: rawResult.deadline,
      status: rawResult.status,
      content: rawResult.content,
      evidences: {
        evidenceId: rawResult.evidenceId,
        description: rawResult.description,
        attachFile: rawResult.attachFile,
      },
      invest: {
        summary: rawResult.summary || null,
        attachFile: rawResult.investFile,
      },
    };
  }

  async changeTaskStatus(taskId: string): Promise<Task> {
    const task = await this.taskRepository.findOneBy({ task_id: taskId });

    if (!task) {
      throw new AppError(
        ErrorMessages.TASK_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.TASK_NOT_FOUND
      );
    }

    switch (task.status) {
      case TaskStatus.WAITING_EXECUTING:
        task.status = TaskStatus.EXECUTING;
        break;
      case TaskStatus.EXECUTING:
        task.status = TaskStatus.COMPLETED;
        task.completed_at = new Date();
        break;
      default:
        throw new AppError(
          ErrorMessages.TASK_INVALID_STATUS,
          HttpStatusCode.BAD_REQUEST,
          ErrorCode.TASK_INVALID_STATUS
        );
    }

    await this.taskRepository.save(task);
    return task;
  }
}

export default new TaskService();