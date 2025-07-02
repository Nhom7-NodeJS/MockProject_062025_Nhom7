export class CreateInvestigationPlanDto {
  investigationPlanId!: string;   // PK
  createdOfficerId!: string;       // FK
  caseId!: string;                 // FK
  deadlineDate!: Date;
  result?: string;
  status?: string;
  createAt!: Date;
  planContent!: string;
  isDeleted?: boolean;
}
export interface InvestigationPlanResponseDto {
  investigationPlanId: string;   // PK
  createdOfficerId: string;       // FK
  caseId: string;                 // FK
  deadlineDate: Date;
  result?: string;
  status?: string;
  createAt: Date;
  planContent: string;
  isDeleted?: boolean;
}