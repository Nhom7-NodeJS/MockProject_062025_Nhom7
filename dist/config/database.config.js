"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const load_env_1 = require("@/config/load-env");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: load_env_1.loadedEnv.db.host,
    port: load_env_1.loadedEnv.db.port,
    username: load_env_1.loadedEnv.db.username,
    password: load_env_1.loadedEnv.db.password,
    database: load_env_1.loadedEnv.db.database,
    synchronize: false,
    migrations: ["src/migrations/*.ts"],
    logging: false,
    entities: [__dirname + "/modules/**/entities/*.entity.ts"],
});
