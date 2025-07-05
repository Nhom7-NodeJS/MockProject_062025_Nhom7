export class UpdateFinancialInvestDto {
  evidence_id!: string;
  summary!: string;
}

export interface FinancialInvestResponseDto {
  evidence_id: string;
  summary: string;
}