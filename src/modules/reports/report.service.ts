import { Repository } from "typeorm";

import { AppDataSource } from "@/config/database.config";
import { AppError } from "@/common/error.response";
import { ErrorCode } from "@/constants/error-code";
import { HttpStatusCode } from "@/constants/status-code";
import { generateUUID } from "@/helpers/generate-uuid"
import { Report } from "@/modules/reports/entities/report.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";
import { Victim } from "@/modules/victims/entities/victim.entity";
import { Witness } from "@/modules/witnesses/entities/witness.entity";
import { Gender } from "@/modules/users/enums/user.enum";
import { CreateIncidentReportDto } from "@/modules/reports/dto/report.dto";

import { ReportStatus, IncidentRelationship } from "./enums/report.enum";
import { ReportVictim } from "../reports_victims/entities/report_victim.entity";
import { ReportWitness } from "../reports_witnesses/entities/report_witness.entity";

export class ReportService {
	private reportRepository: Repository<Report>;
	private evidenceRepository: Repository<Evidence>;
	private suspectRepository: Repository<Suspect>;
	private victimRepository: Repository<Victim>;
	private witnessRepository: Repository<Witness>;
  private reportVictimRepository: Repository<ReportVictim>;
  private reportWitnessRepository: Repository<ReportWitness>;

	constructor() {
		this.reportRepository = AppDataSource.getRepository(Report);
		this.evidenceRepository = AppDataSource.getRepository(Evidence);
		this.suspectRepository = AppDataSource.getRepository(Suspect);
		this.victimRepository = AppDataSource.getRepository(Victim);
		this.witnessRepository = AppDataSource.getRepository(Witness);
    this.reportVictimRepository = AppDataSource.getRepository(ReportVictim);
    this.reportWitnessRepository = AppDataSource.getRepository(ReportWitness)
	}

	async createReport(reportDto: CreateIncidentReportDto): Promise<any> {
    const { reporterInfo, incidentInfo, relevantParties, evidences } = reportDto;

    // Create a new report instance
    const newReport = this.reportRepository.create({
      crime_type: incidentInfo.crimeType,
      severity: incidentInfo.severity,
      incident_date: new Date(incidentInfo.dateOccur),
      description: incidentInfo.description || undefined,
      detail_address: incidentInfo.detailAddress || undefined,
      reported_at: new Date(),
      reporter_address: reporterInfo.address || undefined,
      reporter_fullname: reporterInfo.fullname,
      reporter_email: reporterInfo.email,
      reporter_phone_number: reporterInfo.phoneNumber,
      reporter_incident_relationship: reporterInfo.incidentRelation,
    })
    // Save report instance to database
    await this.reportRepository.save(newReport)

    // Process and save each relevant party (Victim, Witness, Suspect)
    for (const party of relevantParties) {
      const baseInfo = {
        fullname: party.fullname ?? undefined,
        gender: party.gender ?? Gender.UNKNOWN,
        national: party.nationality ?? undefined,
      };

      switch (party.incidentRelation) {
        // If the party is a witness
        case IncidentRelationship.WITNESS: {
          // Create and save a new witness
          const newWitness = this.witnessRepository.create({
            witness_id: generateUUID("WITNESS"),
            ...baseInfo,
            statement: party.statement ?? undefined,
          });
          await this.witnessRepository.save(newWitness);
          // Link witness to report using ReportWitness 
          const reportWitness = this.reportWitnessRepository.create({
            report_id: newReport.report_id.toString(),
            witness_id: newWitness.witness_id,
            report: newReport,
            witness: newWitness,
          });
          await this.reportWitnessRepository.save(reportWitness);
          break;
        }
        // If the party is a victim
        case IncidentRelationship.VICTIM: {
          // Create and save a new victim
          const newVictim = this.victimRepository.create({
            victim_id: generateUUID("VICTIM"),
            ...baseInfo,
            description: party.statement ?? undefined,
          });
          await this.victimRepository.save(newVictim);
          // Link victim to report via ReportVictim
          const reportVictim = this.reportVictimRepository.create({
            report_id: newReport.report_id.toString(),
            victim_id: newVictim.victim_id,
            report: newReport,
            victim: newVictim,
          });
          await this.reportVictimRepository.save(reportVictim);
          break;
        }
        // If the party is a suspect
        case IncidentRelationship.SUSPECT: {
          // Create and save a new suspect
          const newSuspect = this.suspectRepository.create({
            suspect_id: generateUUID("SUSPECT"),
            ...baseInfo,
            description: party.statement ?? undefined,
            report: newReport,
          });
          await this.suspectRepository.save(newSuspect);
          break;
        }

        default:
          throw new AppError(
            `Unknown party relation: ${party.incidentRelation}`,
            HttpStatusCode.BAD_REQUEST,
            ErrorCode.INVALID_RELATED_PARTY
          );
      }
    }

    // Create and save each evidence entry
    for (const ev of evidences) {
      await this.evidenceRepository.save(
        this.evidenceRepository.create({
          evidence_id: generateUUID("EVIDENCE"),
          report: newReport,
          evidence_type: ev.evidenceType,
          current_location: ev.evidenceLocation || undefined,
          description: ev.description || undefined,
          attach_file: ev.attachments?.length ? ev.attachments.join(" ; ") : undefined,
        })
      );
    }
    // Retrieve and return the full report with all relations populated
    const savedReport = await this.reportRepository.findOneOrFail({
      where: { report_id: newReport.report_id },
      relations: {
        suspects: true,
        reportVictims: {
          victim: true,
        },
        reportWitnesses: {
          witness: true,
        },
        evidences: true,
      },
    });

    return savedReport;
  }
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
        report_id: Number(reportId),
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