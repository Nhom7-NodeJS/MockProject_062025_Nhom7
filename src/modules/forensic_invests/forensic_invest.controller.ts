import { NextFunction, Request, Response } from "express";

import { AppResponse } from "@/common/success.response";
import { SuccessMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";

import forensicInvestService from "./forensic_invest.service";

export class ForensicInvestController {
  async getAll(req: Request, res: Response) {
    const result = await forensicInvestService.getAll();

    return new AppResponse({
      message: SuccessMessages.FORENSIC_INVEST.FORENSIC_INVEST_GET,
      statusCode: HttpStatusCode.OK,
      data: result,
    }).sendResponse(res);
  }

  async getById(req: Request, res: Response) {
    const { warrantId } = req.params;
    const data = await forensicInvestService.getDetailByWarrantId(warrantId);

    return new AppResponse({
      message: SuccessMessages.FORENSIC_INVEST.FORENSIC_INVEST_GET,
      statusCode: HttpStatusCode.OK,
      data: data,
    }).sendResponse(res);
  }
}

export default new ForensicInvestController();
