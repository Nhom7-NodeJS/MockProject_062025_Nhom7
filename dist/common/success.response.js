"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppResponse = void 0;
const status_code_1 = require("@/constants/status-code");
class AppResponse {
    message;
    statusCode;
    data;
    constructor({ message, statusCode = status_code_1.HttpStatusCode.OK, data = {}, }) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
    sendResponse(res) {
        return res.status(this.statusCode).json({
            success: true,
            message: this.message,
            data: this.data,
        });
    }
}
exports.AppResponse = AppResponse;
