import { Router } from 'express';

import userRoutes from './users/user.routes';

const router = Router();

// Register all module routes here
router.use('/users', userRoutes);

export default router;
