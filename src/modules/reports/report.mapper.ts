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
import { Gender } from "@/modules/users/enums/user.enum"
import { IncidentRelationship } from "./enums/report.enum";
import { 
  formatUSDate, 
  formatUSDateTime, 
  formatUSTime 
} from "@/helpers/format-datetime";

export const mapEvidence = (e: Evidence): InitialEvidences => ({
  evidenceType: e.evidence_type,
  evidenceLocation: e.current_location ?? null,
  description: e.description ?? null,
  attachments: e.attach_file
    ? e.attach_file.split(" ; ").map((url) => url.trim())
    : [],
});

export const mapSuspect = (s: Suspect): RelevantParties => ({
  fullname: s.fullname ?? null,
  incidentRelation: IncidentRelationship.SUSPECT,
  gender: s.gender ?? Gender.UNKNOWN,
  nationality: s.national ?? null,
  statement: s.description ?? null,
});

export const mapVictim = (v: ReportVictim): RelevantParties => ({
  fullname: v.victim.fullname ?? null,
  incidentRelation: IncidentRelationship.VICTIM,
  gender: v.victim.gender ?? Gender.UNKNOWN,
  nationality: v.victim.national ?? null,
  statement: v.victim.description ?? null,
});

export const mapWitness = (w: ReportWitness): RelevantParties => ({
  fullname: w.witness.fullname ?? null,
  incidentRelation: IncidentRelationship.WITNESS,
  gender: w.witness.gender ?? Gender.UNKNOWN,
  nationality: w.witness.national ?? null,
  statement: w.witness.statement ?? null,
});

export const mapReporterInfo = (r: Report): ReporterInfo => ({
  fullname: r.reporter_fullname,
  email: r.reporter_email,
  address: r.reporter_address ?? null,
  phoneNumber: r.reporter_phone_number,
  incidentRelation: r.reporter_incident_relationship,
});

export const mapIncidentInfo = (r: Report): IncidentInfo => ({
  crimeType: r.crime_type,
  severity: r.severity,
  dateOccur: formatUSDateTime(r.incident_date),
  detailAddress: r.detail_address ?? null,
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
  relevantParties: [
    ...(report.suspects?.map(mapSuspect) ?? []),
    ...(report.reportVictims?.map(mapVictim) ?? []),
    ...(report.reportWitnesses?.map(mapWitness) ?? []),
  ],
  evidences: report.evidences?.map(mapEvidence) ?? [],
});
