import 'reflect-metadata';

import cors from 'cors';
import { config } from 'dotenv';
import express, { Request, Response } from 'express';

import apiRoutes from '@/modules';
import { connectDB } from '@/shared/database/connection';
import { errorHandler } from '@/shared/middleware/error-handler.middleware';

// Load environment variables
config();

class App {
  public app: express.Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000');
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes() {
    // API routes
    this.app.use('/api', apiRoutes);
    
    // 404 handler
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        status: 'error',
        message: 'Resource not found',
      });
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  public async start() {
    try {
      // Initialize database connection
      await connectDB();
      
      // Start the server
      this.app.listen(this.port, () => {
        console.log(`Server is running on port ${this.port}`);
        console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      });
    } catch (error) {
      console.error('Failed to start the server:', error);
      process.exit(1);
    }
  }
}

// Start the application
const app = new App();
app.start();

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Consider restarting the server or handling the error appropriately
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  // Consider restarting the server or handling the error appropriately
  process.exit(1);
});
