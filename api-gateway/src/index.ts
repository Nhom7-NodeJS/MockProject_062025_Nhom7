import express from "express";
import cors from "cors";


const app = express();
const PORT = process.env.PORT;

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