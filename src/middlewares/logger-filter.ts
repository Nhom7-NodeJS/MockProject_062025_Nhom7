import { Request, Response, NextFunction } from "express";
import { logger } from "@/utils/logger";

/**
 * Middleware to log incoming HTTP requests.
 * Logs method, URL, response status code, and processing duration.
 */
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, originalUrl } = req;
  const startTime = Date.now(); // Record start time

  // Listen for the response to finish
  res.on("finish", () => {
    const { statusCode } = res;
    const duration = Date.now() - startTime;
    logger.log(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
  });

  next();
};
