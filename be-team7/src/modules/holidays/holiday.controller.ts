import { Request, Response } from "express";

import { AppResponse } from "@/common/success.response";
import { HttpStatusCode } from "@/constants/status-code";
import { SuccessMessages, ErrorMessages } from "@/constants/message";

import holidayService from "./holiday.service";
import { CreateHolidayDto } from "./dto/holiday.create.dto";

class HolidayController {
  createHoliday = async (req: Request, res: Response) => {
    const data: CreateHolidayDto = req.body;

    const newHoliday = await holidayService.createHoliday(data);

    if (!newHoliday) {
      return new AppResponse({
        message: ErrorMessages.HOLIDAY_CREATE_FAILED,
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      }).sendResponse(res);
    }
    return new AppResponse({
      message: SuccessMessages.HOLIDAY.HOLIDAY_CREATED,
      statusCode: HttpStatusCode.CREATED,
      data: newHoliday,
    }).sendResponse(res);
  };
  getAllHolidays = async (req: Request, res: Response) => {
    const holidays = await holidayService.getAllHolidays();

    if (!holidays || holidays.length === 0) {
      return new AppResponse({
        message: ErrorMessages.HOLIDAY_NOT_FOUND,
        statusCode: HttpStatusCode.NOT_FOUND,
      }).sendResponse(res);
    }

    return new AppResponse({
      message: SuccessMessages.HOLIDAY.HOLIDAY_GET,
      statusCode: HttpStatusCode.OK,
      data: holidays,
    }).sendResponse(res);
  };
}

export default new HolidayController();
