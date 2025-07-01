import 'reflect-metadata';

import { AppDataSource } from '@/shared/config/database.config';
import logger from '@/shared/utils/logger';

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    logger.info('Database connected successfully');
    return true;
  } catch (error) {
    logger.error('Error during Data Source initialization', error);
    throw error;
  }
};

export const disconnectDB = async () => {
  try {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
      logger.info('Database disconnected');
    }
  } catch (error) {
    logger.error('Error during Data Source disconnection', error);
    throw error;
  }
};

// Handle application shutdown
process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});
