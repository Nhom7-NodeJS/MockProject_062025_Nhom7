
import { AppDataSource } from "@/config/config-database";
import { Report } from "./entities/report.entity";
import { ReportStatus } from "./enums/report.enum";
import { AppError } from "@/common/error.response";
import { ErrorCode } from "@/constants/error-code";
import { HttpStatusCode } from "@/constants/status-code";

export class ReportService {
  private reportRepository = AppDataSource.getRepository(Report);

  async updateReportStatus(reportId: string, reportStatus: string) {
    // Validate if the reportStatus is a valid enum value
    if (!Object.values(ReportStatus).includes(reportStatus as ReportStatus)) {
      throw new AppError(
        `Invalid report status. Must be one of: ${Object.values(ReportStatus).join(', ')}`,
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.VALIDATION_ERROR
      );
    }

    // Find the report
    const report = await this.reportRepository.findOne({
      where: { 
        report_id: reportId,
        is_deleted: false 
      }
    });

    if (!report) {
      throw new AppError(
        "Report not found",
        HttpStatusCode.NOT_FOUND,
        ErrorCode.VALIDATION_ERROR
      );
    }

    // Update the status using enum
    report.status = reportStatus as ReportStatus;
    
    // Save the updated report
    const updatedReport = await this.reportRepository.save(report);
    
    return {
      report_id: updatedReport.report_id,
      status: updatedReport.status,
      updated_at: new Date()
    };
  }

  async getAllReports() {
    const reports = await this.reportRepository.find({
      where: { is_deleted: false },
      relations: ['case', 'user'],
      order: { reported_at: 'DESC' }
    });

    return reports.map(report => ({
      report_id: report.report_id,
      crime_type: report.crime_type,
      severity: report.severity,
      status: report.status,
      description: report.description,
      incident_date: report.incident_date,
      reported_at: report.reported_at,
      reporter_fullname: report.reporter_fullname,
      reporter_email: report.reporter_email,
      case_id: report.case?.case_id,
      user_id: report.user?.username
    }));
  }
}

export default new ReportService();