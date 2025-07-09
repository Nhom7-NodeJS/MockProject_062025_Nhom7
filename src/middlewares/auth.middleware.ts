import { Request, Response, NextFunction } from 'express';
import authService from '@/modules/auth/auth.service';
import { AppResponse } from '@/common/success.response';
import { HttpStatusCode } from '@/constants/status-code';

export interface AuthenticatedRequest extends Request {
  user?: {
    username: string;
    role: string;
  };
}

export const authMiddleware = (roles?: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // Get token from header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return new AppResponse({
        message: 'No token provided',
        statusCode: HttpStatusCode.UNAUTHORIZED,
      }).sendResponse(res);
    }

    try {
      // Verify token
      const decoded = authService.verifyToken(token);
      console.log(decoded);
      if (!decoded) {
        return new AppResponse({
          message: 'Invalid token',
          statusCode: HttpStatusCode.UNAUTHORIZED,
        }).sendResponse(res);
      }

      // Check if user has required role
      if (roles && roles.length > 0 && !roles.includes(decoded.role)) {
        return new AppResponse({
          message: 'Insufficient permissions',
          statusCode: HttpStatusCode.FORBIDDEN,
        }).sendResponse(res);
      }

      // Add user to request
      req.user = {
        username: decoded.username,
        role: decoded.role,
      };

      next();
    } catch (error) {
      return new AppResponse({
        message: 'Invalid token',
        statusCode: HttpStatusCode.UNAUTHORIZED,
      }).sendResponse(res);
    }
  };
};
