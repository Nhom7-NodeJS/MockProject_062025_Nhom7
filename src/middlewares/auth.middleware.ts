import { Request, Response, NextFunction } from 'express';
import authService from '@/modules/auth/auth.service';
import { AppError } from '@/common/error.response';
import { HttpStatusCode } from '@/constants/status-code';
import { ErrorCode } from '@/constants/error-code';

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
      throw new AppError(
        'No authentication token provided',
        HttpStatusCode.UNAUTHORIZED,
        ErrorCode.UNAUTHORIZED,
        { reason: 'missing_token' }
      );
    }

    try {
      // Verify token
      const decoded = authService.verifyToken(token);
      console.log(decoded);
      if (!decoded) {
        throw new AppError(
          'Invalid or malformed authentication token',
          HttpStatusCode.UNAUTHORIZED,
          ErrorCode.INVALID_TOKEN,
          { reason: 'token_verification_failed' }
        );
      }

      // Check if user has required role
      if (roles && roles.length > 0 && !roles.includes(decoded.role)) {
        throw new AppError(
          'Insufficient permissions to access this resource',
          HttpStatusCode.FORBIDDEN,
          ErrorCode.FORBIDDEN,
          { 
            requiredRoles: roles,
            userRole: decoded.role,
            reason: 'insufficient_permissions'
          }
        );
      }

      // Add user to request
      req.user = {
        username: decoded.username,
        role: decoded.role,
      };

      next();
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      
      // For unexpected errors, wrap them in AppError
      const errorMessage = error instanceof Error ? error.message : 'Authentication failed';
      throw new AppError(
        errorMessage,
        HttpStatusCode.UNAUTHORIZED,
        ErrorCode.INVALID_TOKEN, // Using existing error code
        {
          reason: 'authentication_error',
          originalError: error instanceof Error ? error.message : String(error)
        }
      );
    }
  };
};
