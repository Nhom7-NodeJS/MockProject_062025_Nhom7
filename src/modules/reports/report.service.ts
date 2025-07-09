import { AppDataSource } from '@/config/database.config';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';

import {
  ReportListResponseDto,
  ReportDetailResponseDto,
  BasicReportInfoDto,
  ReporterInfoDto,
  IncidentInfoDto,
  RelevantPartyDto,
  EvidenceDto,
} from './dto/report.dto';

import {
  ReporterIncidentRelationship,
  CrimeType,
  SeverityLevel,
  ReportStatus,
} from './enums/report.enum';

export class ReportService {
  private reportRepository: Repository<Report>;

  constructor() {
    this.reportRepository = AppDataSource.getRepository(Report);
  }

  async getReportList(): Promise<ReportListResponseDto[]> {
    const reports = await this.reportRepository.find({
      where: { is_deleted: false },
      order: { reported_at: 'DESC' },
    });

    return reports.map((report) => ({
      report_id: report.report_id,
      crime_type: report.crime_type as CrimeType,
      severity: report.severity as SeverityLevel,
      status: report.status as ReportStatus,
      description: report.description,
      incident_date: report.incident_date,
      reported_at: report.reported_at,
      reporter_fullname: report.reporter_fullname,
      reporter_email: report.reporter_email,
    }));
  }

  async getReportDetail(reportId: string): Promise<ReportDetailResponseDto | null> {
    const report = await this.reportRepository.findOne({
      where: {
        report_id: reportId,
        is_deleted: false,
      },
      relations: [
        'evidences',
        'reportVictims',
        'reportVictims.victim',
        'reportWitnesses',
        'reportWitnesses.witness',
        'suspects',
      ],
    });

    if (!report) return null;

    const reportDate = report.reported_at.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });

    const reportTime = report.reported_at.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });

    const dateOccur = report.incident_date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
    });

    const basicReportInfo: BasicReportInfoDto = {
      reportId: report.report_id,
      reportDate,
      reportTime,
      reportStatus: report.status as ReportStatus,
    };

    const reporterInfo: ReporterInfoDto = {
      fullname: report.reporter_fullname,
      email: report.reporter_email,
      address: report.reporter_location,
      phoneNumber: report.reporter_phone_number || '',
      incidentRelation: report.reporter_incident_relationship as ReporterIncidentRelationship,
    };

    const incidentInfo: IncidentInfoDto = {
      crimeType: report.crime_type as CrimeType,
      severity: report.severity as SeverityLevel,
      dateOccur,
      detailAddress: report.case_location,
      description: report.description || '',
    };

    const relevantParties: RelevantPartyDto[] = [];

    // Witnesses
    report.reportWitnesses?.forEach((rw) => {
      if (rw.witness) {
        relevantParties.push({
          fullname: rw.witness.fullname,
          incidentRelation: ReporterIncidentRelationship.WITNESS,
          gender: rw.witness.gender || '',
          nationality: rw.witness.national || null,
          statement: rw.witness.statement || '',
        });
      }
    });

    // Victims
    report.reportVictims?.forEach((rv) => {
      if (rv.victim) {
        relevantParties.push({
          fullname: rv.victim.fullname || '',
          incidentRelation: ReporterIncidentRelationship.VICTIM,
          gender: rv.victim.gender || '',
          nationality: rv.victim.national || null,
          statement: rv.victim.description || '',
        });
      }
    });

    // Suspects
    report.suspects?.forEach((suspect) => {
      relevantParties.push({
        fullname: suspect.fullname || '',
        incidentRelation: 'Suspect' as any, // Optional: Add SUSPECT to enum if desired
        gender: suspect.gender || '',
        nationality: suspect.national || null,
        statement: suspect.description || '',
      });
    });

    const evidences: EvidenceDto[] = [];

    report.evidences?.forEach((e) => {
      const attachments = e.attach_file
        ? e.attach_file.split(',').map((url) => url.trim())
        : [];

      evidences.push({
        evidenceType: 'physical', // you can define dynamic value later
        evidenceLocation: e.current_location,
        description: e.description || '',
        attachments,
      });
    });

    return {
      basicReportInfo,
      reporterInfo,
      incidentInfo,
      relevantParties,
      evidences,
    };
  }
}
