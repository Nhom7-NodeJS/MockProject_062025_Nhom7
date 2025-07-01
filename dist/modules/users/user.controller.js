"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("@/modules/users/user.service"));
const success_response_1 = require("@/common/success.response");
const status_code_1 = require("@/constants/status-code");
const message_1 = require("@/constants/message");
const error_response_1 = require("@/common/error.response");
const error_code_1 = require("@/constants/error-code");
const user_mapper_1 = require("./user.mapper");
class UserController {
    async getAll(req, res) {
        const result = await user_service_1.default.getAll();
        // Converts list User entity returned from the service to list UserResponseDto
        const listUserDto = result.map((user) => (0, user_mapper_1.toUserResponseDto)(user));
        return new success_response_1.AppResponse({
            message: message_1.SuccessMessages.USER.USER_GET,
            statusCode: status_code_1.HttpStatusCode.OK,
            data: listUserDto,
        }).sendResponse(res);
    }
    async getById(req, res) {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw new error_response_1.AppError(message_1.ErrorMessages.INVALID_ID, status_code_1.HttpStatusCode.BAD_REQUEST, error_code_1.ErrorCode.INVALID_PARAMS);
        }
        const user = await user_service_1.default.getById(id);
        // Converts a User entity returned from the service to a UserResponseDto
        const userDto = (0, user_mapper_1.toUserResponseDto)(user);
        return new success_response_1.AppResponse({
            message: message_1.SuccessMessages.USER.USER_GET,
            statusCode: status_code_1.HttpStatusCode.OK,
            data: userDto,
        }).sendResponse(res);
    }
    async create(req, res) {
        const createUserDto = req.body;
        const newUser = await user_service_1.default.create(createUserDto);
        const userDto = (0, user_mapper_1.toUserResponseDto)(newUser);
        return new success_response_1.AppResponse({
            message: message_1.SuccessMessages.USER.USER_CREATED,
            statusCode: status_code_1.HttpStatusCode.CREATED,
            data: userDto,
        }).sendResponse(res);
    }
}
exports.default = new UserController();
