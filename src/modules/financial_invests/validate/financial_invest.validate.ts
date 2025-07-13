import Joi from "joi";
import { WarrantStatus } from "@/modules/financial_invests/enums/financial_invest.enum"; 

export const taskIdParamSchema = Joi.object({
  task_id: Joi.string().required().label("task_id")
});

export const updateFinancialTaskSchema = Joi.object({
  note: Joi.string().allow("", null).label("note"),
  status: Joi.string()
    .valid(...Object.values(WarrantStatus))
    .label("Status")
    .optional(),
  uploadedFiles: Joi.object({
    evidence_file: Joi.array().items(Joi.string().uri()).label("evidence_file")
  }).optional().label("uploadedFiles")
});

export const confirmFinancialTaskSchema = Joi.object({
  note: Joi.string().allow("", null).label("note"),
  status: Joi.string()
    .valid(...Object.values(WarrantStatus))
    .label("Status")
    .optional(),
  uploadedFiles: Joi.object({
    result_file: Joi.array().items(Joi.string().uri()).label("result_file")
  }).optional().label("uploadedFiles")
});
