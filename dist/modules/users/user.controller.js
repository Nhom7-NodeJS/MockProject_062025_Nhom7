"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const success_response_1 = require("@/common/success.response");
const status_code_1 = require("@/constants/status-code");
const message_1 = require("@/constants/message");
class UserController {
    async getAll(req, res) {
        return new success_response_1.AppResponse({
            message: message_1.SuccessMessages.USER.USER_GET,
            statusCode: status_code_1.HttpStatusCode.OK,
        }).sendResponse(res);
    }
}
exports.default = new UserController();
