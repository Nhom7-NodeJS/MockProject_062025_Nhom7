import { Repository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

import { AppDataSource } from "@/config/config-database";
import { Report } from "@/modules/reports/entities/report.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { Witness } from "@/modules/witnesses/entities/witness.entity";
import {
	CreateIncidentReportDto,
	IncidentReportResponseDto
} from "@/modules/reports/dto/report.dto";
import {
	toIncidentReportResponseDto
} from "@/modules/reports/report.mapper"
import { ReportStatus } from "./enums/report.enum";
import { AppError } from "@/common/error.response";
import { ErrorCode } from "@/constants/error-code";
import { SuccessMessages, ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";

export class ReportService {
	private reportRepository: Repository<Report>;
	private evidenceRepository: Repository<Evidence>;
	private suspectRepository: Repository<Suspect>
	private victimRepository: Repository<Victim>
	private witnessRepository: Repository<Witness>

	constructor() {
		this.reportRepository = AppDataSource.getRepository(Report);
		this.evidenceRepository = AppDataSource.getRepository(Evidence);
		this.suspectRepository = AppDataSource.getRepository(Suspect);
		this.victimRepository = AppDataSource.getRepository(Victim);
		this.witnessRepository = AppDataSource.getRepository(Witness);
	}

	async createReport(reportDto: CreateIncidentReportDto): Promise<any> {
    const { reporterInfo, incidentInfo, relevantParties, evidences } = reportDto;

    const newReport = this.reportRepository.create({
      crime_type: incidentInfo.crimeType,
      severity: incidentInfo.severity,
      incident_date: new Date(incidentInfo.dateOccur),
      description: incidentInfo.description || undefined,
      case_location: incidentInfo.detailAddress || "Unknown",
      reported_at: new Date(),
      reporter_location: reporterInfo.address || "Unknown",
      reporter_fullname: reporterInfo.fullname,
      reporter_email: reporterInfo.email,
      reporter_phone_number: reporterInfo.phoneNumber,
      is_deleted: false,
      status: ReportStatus.PENDING,
      reporter_incident_relationship: reporterInfo.incidentRelation,
    })

    await this.reportRepository.save(newReport)

    for (const ev of evidences) {
      await this.evidenceRepository.save(
        this.evidenceRepository.create({
          evidence_id: uuidv4(),
          report: newReport,
          evidence_type: ev.evidenceType,
          current_location: ev.evidenceLocation || "Unknown",
          description: ev.description || undefined,
          collected_at: undefined,
          attach_file: ev.attachments?.length ? ev.attachments.join(" ; ") : undefined,
          status: "Uncollected",
        })
      );
    }
    // console.log(Object.keys(new Report()));
    
    return {reporterInfo, incidentInfo, relevantParties, evidences};
  }
}

export default new ReportService();