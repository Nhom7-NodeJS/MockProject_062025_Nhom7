import {
  Request, 
  Response 
} from "express";

import { ReportService } from "@/modules/reports/report.service"
import {
	CreateIncidentReportDto,
	IncidentReportResponseDto
} from "@/modules/reports/dto/report.dto";
import { toIncidentReportResponseDto } from "@/modules/reports/report.mapper"
import { ErrorCode } from "@/constants/error-code";
import { SuccessMessages, ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { AppResponse } from "@/common/success.response";
import { AppError } from "@/common/error.response";

export class ReportController {
  private reportService: ReportService;

  constructor(){
    this.reportService = new ReportService();
  }

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

    const newReport = await this.reportService.createReport(createIncidentReportDto);
    const reportDto: IncidentReportResponseDto = toIncidentReportResponseDto(newReport);

    return new AppResponse({
      message: SuccessMessages.REPORT.REPORT_CREATED,
      statusCode: HttpStatusCode.CREATED,
      data: reportDto,
    }).sendResponse(res);
  }
}

export default new ReportController();