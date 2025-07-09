export enum SeverityLevel {
  MINOR = "Minor",
  MODERATE = "Moderate",
  SERIOUS = "Serious",
  CRITICAL = "Critical",
}
export enum CrimeType {
  CRIMES_AGAINST_PERSONS = "Crimes Against Persons",
  CRIMES_AGAINST_PROPERTY = "Crimes Against Property",
  WHITE_COLLAR_CRIMES = "White-Collar Crimes",
  CYBER_CRIMES = "Cyber Crimes",
  DRUG_RELATED_CRIMES = "Drug-related Crimes",
  PUBLIC_ORDER_CRIMES = "Public Order Crimes",
}
export enum ReportStatus {
  APPROVED = "Approved",
  PENDING = "Pending",
  REJECTED = "Rejected",
}

export enum ReporterIncidentRelationship {
  VICTIM = "Victim",
  WITNESS = "Witness",
  BYSTANDER = "Bystander",
}