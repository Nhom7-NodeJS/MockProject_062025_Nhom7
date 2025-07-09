import { Request, Response } from "express";
import WarrantService from "./warrant.service";
import { HttpStatusCode } from "@/constants/status-code";
import { SuccessMessages, ErrorMessages } from "@/constants/message";
import { AppResponse } from "@/common/success.response";
import { validateCreateWarrant } from "./warrant.validate";
import { validateSearchWarrantByName } from "./warrant.validate";

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
    // Validate the request body
  const result = await validateCreateWarrant(req.body);
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
  searchWarrantByName = async (req: Request, res: Response) => {
    let warrant_name = req.body.warrant_name;
     const result = await validateSearchWarrantByName(req.body);
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
     
      const warrants = await WarrantService.searchWarrantByName(warrant_name);

      if (!warrants || warrants.length === 0) {
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
  };
  getWarrantById = async (req: Request, res: Response) => {
    const { warrant_id } = req.params;

    try {
      const warrant = await WarrantService.getWarrantById(warrant_id);

      if (!warrant) {
        return new AppResponse({
          message: ErrorMessages.Warrant_NOT_FOUND,
          statusCode: HttpStatusCode.NOT_FOUND,
        }).sendResponse(res);
      }

      return new AppResponse({
        message: SuccessMessages.Warrant.WARRANT_GET,
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
