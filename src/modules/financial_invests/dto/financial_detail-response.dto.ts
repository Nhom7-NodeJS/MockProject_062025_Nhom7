import { FinancialInvestStatus } from "../entities/financial_invest.entities";

export class FinancialDetailResponseDto {
  evidenceId?: string;
  warrantName?: string;
  deadline?: Date;
  summary?: string;
  status?: FinancialInvestStatus;
}
