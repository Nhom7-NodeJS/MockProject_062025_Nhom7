import { CaseStatus } from '../enums/case.enum';

export interface IConfirmCaseDto {
  investigators: string[];
  notes?: string;
}

export interface IConfirmCaseResponseDto {
  caseId: string;
  status: CaseStatus;
  investigators: string[];
  notes?: string;
  assignedAt: Date;
}
