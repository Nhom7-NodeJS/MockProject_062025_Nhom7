"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const config_database_1 = require("@/config/config-database");
const user_entity_1 = require("@/modules/users/entities/user.entity");
const error_response_1 = require("@/common/error.response");
const message_1 = require("@/constants/message");
const status_code_1 = require("@/constants/status-code");
const error_code_1 = require("@/constants/error-code");
class UserService {
    userRepository;
    constructor() {
        this.userRepository = config_database_1.AppDataSource.getRepository(user_entity_1.User);
    }
    async getAll() {
        return await this.userRepository.find();
    }
    async getById(id) {
        const userExists = await this.userRepository.findOne({
            where: { id },
        });
        if (!userExists) {
            throw new error_response_1.AppError(message_1.ErrorMessages.USER_NOT_FOUND, status_code_1.HttpStatusCode.NOT_FOUND, error_code_1.ErrorCode.USER_NOT_FOUND);
        }
        return userExists;
    }
    async create(userDto) {
        const findUserExists = await this.userRepository.count({
            where: { email: userDto.email },
        });
        if (findUserExists > 0) {
            throw new error_response_1.AppError(message_1.ErrorMessages.EMAIL_EXISTS, status_code_1.HttpStatusCode.CONFLICT, error_code_1.ErrorCode.EMAIL_ALREADY_EXISTS);
        }
        const newUser = this.userRepository.create({
            name: userDto.name,
            email: userDto.email,
        });
        await this.userRepository.save(newUser);
        return newUser;
    }
}
exports.UserService = UserService;
exports.default = new UserService();
