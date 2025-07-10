// export interface UpdateReportStatusDto {
//   reportStatus: string;
// }
// export interface ReportResponseDto {
//   report_id: string;
//   type_report: string;
//   severity: string;
//   status: string;
//   description?: string;
//   incident_date: Date;
//   reported_at: Date;
//   reporter_fullname: string;
//   reporter_email: string;
  
// }



import { ReportStatus, CrimeType, SeverityLevel } from "../enums/report.enum";

export interface UpdateReportStatusDto {
  reportStatus: ReportStatus;
}

export interface ReportResponseDto {
  report_id: string;
  crime_type: CrimeType;
  severity: SeverityLevel;
  status: ReportStatus;
  description?: string;
  incident_date: Date;
  reported_at: Date;
  reporter_fullname: string;
  reporter_email: string;
  case_id?: string;
  user_id?: string;
}