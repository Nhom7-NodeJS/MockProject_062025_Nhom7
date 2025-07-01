import { AppError } from "@/common/error.response";
import { ErrorCode } from "@/constants/error-code";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validateBody = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      // custom errors detail for response
      const errorDetails = error.details.map((err) => {
        return {
          field: err.context?.label,
          message: err.message,
        };
      });
      throw new AppError(
        ErrorMessages.VALIDATION_FAILED,
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.VALIDATION_ERROR,
        errorDetails
      );
    }
    req.body = value;
    next();
  };
};
