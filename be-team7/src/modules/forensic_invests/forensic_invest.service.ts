import { Repository } from "typeorm";

import { AppDataSource } from "@/config/database.config";
import { AppError } from "@/common/error.response";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorCode } from "@/constants/error-code";

import { ForensicDetailResponseDto } from "./dto/forensic_detail-response.dto";
import { ForensicInvest } from "./entities/forensic_invest.entity";

export class ForensicInvestService {
  private forensicInvestRepository: Repository<ForensicInvest>;

  constructor() {
    this.forensicInvestRepository = AppDataSource.getRepository(ForensicInvest);
  }

  async updateForensicInvest(
    evidenceId: string,
    note: string,
    fileUrl: string[]
  ) {
    const invest = await this.forensicInvestRepository.findOneBy({
      evidence_id: evidenceId,
    });
    if (!invest) {
      throw new AppError(
        ErrorMessages.FORENSIC_INVESTIGATION_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.FORENSIC_INVESTIGATION_NOT_FOUND
      );
    }

    invest.summary = note;
    invest.attach_file = fileUrl;
    await this.forensicInvestRepository.save(invest);

    return invest;
  }
}

export default new ForensicInvestService();
