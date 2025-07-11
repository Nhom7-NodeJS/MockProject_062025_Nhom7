import { Repository } from "typeorm";

<<<<<<< HEAD
import { AppDataSource } from "@/config/config-database";
=======
import { AppDataSource } from "@/config/database.config";
>>>>>>> origin/dev3
import { AppError } from "@/common/error.response";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorCode } from "@/constants/error-code";

import { FinancialInvest } from "./entities/financial_invest.entity";
<<<<<<< HEAD
import { FinancialDetailResponseDto } from "./dto/financial_detail-response.dto";
=======
>>>>>>> origin/dev3

export class FinancialInvestService {
  private financialInvestRepository: Repository<FinancialInvest>;

  constructor() {
    this.financialInvestRepository =
      AppDataSource.getRepository(FinancialInvest);
  }

  async updateFinancialInvest(
    evidenceId: string,
    summary: string,
    fileUrl: string[]
  ) {
    const invest = await this.financialInvestRepository.findOneBy({
      evidence_id: evidenceId,
    });
    if (!invest) {
      throw new AppError(
        ErrorMessages.FINANCIAL_INVESTIGATION_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.FINANCIAL_INVESTIGATION_NOT_FOUND
      );
    }

    console.log("attach_file type:", typeof fileUrl, fileUrl);

    invest.summary = summary;
    invest.attach_file = fileUrl;
    await this.financialInvestRepository.save(invest);

    return invest;
  }
}

export default new FinancialInvestService();
