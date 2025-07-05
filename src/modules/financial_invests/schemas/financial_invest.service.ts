import { Repository } from "typeorm";
import { AppDataSource } from "@/config/config-database";
import { FinancialInvest } from "../entities/financial_invest.entities";
import { AppError } from "@/common/error.response";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorCode } from "@/constants/error-code";
import { UpdateFinancialInvestDto } from "../dto/financial_invest.dto";

export class FinancialInvestService {
  private repo: Repository<FinancialInvest>;

  constructor() {
    this.repo = AppDataSource.getRepository(FinancialInvest);
  }

  async confirm(evidence_id: string): Promise<FinancialInvest> {
    const invest = await this.repo.findOne({ where: { evidence_id, is_deleted: false } });
    if (!invest || invest.evidence.is_deleted) {
      throw new AppError(
        ErrorMessages.FINANCIAL_INVEST_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.FINANCIAL_INVEST_NOT_FOUND
      );
    }
    return invest;
  }

 async update(dto: UpdateFinancialInvestDto): Promise<FinancialInvest> {
    const invest = await this.repo.findOne({ where: { evidence_id: dto.evidence_id, is_deleted: false } });
    if (!invest || invest.evidence.is_deleted) {
      throw new AppError(
        ErrorMessages.FINANCIAL_INVEST_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.FINANCIAL_INVEST_NOT_FOUND
      );
    }
    invest.summary = dto.summary;
    await this.repo.save(invest);
    return invest;
  }
}

export default new FinancialInvestService();