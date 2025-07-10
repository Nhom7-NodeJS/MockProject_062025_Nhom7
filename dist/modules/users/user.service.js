"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const config_database_1 = require("@/config/config-database");
const user_entity_1 = require("@/modules/users/entities/user.entity");
class UserService {
    userRepository;
    constructor() {
        this.userRepository = config_database_1.AppDataSource.getRepository(user_entity_1.User);
    }
    async getAll() {
        return await this.userRepository.find();
    }
}
exports.UserService = UserService;
exports.default = new UserService();
