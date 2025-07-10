"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionHandler = void 0;
const error_code_1 = require("@/constants/error-code");
const message_1 = require("@/constants/message");
const status_code_1 = require("@/constants/status-code");
const logger_1 = require("@/utils/logger");
// Global error-handling middleware for Express
const exceptionHandler = (err, req, res, next) => {
    const status = err.statusCode || status_code_1.HttpStatusCode.INTERNAL_SERVER_ERROR;
    const errorCode = err.errorCode || error_code_1.ErrorCode.INTERNAL_SERVER_ERROR;
    // console.log("check err::", err);
    logger_1.logger.error(err.message);
    res.status(status).json({
        success: false,
        message: err.message || message_1.ErrorMessages.SERVER_ERROR,
        statusCode: status,
        errorCode: errorCode,
        details: err.details || {},
    });
};
exports.exceptionHandler = exceptionHandler;
