import { Request, Response, NextFunction } from "express";
import Joi, { ObjectSchema, ValidationErrorItem } from "joi";

import { AppError } from "@/common/error.response";
import { ErrorCode } from "@/constants/error-code";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";

interface ValidationErrorDetail {
  field: string;
  message: string;
}

const createValidator = (schema: ObjectSchema, requestPart: 'body' | 'query' | 'params') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const options = {
      abortEarly: false,
      allowUnknown: requestPart !== 'body',
      stripUnknown: true
    };

    const { error, value } = schema.validate(req[requestPart], options);

    if (error) {
      const errorDetails: ValidationErrorDetail[] = error.details.map((err: ValidationErrorItem) => ({
        field: err.context?.label || err.path.join('.'),
        message: err.message.replace(/['"]/g, ''),
      }));

      throw new AppError(
        ErrorMessages.VALIDATION_FAILED,
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.VALIDATION_ERROR,
        errorDetails
      );
    }

    req[requestPart] = value;
    next();
  };
};

export const validateBody = (schema: ObjectSchema) => createValidator(schema, 'body');
export const validateQuery = (schema: ObjectSchema) => createValidator(schema, 'query');
export const validateParams = (schema: ObjectSchema) => createValidator(schema, 'params');