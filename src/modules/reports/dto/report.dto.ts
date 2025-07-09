import {
  CrimeType,
  SeverityLevel,
  ReportStatus,
  ReporterIncidentRelationship,
} from "@/modules/reports/enums/report.enum";

export interface UpdateReportStatusDto {
  reportStatus: ReportStatus;
}

export interface ReportListResponseDto {
  report_id: string;
  crime_type: CrimeType;
  severity: SeverityLevel;
  status: ReportStatus;
  description?: string;
  incident_date: Date;
  reported_at: Date;
  reporter_fullname: string;
  reporter_email: string;
}

export interface BasicReportInfoDto {
  reportId: string;
  reportDate: string;
  reportTime: string;
  reportStatus: ReportStatus;
}

export interface ReporterInfoDto {
  fullname: string;
  email: string;
  address: string;
  phoneNumber: string;
  incidentRelation: ReporterIncidentRelationship;
}

export interface IncidentInfoDto {
  crimeType: CrimeType;
  severity: SeverityLevel;
  dateOccur: string;
  detailAddress: string | null;
  description: string;
}

export interface RelevantPartyDto {
  fullname: string;
  incidentRelation: ReporterIncidentRelationship;
  gender: string;
  nationality: string | null;
  statement: string;
}

export interface EvidenceDto {
  evidenceType: string;
  evidenceLocation: string;
  description: string;
  attachments: string[];
}

export interface ReportDetailResponseDto {
  basicReportInfo: BasicReportInfoDto;
  reporterInfo: ReporterInfoDto;
  incidentInfo: IncidentInfoDto;
  relevantParties: RelevantPartyDto[];
  evidences: EvidenceDto[];
}

export interface ApiResponseDto<T> {
  code: number;
  message: string;
  result: T;
}
