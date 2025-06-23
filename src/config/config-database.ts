import "reflect-metadata";
import { DataSource } from "typeorm";

import { loadedEnv } from "./load-env";
import { entities } from "@/config/load-entities";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: loadedEnv.db.host,
  port: loadedEnv.db.port,
  username: loadedEnv.db.username,
  password: loadedEnv.db.password,
  database: loadedEnv.db.database,
  synchronize: false,
  migrations: ["src/migrations/*.ts"],
  logging: false,
  entities: entities,
});
