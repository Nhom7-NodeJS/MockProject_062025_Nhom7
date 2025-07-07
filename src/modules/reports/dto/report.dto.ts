// Interface representing an evidence item submitted in the incident report
export interface Evidences {
  evidenceType: string;
  evidenceLocation: string | null;
  description: string | null;
  attachments: string[];
}

// Interface representing a relevant party involved in the incident
export interface RelevantParties {
  fullname: string | null;
  incidentRelation: "Victim" | "Witness" | "Suspect";
  gender: "Male" | "Female" | "Other";
  nationality: string | null;
  statement: string | null;
}

// Interface representing detailed information about the incident
export interface IncidentInfo {
  crimeType: string;
  severity: "Minor" | "Moderate" | "Serious";
  dateOccur: string;
  detailAddress: string | null;
  description: string | null;
}

// Interface representing the person who submitted the report
export interface ReporterInfo {
  fullname: string;
  email: string;
  address: string | null;
  phoneNumber: string;
  incidentRelation: "Victim" | "Witness" | "Offender" | "Anonymous";
}

// Interface representing basic metadata of the incident report
export interface BasicReportInfo {
  reportId: string;
  reportDate: string;
  reportTime: string;
  reportStatus: "Pending" | "Approved" | "Rejected";
}

// Interface for the request body when creating a new incident report
export interface CreateIncidentReportDto {
  reporterInfo: ReporterInfo;
  incidentInfo: IncidentInfo;
  relevantParties: RelevantParties[];
  evidences: Evidences[];
}

// Interface for the full response of an incident report
export interface IncidentReportResponseDto {
  basicReportInfo: BasicReportInfo;
  reporterInfo: ReporterInfo;
  incidentInfo: IncidentInfo;
  relevantParties: RelevantParties[];
  evidences: Evidences[];
}