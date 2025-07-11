import { AppDataSource } from "@/config/database.config";
import { logger } from "@/utils/logger";

export const initDatabase = async () => {
  try {
    await AppDataSource.initialize();
    logger.success("Database connected!");
  } catch (error) {
    logger.error(`Failed to connect database: ${error}`);
  }
};
