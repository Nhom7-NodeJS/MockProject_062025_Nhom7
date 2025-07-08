import Joi from "joi";
import { CreateCaseDto } from "@/modules/cases/dto/case.dto";
import { CaseType, CaseSeverity } from "../enums/case.enum";

export const CreateCaseSchema = Joi.object<CreateCaseDto>({
  case_name: Joi.string().required().messages({
    "string.base": "Case name must be a string",
    "string.empty": "Case name is required",
    "any.required": "Case name is required",
  }),
  type_case: Joi.string()
    .valid(...Object.values(CaseType))
    .required()
    .messages({
      "string.base": "Case type must be a string",
      "any.only": `Case type must be one of: ${Object.values(CaseType).join(", ")}`,
      "any.required": "Case type is required",
    }),
  severity: Joi.string()
    .valid(...Object.values(CaseSeverity))
    .required()
    .messages({
      "string.base": "Severity must be a string",
      "any.only": `Severity must be one of: ${Object.values(CaseSeverity).join(
        ", "
      )}`,
      "any.required": "Severity is required",
    }),
  summary: Joi.string().optional().allow("").messages({
    "string.base": "Summary must be a string",
  }),
});
