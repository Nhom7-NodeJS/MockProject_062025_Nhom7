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
	async createReport(reportDto: CreateIncidentReportDto): Promise<any> {
    try {
      const { reporterInfo, incidentInfo, relevantParties, evidences } = reportDto;

      console.log("reporterInfo:", reporterInfo);
      console.log("incidentInfo:", incidentInfo);
      console.log("relevantParties:", relevantParties);
      console.log("evidences:", evidences);

      // Return a dummy object for now
      return { reporterInfo, incidentInfo, relevantParties, evidences };
    } catch (error) {
      throw error
    }
  }
}

export default new ReportService();