import Joi from "joi";
import { ReportStatus } from "../enums/report.enum";

export const UpdateReportStatusSchema = Joi.object({
  reportStatus: Joi.string()
    .valid(...Object.values(ReportStatus))
    .required()
    .messages({
      'any.required': 'Report status is required',
      'any.only': `Report status must be one of: ${Object.values(ReportStatus).join(', ')}`
    })
});