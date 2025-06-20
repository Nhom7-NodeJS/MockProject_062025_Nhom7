import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { AppDataSource } from '@/config/db';
import userRoutes from '@/routes/user.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database connection
AppDataSource.initialize()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((error) => console.log('Error during Data Source initialization', error));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the CRUD API' });
});

// API routes
app.use('/api/users', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
