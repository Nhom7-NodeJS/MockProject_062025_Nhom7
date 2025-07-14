import { Request, Response } from "express";

import { AppResponse } from "@/common/success.response";
import { HttpStatusCode } from "@/constants/status-code";
import { SuccessMessages, ErrorMessages } from "@/constants/message";

import warrantService from "./warrant.service";

import { CreateWarrantDto } from "./dto/warrant.create.dto";
import { GetAllWarrantStatus } from "./dto/warrant.getallcasestatus";
import { AppError } from "@/common/error.response";
import { ErrorCode } from "@/constants/error-code";

class WarrantController {
  async getAllWarrantsWithStatus(req: Request, res: Response) {
    const { status } = req.query as GetAllWarrantStatus;

    const warrants = await warrantService.getAllWarrants(status);

    if (!warrants) {
      throw new AppError(
        ErrorMessages.WARRANT_NOT_FOUND,
        HttpStatusCode.NOT_FOUND,
        ErrorCode.WARRANT_NOT_FOUND
      );
    }

    return new AppResponse({
      message: SuccessMessages.WARRANT.WARRANT_GET,
      statusCode: HttpStatusCode.OK,
      data: warrants,
    }).sendResponse(res);
  }

  createNewWarrant = async (req: Request, res: Response) => {
    const uploaded = (req as any).uploadedFiles;
    const fileUrls = uploaded?.attached_file || [];

    const data: CreateWarrantDto = {
      ...req.body,
      attached_file: fileUrls, //=
    };

    const newWarrant = await warrantService.createNewWarrant(data);

    return new AppResponse({
      message: SuccessMessages.WARRANT.WARRANT_CREATED,
      statusCode: HttpStatusCode.CREATED,
      data: newWarrant,
    }).sendResponse(res);
  };

  searchWarrantByName = async (req: Request, res: Response) => {
    let warrant_name = req.body.warrant_name;
    const warrants = await warrantService.searchWarrantByName(warrant_name);

  

    return new AppResponse({
      message: SuccessMessages.WARRANT.WARRANT_GET,
      statusCode: HttpStatusCode.OK,
      data: warrants,
    }).sendResponse(res);
  };
  getWarrantById = async (req: Request, res: Response) => {
    const { warrant_id } = req.params;

    const warrant = await warrantService.getWarrantById(warrant_id);

    return new AppResponse({
      message: SuccessMessages.WARRANT.WARRANT_GET,
      statusCode: HttpStatusCode.OK,
      data: warrant,
    }).sendResponse(res);
  };
}

export default new WarrantController();
