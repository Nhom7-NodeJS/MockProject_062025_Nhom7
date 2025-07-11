import { NextFunction, Request, Response } from "express";

import financialInvestService from "@/modules/financial_invests/financial_invest.service";
import { AppResponse } from "@/common/success.response";
import { SuccessMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";

class FinancialInvestController {
  async updateFinancialInvest(req: Request, res: Response) {
    const { evidenceId } = req.params;
    const { summary, fileUrl } = req.body;

    const result = await financialInvestService.updateFinancialInvest(
      evidenceId,
      summary,
      fileUrl
    );

    return new AppResponse({
      message: SuccessMessages.FINANCIAL_INVEST.FINANCIAL_INVEST_UPDATED,
      statusCode: HttpStatusCode.OK,
      data: result,
    }).sendResponse(res);
  }
}

export default new FinancialInvestController();
