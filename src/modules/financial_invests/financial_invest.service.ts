import { Repository } from "typeorm";

import { AppDataSource } from "@/config/config-database";
import {
  FinancialInvest,
  FinancialInvestStatus,
} from "./entities/financial_invest.entities";

import { AppError } from "@/common/error.response";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorCode } from "@/constants/error-code";
import { FinancialDetailResponseDto } from "./dto/financial_detail-response.dto";

export class FinancialInvestService {
  private financialInvestRepo: Repository<FinancialInvest>;

  constructor() {
    this.financialInvestRepo = AppDataSource.getRepository(FinancialInvest);
  }

  async getAll(): Promise<FinancialInvest[]> {
    return await this.financialInvestRepo
      .createQueryBuilder("financialInvest")
      .leftJoinAndSelect("financialInvest.evidence", "evidence")
      .leftJoinAndSelect("evidence.case", "case")
      .leftJoinAndSelect("evidence.warrant", "warrant")
      .where("financialInvest.is_deleted = :isDeleted", { isDeleted: false })
      .select([
        "warrant.warrant_id AS warrant_id",
        "warrant.warrant_name AS warrant_name",
        "financialInvest.deadline AS deadline",
        "case.case_name AS case_name",
        "financialInvest.status AS status",
      ])
      .getRawMany();
  }

  async getDetailByEvidenceId(
    evidenceId: string
  ): Promise<FinancialDetailResponseDto> {
    const financialInvestExists = await this.financialInvestRepo
      .createQueryBuilder("financialInvest")
      .leftJoin("financialInvest.evidence", "evidence")
      .leftJoin("evidence.warrant", "warrant")
      .where("financialInvest.evidence_id = :evidenceId", { evidenceId })
      .andWhere("financialInvest.is_deleted = :isDeleted", { isDeleted: false })
      .select([
        "financialInvest.evidence_id AS evidenceId",
        "warrant.warrant_name AS warrantName",
        "financialInvest.deadline AS deadline",
        "financialInvest.summary AS summary",
        "financialInvest.status AS status",
      ])
      .getRawOne();

    if (!financialInvestExists) {
      throw new AppError(
        ErrorMessages.FINANCIAL_INVESTIGATION_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.FINANCIAL_INVESTIGATION_NOT_FOUND
      );
    }
    return financialInvestExists;
  }

  // async getByStatus(status: FinancialInvestStatus): Promise<FinancialInvest[]> {
  //   const financialInvestExists = await this.financialInvestRepo.find({
  //     where: { status },
  //   });
  //   if (!financialInvestExists) {
  //     throw new AppError(
  //       ErrorMessages.FINANCIAL_INVESTIGATION_NOT_FOUND,
  //       HttpStatusCode.NOT_FOUND,
  //       ErrorCode.FINANCIAL_INVESTIGATION_NOT_FOUND
  //     );
  //   }
  //   return financialInvestExists;
  // }
}

export default new FinancialInvestService();
