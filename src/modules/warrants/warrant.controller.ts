import { Request, Response } from "express";
import WarrantService from "./warrant.service";
import { HttpStatusCode } from "@/constants/status-code";
import { SuccessMessages, ErrorMessages } from "@/constants/message";
import { AppResponse } from "@/common/success.response";
import { validateWarrant } from "./warrant.validate";

class WarrantController {
  // Lấy tất cả lệnh
  async getAllWarrants(req: Request, res: Response) {
    try {
      const warrants = await WarrantService.getAllWarrants();

      if (!warrants) {
        return new AppResponse({
          message: ErrorMessages.Warrant_NOT_FOUND,
          statusCode: HttpStatusCode.NOT_FOUND,
        }).sendResponse(res);
      }

      return new AppResponse({
        message: SuccessMessages.Warrant.WARRANT_GET,
        statusCode: HttpStatusCode.OK,
        data: warrants,
      }).sendResponse(res);
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: "Internal server error",
      });
    }
  }

  // Lấy lệnh đang thực thi
  async getExecutingWarrants(req: Request, res: Response) {
    try {
      const warrants = await WarrantService.getExecutingWarrants();

      if (!warrants) {
        return new AppResponse({
          message: ErrorMessages.Warrant_NOT_FOUND,
          statusCode: HttpStatusCode.NOT_FOUND,
        }).sendResponse(res);
      }

      return new AppResponse({
        message: SuccessMessages.Warrant.WARRANT_GET,
        statusCode: HttpStatusCode.OK,
        data: warrants,
      }).sendResponse(res);
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: "Internal server error",
      });
    }
  }

   async getCompletedWarrants(req: Request, res: Response) {
    try {
      const warrants = await WarrantService.getCompletedWarrants();

      if (!warrants) {
        return new AppResponse({
          message: ErrorMessages.Warrant_NOT_FOUND,
          statusCode: HttpStatusCode.NOT_FOUND,
        }).sendResponse(res);
      }

      return new AppResponse({
        message: SuccessMessages.Warrant.WARRANT_GET,
        statusCode: HttpStatusCode.OK,
        data: warrants,
      }).sendResponse(res);
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: "Internal server error",
      });
    }
  }
  createNewWarrant = async (req: Request, res: Response) => {
  const result = await validateWarrant(req.body);
if (!result.valid) {
  return res.status(400).json({
    message: "Validation failed",
    errors: result.errors.map((e) => ({
      property: e.property,
      constraints: e.constraints,
    })),
  });
}

    try {
     
      const warrantData = req.body;

      const newWarrant = await WarrantService.createNewWarrant(warrantData);

      return new AppResponse({
        message: SuccessMessages.Warrant.WARRANT_CREATED,
        statusCode: HttpStatusCode.CREATED,
        data: newWarrant,
      }).sendResponse(res);
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: "Internal server error",
      });
    }
  }
}

export default new WarrantController();
