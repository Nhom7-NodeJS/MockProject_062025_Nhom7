import { HttpStatus } from "./http-status";

export const ErrorCodes = {
  // Common errors
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    statusCode: HttpStatus.BAD_REQUEST,
    message: 'Validation error occurred',
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    statusCode: HttpStatus.NOT_FOUND,
    message: 'Resource not found',
  },
  UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    statusCode: HttpStatus.UNAUTHORIZED,
    message: 'Unauthorized access',
  },
  FORBIDDEN: {
    code: 'FORBIDDEN',
    statusCode: HttpStatus.FORBIDDEN,
    message: 'Access forbidden',
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  },
  // Add more error codes as needed
} as const;

export type ErrorCode = keyof typeof ErrorCodes;
