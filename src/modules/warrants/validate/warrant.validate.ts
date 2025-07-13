import Joi from "joi";

import { WarrantStatus } from "../enums/warrant.enum";
const warrantStatusValues = Object.values(WarrantStatus) as string[];

export const getAllWarantSchema = Joi.object({
  status: Joi.string()
    .valid(...warrantStatusValues)
    .optional()
    .messages({
      "string.base": "Status must be a string",
      "any.only": `Status must be one of: ${warrantStatusValues.join(", ")}`,
    }),
});
// schema validate for warrant
export const createWarrantSchema = Joi.object({
  warrant_name: Joi.string().min(5).max(255).required().messages({
    "string.base": "Tên lệnh phải là chuỗi",
    "string.empty": "Tên lệnh không được để trống",
    "string.min": "Tên lệnh phải có ít nhất {#limit} ký tự",
    "string.max": "Tên lệnh không được vượt quá {#limit} ký tự",
    "any.required": "Tên lệnh là bắt buộc",
  }),

  case_id: Joi.string().required().messages({
    "string.base": "Case ID phải là chuỗi",
    "string.empty": "Case ID không được để trống",
    "any.required": "Case ID là bắt buộc",
  }),

  time_publish: Joi.string().required().messages({
    "string.base": "Thời gian phải là chuỗi",
    "any.required": "Thời gian ban hành là bắt buộc",
  }),

  police_response: Joi.string().required().messages({
    "string.base": "Người phụ trách phải là chuỗi",
    "string.empty": "Người phụ trách không được để trống",
    "any.required": "Người phụ trách là bắt buộc",
  }),
});
export const searchWarrantSchema = Joi.object({
  warrant_name: Joi.string().trim().required().messages({
    "string.base": "Tên lệnh phải là chuỗi",
    "string.empty": "Tên lệnh không được để trống",
    "any.required": "Tên lệnh là bắt buộc",
  }),
});
