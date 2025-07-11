"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_config_1 = require("@/config/database.config");
const user_entity_1 = require("@/entities/user.entity");
class UserService {
    userRepository;
    constructor() {
        this.userRepository = database_config_1.AppDataSource.getRepository(user_entity_1.User);
    }
    async getAll() {
        try {
            return await this.userRepository.find();
        }
        catch (error) {
            throw new Error('Failed to fetch users');
        }
    }
    async getById(id) {
        try {
            const user = await this.userRepository.findOneBy({ id });
            return user || null;
        }
        catch (error) {
            throw new Error('Failed to fetch user');
        }
    }
    async create(user) {
        try {
            const newUser = this.userRepository.create(user);
            return await this.userRepository.save(newUser);
        }
        catch (error) {
            throw new Error('Failed to create user');
        }
    }
    async update(id, user) {
        try {
            const existingUser = await this.userRepository.findOneBy({ id });
            if (!existingUser) {
                return false;
            }
            Object.assign(existingUser, user);
            await this.userRepository.save(existingUser);
            return true;
        }
        catch (error) {
            throw new Error('Failed to update user');
        }
    }
    async delete(id) {
        try {
            const result = await this.userRepository.delete(id);
            return Boolean(result.affected ?? 0 > 0);
        }
        catch (error) {
            throw new Error('Failed to delete user');
        }
    }
}
exports.UserService = UserService;
exports.default = new UserService();
