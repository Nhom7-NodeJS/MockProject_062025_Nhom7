import { Repository } from "typeorm";

import { AppDataSource } from "@/config/config-database";
import { AppError } from "@/common/error.response";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorCode } from "@/constants/error-code";

import { ForensicDetailResponseDto } from "./dto/forensic_detail-response.dto";
import { ForensicInvest } from "./entities/forensic_invest.entity";

export class ForensicInvestService {
  private forensicInvestRepo: Repository<ForensicInvest>;

  constructor() {
    this.forensicInvestRepo = AppDataSource.getRepository(ForensicInvest);
  }

  async getAll(): Promise<ForensicInvest[]> {
    return await this.forensicInvestRepo
      .createQueryBuilder("forensicInvest")
      .leftJoinAndSelect("forensicInvest.evidence", "evidence")
      .leftJoinAndSelect("evidence.case", "case")
      .leftJoinAndSelect("evidence.warrant", "warrant")
      .where("forensicInvest.is_deleted = :isDeleted", { isDeleted: false })
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
  ): Promise<ForensicDetailResponseDto> {
    const forensicInvestExists = await this.forensicInvestRepo
      .createQueryBuilder("forensicInvest")
      .leftJoin("forensicInvest.evidence", "evidence")
      .leftJoin("evidence.warrant", "warrant")
      .where("warrant.warrant_id = :warrantId", { warrantId })
      .andWhere("forensicInvest.is_deleted = :isDeleted", { isDeleted: false })
      .select([
        "warrant.warrant_id AS warrantId",
        "warrant.warrant_name AS warrantName",
        "warrant.deadline AS deadline",
        "forensicInvest.result_summary AS summary",
        "warrant.status AS status",
      ])
      .getRawOne();

    if (!forensicInvestExists) {
      throw new AppError(
        ErrorMessages.FORENSIC_INVESTIGATION_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.FORENSIC_INVESTIGATION_NOT_FOUND
      );
    }
    return forensicInvestExists;
  }
}

export default new ForensicInvestService();
