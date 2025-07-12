import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "@/config/database.config";
import { Holiday } from "@/modules/holidays/entities/holiday.entity";
import { HttpStatusCode } from "@/constants/status-code";

export const checkHolidayMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 
    const { start_date, due_date } = req.body;

    if (!start_date) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Missing start_date",
      });
    }

    const start = new Date(start_date);
    const end = due_date ? new Date(due_date) : start; // without due_date, use start_date as end

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: "Invalid date format for start_date or due_date",
      });
    }

    const holidayRepo = AppDataSource.getRepository(Holiday);
    const holidays = await holidayRepo.find({
      where: { is_deleted: false },
    });

    const conflictHoliday = holidays.find((holiday) => {
      const holidayDate = new Date(holiday.date_of_holiday);
     //compare only the date part
      const holidayStr = holidayDate.toISOString().split("T")[0];
      const fromStr = start.toISOString().split("T")[0];
      const toStr = end.toISOString().split("T")[0];

      return holidayStr >= fromStr && holidayStr <= toStr;
    });

    if (conflictHoliday) {
      return res.status(HttpStatusCode.BAD_REQUEST).json({
        message: `Không thể giao task vào ngày nghỉ: ${conflictHoliday.holiday_name}`,
        holiday_date: conflictHoliday.date_of_holiday,
      });
    }

    next();
  
};
