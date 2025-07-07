import { Report } from '@/modules/reports/entities/report.entity';
import { Evidence } from '@/modules/evidences/entities/evidence.entity';
import { Suspect } from '@/modules/suspects/entities/suspect.entity';
import { ReportWitness } from '@/modules/reports_witnesses/entities/report_witness.entity';
import { ReportVictim } from '@/modules/reports_victims/entities/report_victim.entity';
import { IncidentReportResponseDto, BasicReportInfo, ReporterInfo, IncidentInfo, Evidences, RelevantParties } from '@/modules/reports/dto/report.dto';

export const mapEvidence = (e: Evidence): Evidences => ({
  evidenceType: 'physical',
  evidenceLocation: e.current_location,
  description: e.description ?? null,
  attachments: [e.attach_file],
});

export const mapSuspect = (s: Suspect): RelevantParties => ({
  fullname: s.fullname ?? null,
  incidentRelation: 'Suspect',
  gender: s.gender as 'Male' | 'Female' | 'Other',
  nationality: s.national ?? null,
  statement: s.description ?? null,
});

export const mapVictim = (v: ReportVictim): RelevantParties => ({
  fullname: v.victim.fullname ?? null,
  incidentRelation: 'Victim',
  gender: v.victim.gender as 'Male' | 'Female' | 'Other',
  nationality: v.victim.national ?? null,
  statement: v.victim.description ?? null,
});

export const mapWitness = (w: ReportWitness): RelevantParties => ({
  fullname: w.witness.fullname ?? null,
  incidentRelation: 'Witness',
  gender: w.witness.gender as 'Male' | 'Female' | 'Other',
  nationality: w.witness.national ?? null,
  statement: w.witness.statement ?? null,
});

export const mapReporterInfo = (r: Report): ReporterInfo => ({
  fullname: r.reporter_fullname,
  email: r.reporter_email,
  address: r.reporter_location,
  phoneNumber: r.reporter_phone_number ?? '',
  incidentRelation: 'Witness',
});

export const mapIncidentInfo = (r: Report): IncidentInfo => ({
  crimeType: r.type_report,
  severity: r.severity as 'Minor' | 'Moderate' | 'Serious',
  dateOccur: r.incident_date.toISOString().split('T')[0],
  detailAddress: r.case_location,
  description: r.description ?? null,
});

export const mapBasicReportInfo = (r: Report): BasicReportInfo => ({
  reportId: r.report_id,
  reportDate: r.reported_at.toISOString().split('T')[0],
  reportTime: r.reported_at.toISOString().split('T')[1].slice(0, 5),
  reportStatus: r.status as 'Pending' | 'Approved' | 'Rejected',
});

export const toIncidentReportResponseDto = (report: Report): IncidentReportResponseDto => ({
  basicReportInfo: mapBasicReportInfo(report),
  reporterInfo: mapReporterInfo(report),
  incidentInfo: mapIncidentInfo(report),
  evidences: report.evidences.map(mapEvidence),
  relevantParties: [
    ...report.suspects.map(mapSuspect),
    ...report.reportVictims.map(mapVictim),
    ...report.reportWitnesses.map(mapWitness),
  ],
});
