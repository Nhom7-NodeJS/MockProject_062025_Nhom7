import { ErrorCode } from "@/constants/error-code";
import { ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";
import { AppError } from "@/common/error.response";
import { NextFunction, Request, Response } from "express";
import { logger } from "@/utils/logger";

// Global error-handling middleware for Express
export const exceptionHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.statusCode || HttpStatusCode.INTERNAL_SERVER_ERROR;
  const errorCode = err.errorCode! || ErrorCode.INTERNAL_SERVER_ERROR;

  // console.log("check err::", err);
  logger.error(err.message);

  res.status(status).json({
    success: false,
    message: err.message || ErrorMessages.SERVER_ERROR,
    statusCode: status,
    errorCode: errorCode,
    details: err.details || {},
  });
};
