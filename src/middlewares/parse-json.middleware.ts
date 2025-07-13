import { Request, Response, NextFunction } from "express";

import { ErrorCode } from "@/constants/error-code";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { AppResponse } from "@/common/success.response";
import { AppError } from "@/common/error.response";

// Middleware for parsing JSON string from multipart/form-data into JSON
export const parseJSONFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const field of fields) {
        req.body[field] = req.body[field] ? JSON.parse(req.body[field]) : [];
      }
      next();
    } catch {
      throw new AppError(
        ErrorMessages.INVALID_JSON,
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.INVALID_JSON,
        [{
          field: "request body", 
          message: "One or more fields are invalid JSON"
        }]
      );
    }
  };
};