<<<<<<< HEAD
import { NextFunction, Request, Response } from "express";
=======
import { Request, Response } from "express";
>>>>>>> origin/dev3

import { AppResponse } from "@/common/success.response";
import { SuccessMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";

import forensicInvestService from "./forensic_invest.service";

export class ForensicInvestController {
  async updateFinancialInvest(req: Request, res: Response) {
    const { evidenceId } = req.params;
    const { summary, fileUrl } = req.body;

    const result = await forensicInvestService.updateForensicInvest(
      evidenceId,
      summary,
      fileUrl
    );

    return new AppResponse({
      message: SuccessMessages.FORENSIC_INVEST.FORENSIC_INVEST_UPDATED,
      statusCode: HttpStatusCode.OK,
      data: result,
    }).sendResponse(res);
  }
}

export default new ForensicInvestController();
