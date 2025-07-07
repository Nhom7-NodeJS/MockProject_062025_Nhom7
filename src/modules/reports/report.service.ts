import { Repository } from "typeorm";
import { AppDataSource } from "@/config/config-database";
import { Report } from "@/modules/reports/entities/report.entity";
import { AppError } from "@/common/error.response";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorCode } from "@/constants/error-code";
import { UpdateReportStatusDto } from "./dto/report.dto";

export class ReportService {
  private reportRepository: Repository<Report>;

  constructor() {
    this.reportRepository = AppDataSource.getRepository(Report);
  }

  async updateReportStatus(reportId: string, updateDto: UpdateReportStatusDto): Promise<Report> {

    const report = await this.reportRepository.findOne({
      where: { report_id: reportId, is_deleted: false },
    });
    if (!report) {
      throw new AppError(
        ErrorMessages.REPORT_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.REPORT_NOT_FOUND
      );
    }
    report.status = updateDto.reportStatus;
    await this.reportRepository.save(report);
    
    return report;
  }

  async getById(reportId: string): Promise<Report> {
    const report = await this.reportRepository.findOne({
      where: { report_id: reportId, is_deleted: false },
      relations: ['user', 'case'],
    });

    if (!report) {
      throw new AppError(
        ErrorMessages.REPORT_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.REPORT_NOT_FOUND
      );
    }

    return report;
  }
}

export default new ReportService();