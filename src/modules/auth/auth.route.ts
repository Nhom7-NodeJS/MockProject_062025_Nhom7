import { Router } from 'express';
import { authController } from './auth.controller';
import { asyncHandle } from '@/utils/handle-error';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { validateBody } from '@/middlewares/validate.middleware';
import { loginSchema } from './schemas/login.schema';
import { signupSchema } from './schemas/signup.schema';

const router = Router();

// Public routes
router.post(
  '/login',
  validateBody(loginSchema),
  asyncHandle(authController.login)
);

router.post(
  '/signup',
  validateBody(signupSchema),
  asyncHandle(authController.signup)
);

// Protected routes
router.get('/profile', authMiddleware(), asyncHandle(authController.getProfile));

export default router;
