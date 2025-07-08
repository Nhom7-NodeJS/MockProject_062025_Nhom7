import { Request, Response } from "express";
import { AppDataSource } from "@/config/config-database";
import { FinancialInvest } from "./entities/financial_invest.entities";
import { Warrant } from "@/modules/warrants/entities/warrant.entity";
import { Case } from "@/modules/cases/entities/case.entity";
import { WarrantStatus } from "./enums/financial_invest.enum";
import { ErrorCode } from "@/constants/error-code";
import { ErrorMessages } from "@/constants/message";
import { UpdateFinancialTaskDto } from "./dto/financial_invest.dto";

export class FinancialInvestController {
  static async financialTaskDetail(req: Request, res: Response) {
    const { warrant_id } = req.params;
    const warrantRepo = AppDataSource.getRepository(Warrant);
    const financialInvestRepo = AppDataSource.getRepository(FinancialInvest);

    const warrant = await warrantRepo.findOne({
      where: { warrant_id },
      relations: ["case", "evidences", "evidences.financialInvest"],
    });

    if (!warrant) {
      return res.status(404).json({
        code: ErrorCode.INVALID_PARAMS,
        message: "Warrant not found"
      });
    }

    const evidence = warrant.evidences.find(e => e.financialInvest);
    const financialInvest = evidence?.financialInvest;

    return res.json({
      task_id: warrant.warrant_id,
      task_name: warrant.warrant_name, 
      deadline: warrant.deadline,
      status: warrant.status,
      case_name: warrant.case.case_name,
      content: financialInvest?.summary,
      evidence_id: evidence?.evidence_id,
      evidence_description: evidence?.description,
      attach_file: evidence?.attach_file,
    });
  }

  static async updateFinancialTask(req: Request, res: Response) {
    const { warrant_id } = req.params;
    const updateData: UpdateFinancialTaskDto = req.body;
    
    const warrantRepo = AppDataSource.getRepository(Warrant);
    const financialInvestRepo = AppDataSource.getRepository(FinancialInvest);

    const warrant = await warrantRepo.findOne({
      where: { warrant_id },
      relations: ["evidences", "evidences.financialInvest"],
    });

    if (!warrant) {
      return res.status(404).json({
        code: ErrorCode.INVALID_PARAMS,
        message: "Warrant not found"
      });
    }

    if (warrant.status === WarrantStatus.COMPLETED) {
      return res.status(400).json({
        code: ErrorCode.INVALID_PARAMS,
        message: "Cannot update completed task"
      });
    }

    const evidence = warrant.evidences.find(e => e.financialInvest);
    if (!evidence?.financialInvest) {
      return res.status(404).json({
        code: ErrorCode.INVALID_PARAMS,
        message: "Financial investigation not found"
      });
    }

    const financialInvest = evidence.financialInvest;
    financialInvest.summary = updateData.summary;

    warrant.status = WarrantStatus.EXECUTING;

    await AppDataSource.transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(financialInvest);
      await transactionalEntityManager.save(warrant);
    });

    return res.json({
      message: "Financial task updated successfully",
      data: {
        task_id: warrant.warrant_id,
        status: warrant.status,
        content: financialInvest.summary
      }
    });
  }

  static async confirmFinancialTask(req: Request, res: Response) {
    const { warrant_id } = req.params;
    const warrantRepo = AppDataSource.getRepository(Warrant);

    const warrant = await warrantRepo.findOne({
      where: { warrant_id },
      relations: ["evidences", "evidences.financialInvest"],
    });

    if (!warrant) {
      return res.status(404).json({
        code: ErrorCode.INVALID_PARAMS,
        message: "Warrant not found"
      });
    }

    if (warrant.status !== WarrantStatus.EXECUTING) {
      return res.status(400).json({
        code: ErrorCode.INVALID_PARAMS,
        message: "Can only confirm tasks that are in executing status"
      });
    }

    const evidence = warrant.evidences.find(e => e.financialInvest);
    if (!evidence?.financialInvest) {
      return res.status(404).json({
        code: ErrorCode.INVALID_PARAMS,
        message: "Financial investigation not found"
      });
    }

    warrant.status = WarrantStatus.COMPLETED;
    await warrantRepo.save(warrant);

    return res.json({
      message: "Financial task confirmed successfully",
      data: {
        task_id: warrant.warrant_id,
        status: warrant.status
      }
    });
  }
}
