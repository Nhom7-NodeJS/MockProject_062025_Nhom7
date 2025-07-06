import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppResponse } from '@/common/success.response';
import { HttpStatusCode } from '@/constants/status-code';
import { RoleType } from '@/modules/roles/entities/role.entity';

// Extend the Express Request type to include user information
export interface AuthenticatedRequest extends ExpressRequest {
  user?: {
    username: string;
    roles: RoleType[];
  };
}

export const authMiddleware = (allowedRoles: RoleType[] = []) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      // Get token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new AppResponse({
          message: 'No token provided',
          statusCode: HttpStatusCode.UNAUTHORIZED,
        }).sendResponse(res);
      }

      const token = authHeader.split(' ')[1];
      
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as {
        username: string;
        roles: RoleType[];
      };

      // Check if user has required role
      if (allowedRoles.length > 0) {
        const hasRole = decoded.roles.some(role => allowedRoles.includes(role as RoleType));
        if (!hasRole) {
          return new AppResponse({
            message: 'Insufficient permissions',
            statusCode: HttpStatusCode.FORBIDDEN,
          }).sendResponse(res);
        }
      }

      // Attach user to request object
      req.user = {
        username: decoded.username,
        roles: decoded.roles as RoleType[],
      };

      next();
    } catch (error) {
      return new AppResponse({
        message: 'Invalid or expired token',
        statusCode: HttpStatusCode.UNAUTHORIZED,
      }).sendResponse(res);
    }
  };
};
