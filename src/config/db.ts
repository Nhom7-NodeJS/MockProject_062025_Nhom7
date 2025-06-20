import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "@/entities/user.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "crud_db",
  synchronize: true,
  logging: false,
  entities: [User],
});
