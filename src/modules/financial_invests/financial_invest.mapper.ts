import { FinancialInvest } from "./entities/financial_invest.entities";
import { FinancialInvestResponseDto } from "./dto/financial_invest.dto";

export const toFinancialInvestResponseDto = (
  entity: FinancialInvest
): FinancialInvestResponseDto => {
  const { evidence_id, summary } = entity;
  return { evidence_id, summary };
};