import { Request, Response } from "express";

import { AppResponse } from "@/common/success.response";
import { AppError } from "@/common/error.response";
import { ErrorCode } from "@/constants/error-code";
import { SuccessMessages, ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { toIncidentReportResponseDto } from "@/modules/reports/report.mapper"

import reportService from "./report.service";
import { 
  CreateIncidentReportDto,
  UpdateReportStatusDto,
  IncidentReportResponseDto
} from "./dto/report.dto";

export class ReportController {
  async createReport(req: Request, res: Response) {
    const uploadedFiles = (req as any).uploadedFiles;
    // console.log(uploadedFiles)

    const evidencesRaw = req.body.evidences ?? [];
    const reporterInfo = req.body.reporterInfo;
    const incidentInfo = req.body.incidentInfo;
    const relevantParties = req.body.relevantParties ?? [];

    // console.log("=== Field type check ===");
    // console.log("reporterInfo:", typeof req.body.reporterInfo); 
    // console.log("incidentInfo:", typeof req.body.incidentInfo); 
    // console.log("relevantParties:", typeof req.body.relevantParties);
    // console.log("evidences:", typeof req.body.evidences); 
    // console.log("========================");

    // Merge attachments to corresponding evidences
    const evidences = evidencesRaw.map((evidence: any, index: number) => ({
      ...evidence,
      attachments: Array.isArray(uploadedFiles?.[`evidence_${index}`])
        ? uploadedFiles[`evidence_${index}`]
        : [],
    }));

    const createIncidentReportDto: CreateIncidentReportDto = {
      reporterInfo,
      incidentInfo,
      relevantParties,
      evidences,
    };

    const newReport = await reportService.createReport(createIncidentReportDto);
    const reportDto: IncidentReportResponseDto = toIncidentReportResponseDto(newReport);

    return new AppResponse({
      message: SuccessMessages.REPORT.REPORT_CREATED,
      statusCode: HttpStatusCode.CREATED,
      data: reportDto,
    }).sendResponse(res);
  }
  async updateReportStatus(req: Request, res: Response) {
    try {
      const { reportId } = req.params;
      const { reportStatus } = req.body as UpdateReportStatusDto;

      const updatedReport = await reportService.updateReportStatus(reportId, reportStatus);

      return new AppResponse({
        message: "Report status updated successfully",
        statusCode: HttpStatusCode.OK,
        data: updatedReport
      }).sendResponse(res);
    } catch (error: any) {
      throw new AppError(
        error.message || ErrorMessages.INTERNAL_SERVER_ERROR,
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.DATABASE_ERROR
      );
    }
  }

  async getAllReports(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const result = await reportService.getAllReports(page, limit);
      
      return new AppResponse({
        message: "Fetch reports data successfully",
        statusCode: HttpStatusCode.OK,
        data: result.data,
        pagination: result.pagination
      }).sendResponse(res);
    } catch (error: any) {
      throw new AppError(
        error.message || ErrorMessages.INTERNAL_SERVER_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.DATABASE_ERROR
      );
    }
  }

  async getReportById(req: Request, res: Response) {
    try {
      const { reportId } = req.params;
      const report = await reportService.getReportById(reportId);
      
      if (!report) {
        return res.status(404).json({ message: "Report not found" });
      }
      
      return new AppResponse({
        message: "Report detail fetched successfully",
        statusCode: HttpStatusCode.OK,
        data: report,
      }).sendResponse(res);
    } catch (error: any) {
      throw new AppError(
        error.message || "Internal server error",
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.DATABASE_ERROR
      );
    }
  }
}

export default new ReportController();