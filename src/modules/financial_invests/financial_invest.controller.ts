import { Request, Response } from "express";
import financialInvestService from "./financial_invest.service";
import { AppResponse } from "@/common/success.response";
import { HttpStatusCode } from "@/constants/status-code";
import { ErrorMessages, SuccessMessages } from "@/constants/message";
import { AppError } from "@/common/error.response";
import { ErrorCode } from "@/constants/error-code";
import { UpdateFinancialInvestDto, FinancialInvestResponseDto } from "./dto/financial_invest.dto";
import { toFinancialInvestResponseDto } from "./financial_invest.mapper";


class FinancialInvestController {
  async confirm(req: Request, res: Response) {
    const evidence_id: string = req.params.evidence_id;
    if (!evidence_id) {
      throw new AppError(
        ErrorMessages.INVALID_ID,
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_PARAMS
      );
    }
    const invest = await financialInvestService.confirm(evidence_id);
    const dto: FinancialInvestResponseDto = toFinancialInvestResponseDto(invest);
    return new AppResponse({
      message: SuccessMessages.FINANCIAL_INVEST.CONFIRMED,
      statusCode: HttpStatusCode.OK,
      data: dto,
    }).sendResponse(res);
  }

  async update(req: Request, res: Response) {
    const dto: UpdateFinancialInvestDto = req.body;
    if (!dto.evidence_id || !dto.summary) {
      throw new AppError(
        ErrorMessages.FINANCIAL_INVEST_NOT_FOUND,
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.FINANCIAL_INVEST_NOT_FOUND
      );
    }
    const invest = await financialInvestService.update(dto);
    const responseDto: FinancialInvestResponseDto = toFinancialInvestResponseDto(invest);
    return new AppResponse({
      message: SuccessMessages.FINANCIAL_INVEST.UPDATED,
      statusCode: HttpStatusCode.OK,
      data: responseDto,
    }).sendResponse(res);
  }
}

export default new FinancialInvestController();