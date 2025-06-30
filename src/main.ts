import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { AppDataSource } from '@/configs/db';
import router from '@/routes/apis';

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
app.use('/api', router);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});