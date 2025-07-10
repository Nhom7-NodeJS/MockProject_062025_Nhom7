"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBody = void 0;
const error_response_1 = require("@/common/error.response");
const error_code_1 = require("@/constants/error-code");
const message_1 = require("@/constants/message");
const status_code_1 = require("@/constants/status-code");
const validateBody = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            // custom errors detail for response
            const errorDetails = error.details.map((err) => {
                return {
                    field: err.context?.label,
                    message: err.message,
                };
            });
            throw new error_response_1.AppError(message_1.ErrorMessages.VALIDATION_FAILED, status_code_1.HttpStatusCode.BAD_REQUEST, error_code_1.ErrorCode.VALIDATION_ERROR, errorDetails);
        }
        req.body = value;
        next();
    };
};
exports.validateBody = validateBody;
