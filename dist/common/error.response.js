"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
// Custom Error for app
class AppError extends Error {
    statusCode;
    errorCode;
    details;
    constructor(message, statusCode, errorCode, details) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
    }
}
exports.AppError = AppError;
