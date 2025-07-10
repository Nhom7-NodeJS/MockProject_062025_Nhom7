"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const connect_database_1 = require("@/database/connect-database");
const modules_1 = __importDefault(require("@/modules"));
const exception_filter_1 = require("@/middlewares/exception-filter");
const load_env_1 = require("@/config/load-env");
const logger_filter_1 = require("@/middlewares/logger-filter");
const logger_1 = require("@/utils/logger");
const app = (0, express_1.default)();
const PORT = load_env_1.loadedEnv.port;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Middleware logger
app.use(logger_filter_1.requestLogger);
// Initialize database connection
(0, connect_database_1.initDatabase)();
// init routes
app.use("/", modules_1.default);
// middleware handle exception
app.use(exception_filter_1.exceptionHandler);
// Start server
app.listen(PORT, () => {
    logger_1.logger.success(`Server is running on port ${PORT}`);
});
