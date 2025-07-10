"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = void 0;
const config_database_1 = require("@/config/config-database");
const logger_1 = require("@/utils/logger");
const initDatabase = async () => {
    try {
        await config_database_1.AppDataSource.initialize();
        logger_1.logger.success("Database connected!");
    }
    catch (error) {
        logger_1.logger.error(`Failed to connect database: ${error}`);
    }
};
exports.initDatabase = initDatabase;
