import Joi from "joi";
import { TypeOfHoliday } from "../enums/holiday.enum";

export const createHolidaySchema = Joi.object({
  holiday_name: Joi.string().required(),
  type_of_holiday: Joi.string()
    .valid(TypeOfHoliday.FEDERAL_HOLIDAY, TypeOfHoliday.STATES_HOLIDAY)
    .required(),
  date_of_holiday: Joi.date().iso().required(),
  note: Joi.string().optional(),
});
