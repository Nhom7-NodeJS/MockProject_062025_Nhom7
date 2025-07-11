import dotenv from "dotenv";

dotenv.config();

export const loadedEnv = {
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  cloudinary: {
    name: process.env.CLOUD_NAME,
    key: process.env.CLOUD_KEY,
    secret: process.env.CLOUD_SECRET,
  }
};
