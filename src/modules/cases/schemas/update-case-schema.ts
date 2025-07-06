import Joi from "joi";
import { UpdateCaseDto } from "@/modules/cases/dto/case.dto";
import { CaseStatus, CaseType, CaseSeverity } from "../entities/case.entity";

export const UpdateCaseSchema = Joi.object<UpdateCaseDto>({
  case_name: Joi.string().optional().messages({
    "string.base": "Case name must be a string",
    "string.empty": "Case name cannot be empty",
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
  status: Joi.string()
    .valid(...Object.values(CaseStatus))
    .optional()
    .messages({
      "string.base": "Status must be a string",
      "any.only": `Status must be one of: ${Object.values(CaseStatus).join(
        ", "
      )}`,
    }),
  summary: Joi.string().optional().allow("").messages({
    "string.base": "Summary must be a string",
  }),
}).min(1); // At least one field is required for update
