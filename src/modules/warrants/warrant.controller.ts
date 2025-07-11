import { Request, Response } from "express";

import { AppResponse } from "@/common/success.response";
import { HttpStatusCode } from "@/constants/status-code";
import { SuccessMessages, ErrorMessages } from "@/constants/message";

import warrantService from "./warrant.service";

import { CreateWarrantDto } from "./dto/warrant.create.dto";
import { GetAllWarrantStatus } from "./dto/warrant.getallcasestatus";

class WarrantController {
  async getAllWarrantsWithStatus(req: Request, res: Response) {
    const { status } = req.query as GetAllWarrantStatus;

    const warrants = await warrantService.getAllWarrants(status);

    if (!warrants) {
      return new AppResponse({
        message: ErrorMessages.WARRANT_NOT_FOUND,
        statusCode: HttpStatusCode.NOT_FOUND,
      }).sendResponse(res);
    }

    return new AppResponse({
      message: SuccessMessages.WARRANT.WARRANT_GET,
      statusCode: HttpStatusCode.OK,
      data: warrants,
    }).sendResponse(res);
  }

 createNewWarrant = async (req: Request, res: Response) => {
  const uploaded = (req as any).uploadedFiles; // ✅ lấy đúng dữ liệu
  const fileUrls = uploaded?.attached_file || [];

  const data: CreateWarrantDto = {
    ...req.body,
    attached_file: fileUrls, // ✅ gán URLs đúng
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

    if (!warrants || warrants.length === 0) {
      return new AppResponse({
        message: ErrorMessages.WARRANT_NOT_FOUND,
        statusCode: HttpStatusCode.NOT_FOUND,
      }).sendResponse(res);
    }

    return new AppResponse({
      message: SuccessMessages.WARRANT.WARRANT_GET,
      statusCode: HttpStatusCode.OK,
      data: warrants,
    }).sendResponse(res);
  };
  getWarrantById = async (req: Request, res: Response) => {
    const { warrant_id } = req.params;

    try {
      const warrant = await warrantService.getWarrantById(warrant_id);

      if (!warrant) {
        return new AppResponse({
          message: ErrorMessages.WARRANT_NOT_FOUND,
          statusCode: HttpStatusCode.NOT_FOUND,
        }).sendResponse(res);
      }

      return new AppResponse({
        message: SuccessMessages.WARRANT.WARRANT_GET,
        statusCode: HttpStatusCode.OK,
        data: warrant,
      }).sendResponse(res);
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: "Internal server error",
      });
    }
  };
}

export default new WarrantController();
