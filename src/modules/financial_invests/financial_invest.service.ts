import { Repository } from "typeorm";

import { AppDataSource } from "@/config/config-database";
import { AppError } from "@/common/error.response";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorCode } from "@/constants/error-code";

import { FinancialInvest } from "./entities/financial_invest.entity";
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
        "warrant.deadline AS deadline",
        "case.case_id AS case_id",
        "warrant.status AS status",
      ])
      .getRawMany();
  }

  async getDetailByWarrantId(
    warrantId: string
  ): Promise<FinancialDetailResponseDto> {
    const financialInvestExists = await this.financialInvestRepo
      .createQueryBuilder("financialInvest")
      .leftJoin("financialInvest.evidence", "evidence")
      .leftJoin("evidence.warrant", "warrant")
      .where("warrant.warrant_id = :warrantId", { warrantId })
      .andWhere("financialInvest.is_deleted = :isDeleted", { isDeleted: false })
      .select([
        "warrant.warrant_id AS warrantId",
        "warrant.warrant_name AS warrantName",
        "warrant.deadline AS deadline",
        "financialInvest.summary AS summary",
        "warrant.status AS status",
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
}

export default new FinancialInvestService();
