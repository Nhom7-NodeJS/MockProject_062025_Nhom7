import { Repository } from "typeorm";

import { AppDataSource } from "@/config/config-database";
import { AppError } from "@/common/error.response";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorCode } from "@/constants/error-code";

import { Task } from "./entities/task.entity";
import { TaskDetailResponseDto } from "./dto/task_detail-response.dto";
import { TaskStatus } from "./enums/task.enum";

export class TaskService {
  private taskRepository: Repository<Task>;

  constructor() {
    this.taskRepository = AppDataSource.getRepository(Task);
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

    // Base SELECT
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
      query.addSelect("financialInvest.summary AS summary");
    } else if (roleId === "FORENSIC_OFFICER") {
      query.leftJoin("evidence.forensicInvest", "forensicInvest");
      query.addSelect("forensicInvest.result_summary AS summary");
    }

    query.addSelect([
      "evidence.evidence_id AS evidenceId",
      "evidence.description AS description",
      "evidence.attach_file AS attachFile",
    ]);

    // Get nhiều dòng
    const rawResult = await query.getRawMany();

    if (!rawResult || rawResult.length === 0) {
      throw new AppError(
        ErrorMessages.TASK_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.TASK_NOT_FOUND
      );
    }

    // Gom evidences
    const firstRow = rawResult[0];
    const evidences = rawResult.map((row) => ({
      evidenceId: row.evidenceId,
      description: row.description,
      attachFile: row.attachFile,
      summary: row.summary || null,
    }));

    const result: TaskDetailResponseDto = {
      taskId: firstRow.taskId,
      taskName: firstRow.taskName,
      deadline: firstRow.deadline,
      status: firstRow.status,
      content: firstRow.content,
      evidences: evidences,
    };

    return result;
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
