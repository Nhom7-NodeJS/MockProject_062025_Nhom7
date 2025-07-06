import Joi from "joi";
import { QueryCaseDto } from "@/modules/cases/dto/case.dto";
import { CaseStatus, CaseType, CaseSeverity } from "../entities/case.entity";

export const QueryCaseSchema = Joi.object<QueryCaseDto>({
  status: Joi.string()
    .valid(...Object.values(CaseStatus))
    .optional()
    .messages({
      "string.base": "Status must be a string",
      "any.only": `Status must be one of: ${Object.values(CaseStatus).join(
        ", "
      )}`,
    }),
  type_case: Joi.string()
    .valid(...Object.values(CaseType))
    .optional()
    .messages({
      "string.base": "Case type must be a string",
      "any.only": `Case type must be one of: ${Object.values(CaseType).join(
        ", "
      )}`,
    }),
  severity: Joi.string()
    .valid(...Object.values(CaseSeverity))
    .optional()
    .messages({
      "string.base": "Severity must be a string",
      "any.only": `Severity must be one of: ${Object.values(CaseSeverity).join(
        ", "
      )}`,
    }),
  search: Joi.string().optional().messages({
    "string.base": "Search term must be a string",
  }),
  start_date: Joi.date().iso().optional().messages({
    "date.base": "Start date must be a valid date",
    "date.format": "Start date must be in ISO 8601 format (YYYY-MM-DD)",
  }),
  end_date: Joi.date().iso().min(Joi.ref('start_date')).optional().messages({
    "date.base": "End date must be a valid date",
    "date.format": "End date must be in ISO 8601 format (YYYY-MM-DD)",
    "date.min": "End date must be after or equal to start date",
  }),
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page must be a number",
    "number.integer": "Page must be an integer",
    "number.min": "Page must be at least 1",
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Limit must be a number",
    "number.integer": "Limit must be an integer",
    "number.min": "Limit must be at least 1",
    "number.max": "Limit cannot exceed 100",
  }),
  sort_by: Joi.string().valid('case_id', 'case_name', 'create_at', 'update_at').default('create_at').messages({
    "string.base": "Sort field must be a string",
    "any.only": "Invalid sort field. Must be one of: case_id, case_name, create_at, update_at",
  }),
  sort_order: Joi.string().valid('ASC', 'DESC').default('DESC').messages({
    "string.base": "Sort order must be a string",
    "any.only": "Sort order must be either ASC or DESC",
  }),
});
