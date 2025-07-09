import { Request, Response } from 'express';
import { ReportService } from './report.service';
import {
  ReportListResponseDto,
  ReportDetailResponseDto,
  ApiResponseDto,
} from './dto/report.dto';

export class ReportController {
  private reportService: ReportService;

  constructor() {
    this.reportService = new ReportService();
  }

  /**
   * Lấy danh sách báo cáo
   */
  async getReportList(): Promise<ApiResponseDto<ReportListResponseDto[]>> {
    const reports = await this.reportService.getReportList();

    return {
      code: 200,
      message: 'success',
      result: reports,
    };
  }

  /**
   * Lấy chi tiết báo cáo theo ID
   */
  async getReportDetail(reportId: string): Promise<ApiResponseDto<ReportDetailResponseDto>> {
    const reportDetail = await this.reportService.getReportDetail(reportId);

    if (!reportDetail) {
      return {
        code: 404,
        message: `Report with ID ${reportId} not found`,
        result: {} as ReportDetailResponseDto,
      };
    }

    return {
      code: 200,
      message: 'success',
      result: reportDetail,
    };
  }
}
