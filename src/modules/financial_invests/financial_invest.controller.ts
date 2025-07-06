import { NextFunction, Request, Response } from "express";

import financialInvestService from "@/modules/financial_invests/financial_invest.service";
import { AppResponse } from "@/common/success.response";
import { SuccessMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";

class FinancialInvestController {
  async getAll(req: Request, res: Response) {
    const result = await financialInvestService.getAll();

    return new AppResponse({
      message: SuccessMessages.FINANCIAL_INVEST.FINANCIAL_INVEST_GET,
      statusCode: HttpStatusCode.OK,
      data: result,
    }).sendResponse(res);
  }

  async getById(req: Request, res: Response) {
    const { evidenceId } = req.params;
    const data = await financialInvestService.getDetailByEvidenceId(evidenceId);

    return new AppResponse({
      message: SuccessMessages.FINANCIAL_INVEST.FINANCIAL_INVEST_GET,
      statusCode: HttpStatusCode.OK,
      data: data,
    }).sendResponse(res);
  }
}

export default new FinancialInvestController();
