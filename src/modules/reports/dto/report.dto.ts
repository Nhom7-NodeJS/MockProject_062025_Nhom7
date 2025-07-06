export interface UpdateReportStatusDto {
  reportStatus: string;
}
export interface ReportResponseDto {
  report_id: string;
  type_report: string;
  severity: string;
  status: string;
  description?: string;
  incident_date: Date;
  reported_at: Date;
  reporter_fullname: string;
  reporter_email: string;
}
