import { Repository } from "typeorm";

import { Report } from "@/modules/reports/entities/report.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { Witness } from "@/modules/witnesses/entities/witness.entity";
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
import { 
  formatUSDate, 
  formatUSDateTime,
  formatUSTime
} from "@/helpers/format-datetime";

export class ReportService {
	async createReport(reportDto: CreateIncidentReportDto): Promise<IncidentReportResponseDto> {
    try {
      // This is only to see if the backend flow is working and will be changed later
      // Testing format-datetime
      const timestampExemple = new Date("2025-11-30T12:30:00.000Z")
      console.log({Original: timestampExemple})
      console.log({USDateFormat: formatUSDate(timestampExemple)})  
      console.log({USTimeFormat: formatUSTime(timestampExemple)})
      console.log({USDateTimeFormat: formatUSDateTime(timestampExemple)})
	    
      const savedReport = {} as Report;
      return toIncidentReportResponseDto(savedReport);
    } catch (error) {
      throw error
    }
  }
}

export default new ReportService();