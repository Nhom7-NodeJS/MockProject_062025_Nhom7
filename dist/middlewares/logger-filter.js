"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLogger = void 0;
const logger_1 = require("@/utils/logger");
/**
 * Middleware to log incoming HTTP requests.
 * Logs method, URL, response status code, and processing duration.
 */
const requestLogger = (req, res, next) => {
    const { method, originalUrl } = req;
    const startTime = Date.now(); // Record start time
    // Listen for the response to finish
    res.on("finish", () => {
        const { statusCode } = res;
        const duration = Date.now() - startTime;
        logger_1.logger.log(`${method} ${originalUrl} ${statusCode} - ${duration}ms`);
    });
    next();
};
exports.requestLogger = requestLogger;
