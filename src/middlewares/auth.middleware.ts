import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpStatusCode } from '@/constants/status-code';

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    email: string;
  };
}

const VALID_REPORT_STATUS = ['Approved', 'Rejected', 'Pending'];

export const reportAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  // 1. Check x-access-token header
  const token = req.headers['x-access-token'] as string;
  
  if (!token) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      code: 401,
      message: 'Access token is required'
    });
  }

  try {
    // 2. Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as any;
    req.user = decoded;

    // 3. Validate reportStatus for PUT requests
    if (req.method === 'PUT') {
      const { reportStatus } = req.body;
      
      if (!reportStatus) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          code: 400,
          message: 'reportStatus is required'
        });
      }

      if (!VALID_REPORT_STATUS.includes(reportStatus)) {
        return res.status(HttpStatusCode.BAD_REQUEST).json({
          code: 400,
          message: `reportStatus must be one of: ${VALID_REPORT_STATUS.join(', ')}`
        });
      }
    }

    next();
  } catch (error) {
    return res.status(HttpStatusCode.UNAUTHORIZED).json({
      code: 401,
      message: 'Invalid or expired token'
    });
  }
};
