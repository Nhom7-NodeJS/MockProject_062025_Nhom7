import { DataSource, DataSourceOptions } from 'typeorm';

import { User } from '@/modules/users/entities/user.entity';

import { env } from './load-env.config';

export const dbConfig: DataSourceOptions = {
  type: 'mysql',
  host: env.DB.HOST || 'localhost',
  port: env.DB.PORT || 3306,
  username: env.DB.USERNAME || 'root',
  password: env.DB.PASSWORD || '123456',
  database: env.DB.NAME || 'crud_db',
  synchronize: false,
  logging: false,
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
};

export const AppDataSource = new DataSource(dbConfig);
