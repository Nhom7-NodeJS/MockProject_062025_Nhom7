import { Request, Response } from "express";

import { AppResponse } from "@/common/success.response";
import { HttpStatusCode } from "@/constants/status-code";
import { SuccessMessages, ErrorMessages } from "@/constants/message";

import warrantService from "./warrant.service";
import { validateCreateWarrant } from "./warrant.validate";
import { validateSearchWarrantByName } from "./warrant.validate";
import { CreateWarrantDto } from "./dto/warrant.create.dto";

class WarrantController {
  // Lấy tất cả lệnh
  async getAllWarrants(req: Request, res: Response) {
    try {
      const warrants = await warrantService.getAllWarrants();

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
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: "Internal server error",
      });
    }
  }

  // Lấy lệnh đang thực thi
  async getExecutingWarrants(req: Request, res: Response) {
    try {
      const warrants = await warrantService.getExecutingWarrants();

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
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: "Internal server error",
      });
    }
  }

  async getCompletedWarrants(req: Request, res: Response) {
    try {
      const warrants = await warrantService.getCompletedWarrants();

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
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: "Internal server error",
      });
    }
  }
  createNewWarrant = async (req: Request, res: Response) => {
    const uploaded = req.body.uploadedFiles;
    const fileUrls = uploaded?.attached_file || [];

    const data: CreateWarrantDto = {
      ...req.body,
      attached_file: fileUrls,
    };
    // validate the request body
    const result = await validateCreateWarrant(data);
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
      const newWarrant = await warrantService.createNewWarrant(data);

      return new AppResponse({
        message: SuccessMessages.WARRANT.WARRANT_CREATED,
        statusCode: HttpStatusCode.CREATED,
        data: newWarrant,
      }).sendResponse(res);
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: "Internal server error",
      });
    }
  };
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
    } catch (error) {
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
        error: "Internal server error",
      });
    }
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
