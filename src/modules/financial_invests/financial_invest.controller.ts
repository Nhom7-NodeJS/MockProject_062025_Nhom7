import { Request, Response } from "express";
import { AppDataSource } from "@/config/config-database";
import { FinancialInvest } from "./entities/financial_invest.entities";
import { Case } from "@/modules/cases/entities/case.entity";
import { Task } from "@/modules/tasks/entities/task.entity";
import { CaseUser } from "@/modules/cases_users/entities/case_user.entity";
import { TaskStatus } from "@/modules/tasks/enums/task.enum";
import { ErrorCode } from "@/constants/error-code";
import { UpdateFinancialTaskDto } from "./dto/financial_invest.dto";

export class FinancialInvestController {
  static async financialTaskDetail(req: Request, res: Response) {
    const { task_id } = req.params;
    const taskRepo = AppDataSource.getRepository(Task);

    const task = await taskRepo.findOne({
      where: { task_id },
      relations: ["caseUser", "caseUser.case", "caseUser.tasks", "caseUser.case.evidences", "caseUser.case.evidences.financialInvest"]
    });

    if (!task) {
      return res.status(404).json({
        code: ErrorCode.INVALID_PARAMS,
        message: "Task not found"
      });
    }

    const evidence = task.caseUser.case.evidences.find(e => e.financialInvest);
    const financialInvest = evidence?.financialInvest;

    return res.json({
      task_id: task.task_id,
      task_name: task.task_name,
      deadline: task.due_date,
      status: task.status,
      case_name: task.caseUser.case.case_name,
      content:  task.content,
      evidence_id: evidence?.evidence_id,
      evidence_description: evidence?.description,
      attach_file: evidence?.attach_file
    });
  }

  static async updateFinancialTask(req: Request, res: Response) {
    const { task_id } = req.params;
    const updateData: UpdateFinancialTaskDto = req.body;

    const taskRepo = AppDataSource.getRepository(Task);
    const financialInvestRepo = AppDataSource.getRepository(FinancialInvest);

    const task = await taskRepo.findOne({
      where: { task_id },
      relations: ["caseUser", "caseUser.case", "caseUser.case.evidences", "caseUser.case.evidences.financialInvest"]
    });

    if (!task) {
      return res.status(404).json({ code: ErrorCode.INVALID_PARAMS, message: "Task not found" });
    }

    if (task.status === TaskStatus.COMPLETED) {
      return res.status(400).json({ code: ErrorCode.INVALID_PARAMS, message: "Cannot update completed task" });
    }

    const evidence = task.caseUser.case.evidences.find(e => e.financialInvest);
    if (!evidence?.financialInvest) {
      return res.status(404).json({ code: ErrorCode.INVALID_PARAMS, message: "Financial investigation not found" });
    }

    const financialInvest = evidence.financialInvest;
    financialInvest.summary = updateData.summary;
    task.status = TaskStatus.EXECUTING;

    await AppDataSource.transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(financialInvest);
      await transactionalEntityManager.save(task);
    });

    return res.json({
      message: "Financial task updated successfully",
      data: {
        task_id: task.task_id,
        status: task.status,
        summary: financialInvest.summary
      }
    });
  }

  static async confirmFinancialTask(req: Request, res: Response) {
    const { task_id } = req.params;
    const taskRepo = AppDataSource.getRepository(Task);

    const task = await taskRepo.findOne({
      where: { task_id },
      relations: ["caseUser", "caseUser.case", "caseUser.case.evidences", "caseUser.case.evidences.financialInvest"]
    });

    if (!task) {
      return res.status(404).json({ code: ErrorCode.INVALID_PARAMS, message: "Task not found" });
    }

    if (task.status !== TaskStatus.EXECUTING) {
      return res.status(400).json({ code: ErrorCode.INVALID_PARAMS, message: "Can only confirm tasks in executing status" });
    }

    const evidence = task.caseUser.case.evidences.find(e => e.financialInvest);
    if (!evidence?.financialInvest) {
      return res.status(404).json({ code: ErrorCode.INVALID_PARAMS, message: "Financial investigation not found" });
    }

    task.status = TaskStatus.COMPLETED;
    task.completed_at = new Date();

    await taskRepo.save(task);

    return res.json({
      message: "Financial task confirmed successfully",
      data: {
        task_id: task.task_id,
        status: task.status
      }
    });
  }

  static async startFinancialTask(req: Request, res: Response) {
    const { task_id } = req.params;
    const taskRepo = AppDataSource.getRepository(Task);

    const task = await taskRepo.findOne({ where: { task_id } });

    if (!task) {
      return res.status(404).json({ code: ErrorCode.INVALID_PARAMS, message: "Task not found" });
    }

    if (task.status !== TaskStatus.WAITING_EXECUTING) {
      return res.status(400).json({ code: ErrorCode.INVALID_PARAMS, message: "Can only start tasks in waiting status" });
    }

    task.status = TaskStatus.EXECUTING;
    task.start_date = new Date();
    await taskRepo.save(task);

    return res.json({
      message: "Task started",
      data: { task_id: task.task_id, status: task.status }
    });
  }
}
