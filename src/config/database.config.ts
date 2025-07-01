import "reflect-metadata";
import { DataSource } from "typeorm";
import { entities } from "@/config/load-entities";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  migrations: ["src/migrations/*.ts"],
  logging: false,
  entities: entities,
});
