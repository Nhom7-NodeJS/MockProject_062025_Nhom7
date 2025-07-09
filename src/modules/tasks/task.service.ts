import { Repository } from "typeorm";

import { AppDataSource } from "@/config/config-database";
import { AppError } from "@/common/error.response";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorCode } from "@/constants/error-code";

import { Task } from "./entities/task.entity";
import { TaskDetailResponseDto } from "./dto/task_detail-response.dto";

export class TaskService {
  private taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task);
  }

  async getAllTaskByRoleId(username: string, roleId: string): Promise<Task[]> {
    const taskList = await this.taskRepository
      .createQueryBuilder("task")
      .leftJoin("task.caseUser", "caseUser")
      .leftJoin("caseUser.user", "user")
      .leftJoin("user.role", "role")
      .where("user.username = :username", { username: username })
      .andWhere("user.role_id = :roleId", { roleId: roleId })
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
      .andWhere("task.is_deleted = false")
      .select([
        "task.task_id AS taskId",
        "task.task_name AS taskName",
        "task.due_date AS deadline",
        "task.status AS status",
      ]);

    if (roleId === "FINANCIAL_INVESTIGATOR") {
      query.leftJoin("evidence.financialInvest", "financialInvest");
      query.addSelect("financialInvest.summary AS summary");
    } else if (roleId === "FORENSIC_OFFICER") {
      query.leftJoin("evidence.forensicInvest", "forensicInvest");
      query.addSelect("forensicInvest.result_summary AS summary");
    }

    const task = await query.getRawOne();

    if (!task) {
      throw new AppError(
        ErrorMessages.TASK_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.TASK_NOT_FOUND
      );
    }

    return task;
  }
}

export default new TaskService();
