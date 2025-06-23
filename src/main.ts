import express from "express";
import cors from "cors";
import { initDatabase } from "@/database/connect-database";
import router from "@/routes";
import { exceptionHandler } from "@/middlewares/exception-filter";
import { loadedEnv } from "@/config/load-env";
import { requestLogger } from "@/middlewares/logger-filter";
import { logger } from "@/utils/logger";

const app = express();
const PORT = loadedEnv.port;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware logger
app.use(requestLogger);

// Initialize database connection
initDatabase();

// init routes
app.use("/", router);

// middleware handle exception
app.use(exceptionHandler);

// Start server
app.listen(PORT, () => {
  logger.success(`Server is running on port ${PORT}`);
});
