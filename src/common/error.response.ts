// Custom Error for app
export class AppError extends Error {
  statusCode: number;
  errorCode: string;
  details: any;

  constructor(
    message: string,
    statusCode: number,
    errorCode: string,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
  }
}
