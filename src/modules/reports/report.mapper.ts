import { Report } from "@/modules/reports/entities/report.entity";
import { Evidence } from "@/modules/evidences/entities/evidence.entity";
import { Suspect } from "@/modules/suspects/entities/suspect.entity";
import { ReportWitness } from "@/modules/reports_witnesses/entities/report_witness.entity";
import { ReportVictim } from "@/modules/reports_victims/entities/report_victim.entity";
import {
  IncidentReportResponseDto,
  BasicReportInfo,
  ReporterInfo,
  IncidentInfo,
  InitialEvidences,
  RelevantParties
} from "@/modules/reports/dto/report.dto";
import { 
  formatUSDate, 
  formatUSDateTime, 
  formatUSTime 
} from "@/helpers/format-datetime";

export const mapEvidence = (e: Evidence): InitialEvidences => ({
  evidenceType: e.evidence_type,
  evidenceLocation: e.current_location,
  description: e.description ?? null,
  attachments: e.attach_file,
});

export const mapSuspect = (s: Suspect): RelevantParties => ({
  fullname: s.fullname ?? null,
  incidentRelation: "Suspect",
  gender: s.gender as "Male" | "Female" | "Unknown",
  nationality: s.national ?? null,
  statement: s.description ?? null,
});

export const mapVictim = (v: ReportVictim): RelevantParties => ({
  fullname: v.victim.fullname ?? null,
  incidentRelation: "Victim",
  gender: v.victim.gender as "Male" | "Female" | "Unknown",
  nationality: v.victim.national ?? null,
  statement: v.victim.description ?? null,
});

export const mapWitness = (w: ReportWitness): RelevantParties => ({
  fullname: w.witness.fullname ?? null,
  incidentRelation: "Witness",
  gender: w.witness.gender as "Male" | "Female" | "Unknown",
  nationality: w.witness.national ?? null,
  statement: w.witness.statement ?? null,
});

export const mapReporterInfo = (r: Report): ReporterInfo => ({
  fullname: r.reporter_fullname,
  email: r.reporter_email,
  address: r.reporter_location,
  phoneNumber: r.reporter_phone_number ?? "",
  incidentRelation: r.reporter_incident_relationship,
});

export const mapIncidentInfo = (r: Report): IncidentInfo => ({
  crimeType: r.crime_type,
  severity: r.severity,
  dateOccur: formatUSDateTime(r.incident_date),
  detailAddress: r.case_location,
  description: r.description ?? null,
});

export const mapBasicReportInfo = (r: Report): BasicReportInfo => ({
  reportId: r.report_id,
  reportDate: formatUSDate(r.reported_at),
  reportTime: formatUSTime(r.reported_at),
  reportStatus: r.status,
});

export const toIncidentReportResponseDto = (report: Report): IncidentReportResponseDto => ({
  basicReportInfo: mapBasicReportInfo(report),
  reporterInfo: mapReporterInfo(report),
  incidentInfo: mapIncidentInfo(report),
  evidences: report.evidences?.map(mapEvidence) ?? [],
  relevantParties: [
    ...(report.suspects?.map(mapSuspect) ?? []),
    ...(report.reportVictims?.map(mapVictim) ?? []),
    ...(report.reportWitnesses?.map(mapWitness) ?? []),
  ],
});
