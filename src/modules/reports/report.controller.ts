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
	InitialEvidences,
	RelevantParties,
	IncidentInfo,
	ReporterInfo,
	BasicReportInfo,
	CreateIncidentReportDto,
	IncidentReportResponseDto
} from "@/modules/reports/dto/report.dto";
import {
	mapEvidence,
	mapSuspect,
	mapVictim,
	mapWitness,
	mapBasicReportInfo,
	mapIncidentInfo,
	mapReporterInfo,
	toIncidentReportResponseDto
} from "@/modules/reports/report.mapper"
import { ErrorCode } from "@/constants/error-code";
import { SuccessMessages, ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";

export class ReportController {
  private reportService: ReportService;

  constructor(){
    this.reportService = new ReportService();
  }

  async createReport(req: Request, res: Response) {
    try{
      const uploadedFiles = req.body.uploadedFiles;
      const evidencesRaw = JSON.parse(req.body.evidences);

      // Merge attachments to corresponding evidences
      const evidences = evidencesRaw.map((evidence: any, index: number) => ({
        ...evidence,
        attachments: uploadedFiles?.[`evidence_${index}`] ?? [],
      }));

      const createDto = {
        reporterInfo: JSON.parse(req.body.reporterInfo),
        incidentInfo: JSON.parse(req.body.incidentInfo),
        relevantParties: JSON.parse(req.body.relevantParties),
        evidences,
      };

      const newReport = await this.reportService.createReport(createDto);
      res.status(201).json({
        message: "Report created sucessfully",
        data: newReport,
      })
    } catch (error) {
      throw error
    }
  }
}

export default new ReportController();