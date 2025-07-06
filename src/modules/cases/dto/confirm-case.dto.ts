import { CaseStatus } from '../entities/case.entity';

interface IConfirmCaseDto {
  username: string;
  notes?: string;
}

export class ConfirmCaseDto implements IConfirmCaseDto {
  username!: string;
  notes?: string;
}

export class ConfirmCaseResponseDto {
  caseId: string;
  status: CaseStatus;
  mainInvestigatorUsername: string;
  confirmedAt: Date;
  message: string;

  constructor(caseId: string, status: CaseStatus, mainInvestigatorUsername: string, confirmedAt: Date) {
    this.caseId = caseId;
    this.status = status;
    this.mainInvestigatorUsername = mainInvestigatorUsername;
    this.confirmedAt = confirmedAt;
    this.message = 'Case confirmed and main investigator assigned successfully';
  }
}
