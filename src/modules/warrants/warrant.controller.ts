import { Request, Response } from "express";
<<<<<<< HEAD
import WarrantService from "./warrant.service";
import { HttpStatusCode } from "@/constants/status-code";
import { SuccessMessages, ErrorMessages } from "@/constants/message";
import { AppResponse } from "@/common/success.response";
import { validateCreateWarrant } from "./warrant.validate";
import { validateSearchWarrantByName } from "./warrant.validate";
import { CreateWarrantDto } from "./dto/warrant.create.dto";
=======

import { AppResponse } from "@/common/success.response";
import { HttpStatusCode } from "@/constants/status-code";
import { SuccessMessages, ErrorMessages } from "@/constants/message";

import warrantService from "./warrant.service";
import { validateCreateWarrant } from "./warrant.validate";
import { validateSearchWarrantByName } from "./warrant.validate";
import { CreateWarrantDto } from "./dto/warrant.create.dto";

>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
class WarrantController {
  // Lấy tất cả lệnh
  async getAllWarrants(req: Request, res: Response) {
    try {
<<<<<<< HEAD
      const warrants = await WarrantService.getAllWarrants();

      if (!warrants) {
        return new AppResponse({
          message: ErrorMessages.Warrant_NOT_FOUND,
=======
      const warrants = await warrantService.getAllWarrants();

      if (!warrants) {
        return new AppResponse({
          message: ErrorMessages.WARRANT_NOT_FOUND,
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
          statusCode: HttpStatusCode.NOT_FOUND,
        }).sendResponse(res);
      }

      return new AppResponse({
<<<<<<< HEAD
        message: SuccessMessages.Warrant.WARRANT_GET,
=======
        message: SuccessMessages.WARRANT.WARRANT_GET,
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
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
<<<<<<< HEAD
      const warrants = await WarrantService.getExecutingWarrants();

      if (!warrants) {
        return new AppResponse({
          message: ErrorMessages.Warrant_NOT_FOUND,
=======
      const warrants = await warrantService.getExecutingWarrants();

      if (!warrants) {
        return new AppResponse({
          message: ErrorMessages.WARRANT_NOT_FOUND,
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
          statusCode: HttpStatusCode.NOT_FOUND,
        }).sendResponse(res);
      }

      return new AppResponse({
<<<<<<< HEAD
        message: SuccessMessages.Warrant.WARRANT_GET,
=======
        message: SuccessMessages.WARRANT.WARRANT_GET,
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
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
<<<<<<< HEAD
      const warrants = await WarrantService.getCompletedWarrants();

      if (!warrants) {
        return new AppResponse({
          message: ErrorMessages.Warrant_NOT_FOUND,
=======
      const warrants = await warrantService.getCompletedWarrants();

      if (!warrants) {
        return new AppResponse({
          message: ErrorMessages.WARRANT_NOT_FOUND,
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
          statusCode: HttpStatusCode.NOT_FOUND,
        }).sendResponse(res);
      }

      return new AppResponse({
<<<<<<< HEAD
        message: SuccessMessages.Warrant.WARRANT_GET,
=======
        message: SuccessMessages.WARRANT.WARRANT_GET,
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
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
<<<<<<< HEAD
      const newWarrant = await WarrantService.createNewWarrant(data);

      return new AppResponse({
        message: SuccessMessages.Warrant.WARRANT_CREATED,
=======
      const newWarrant = await warrantService.createNewWarrant(data);

      return new AppResponse({
        message: SuccessMessages.WARRANT.WARRANT_CREATED,
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
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
<<<<<<< HEAD
      const warrants = await WarrantService.searchWarrantByName(warrant_name);

      if (!warrants || warrants.length === 0) {
        return new AppResponse({
          message: ErrorMessages.Warrant_NOT_FOUND,
=======
      const warrants = await warrantService.searchWarrantByName(warrant_name);

      if (!warrants || warrants.length === 0) {
        return new AppResponse({
          message: ErrorMessages.WARRANT_NOT_FOUND,
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
          statusCode: HttpStatusCode.NOT_FOUND,
        }).sendResponse(res);
      }

      return new AppResponse({
<<<<<<< HEAD
        message: SuccessMessages.Warrant.WARRANT_GET,
=======
        message: SuccessMessages.WARRANT.WARRANT_GET,
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
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
<<<<<<< HEAD
      const warrant = await WarrantService.getWarrantById(warrant_id);

      if (!warrant) {
        return new AppResponse({
          message: ErrorMessages.Warrant_NOT_FOUND,
=======
      const warrant = await warrantService.getWarrantById(warrant_id);

      if (!warrant) {
        return new AppResponse({
          message: ErrorMessages.WARRANT_NOT_FOUND,
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
          statusCode: HttpStatusCode.NOT_FOUND,
        }).sendResponse(res);
      }

      return new AppResponse({
<<<<<<< HEAD
        message: SuccessMessages.Warrant.WARRANT_GET,
=======
        message: SuccessMessages.WARRANT.WARRANT_GET,
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
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
