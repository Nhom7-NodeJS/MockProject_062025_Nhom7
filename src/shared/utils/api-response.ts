import { IApiResponse, IPaginatedResponse, IPaginationLinks, IPaginationMeta } from '@/shared/interfaces/api-response.interface';

// Re-export interfaces for convenience
export * from '@/shared/interfaces/api-response.interface';

export class ApiResponse<T = any> {
  /**
   * Creates a successful API response
   * @param data The data to include in the response
   * @param message Optional success message
   */
  static success<T>(data: T, message: string = 'Operation successful'): IApiResponse<T> {
    return {
      status: 'success',
      message,
      data,
    };
  }

  /**
   * Creates a paginated API response
   * @param items Array of items for the current page
   * @param meta Pagination metadata
   * @param links Pagination links
   * @param message Optional success message
   */
  static paginated<T>(
    items: T[],
    meta: IPaginationMeta,
    links: IPaginationLinks,
    message: string = 'Data retrieved successfully'
  ): IApiResponse<IPaginatedResponse<T>> {
    return {
      status: 'success',
      message,
      data: {
        items,
        meta,
        links,
      },
    };
  }

  /**
   * Creates an error response
   * @param message Error message
   * @param code Optional error code
   * @param details Additional error details
   */
  static error(
    message: string,
    code?: string | number,
    details?: any
  ): IApiResponse<null> {
    return {
      status: 'error',
      error: {
        code,
        message,
        details,
      },
    };
  }

  /**
   * Creates a fail response (for validation failures)
   * @param message Failure message
   * @param details Additional failure details (e.g., validation errors)
   */
  static fail(message: string, details?: any): IApiResponse<null> {
    return {
      status: 'fail',
      message,
      error: {
        message,
        details,
      },
    };
  }
}