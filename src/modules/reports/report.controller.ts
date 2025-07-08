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
      // This is only to see if the backend flow is working and will be changed later
      const service = this.reportService.createReport(req.body)
      res.status(201).json({message: "Hi"})
    } catch (error) {
      throw error
    }
  }
}

export default new ReportController();