import {
  Request, 
  Response 
} from "express";

import { Report } from "@/modules/reports/entities/report.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { Witness } from "@/modules/witnesses/entities/witness.entity";
import { ReportService } from "@/modules/reports/report.service"
import {
	CreateIncidentReportDto,
	IncidentReportResponseDto
} from "@/modules/reports/dto/report.dto";
import {
	toIncidentReportResponseDto
} from "@/modules/reports/report.mapper"
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
    const uploadedFiles = req.body.uploadedFiles;

    let evidencesRaw, reporterInfo, incidentInfo, relevantParties;
    try {
      const body = req.body;
  
      evidencesRaw = body.evidences ? JSON.parse(body.evidences) : [];
      reporterInfo = JSON.parse(body.reporterInfo);
      incidentInfo = JSON.parse(body.incidentInfo);
      relevantParties = body.relevantParties ? JSON.parse(body.relevantParties) : [];
    } catch {
      throw new AppError(
        ErrorMessages.INVALID_JSON,
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_JSON,
        [{ field: "request body", message: "One or more fields are invalid JSON" }]
      );
    }

    // Merge attachments to corresponding evidences
    const evidences = evidencesRaw.map((evidence: any, index: number) => ({
      ...evidence,
      attachments: Array.isArray(uploadedFiles?.[`evidence_${index}`])
        ? uploadedFiles[`evidence_${index}`]
        : [],
    }))

    const createIncidentReportDto: CreateIncidentReportDto = {
      reporterInfo,
      incidentInfo,
      relevantParties,
      evidences,
    };

    const newReport = await this.reportService.createReport(createIncidentReportDto);
    const reportDto: IncidentReportResponseDto = toIncidentReportResponseDto(newReport)
    return new AppResponse({
      message: SuccessMessages.REPORT.REPORT_CREATED,
      statusCode: HttpStatusCode.CREATED,
      data: reportDto,
    }).sendResponse(res);
  }
}

export default new ReportController();