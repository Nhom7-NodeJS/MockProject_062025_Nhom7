import { Request } from 'express';

export interface IPaginationOptions {
  defaultLimit?: number;
  maxLimit?: number;
}

export interface IPaginationParams {
  page: number;
  limit: number;
  skip: number;
}

export interface IPaginationMeta {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface IPaginationLinks {
  first: string;
  last: string;
  next: string | null;
  prev: string | null;
}

// Result for paginated data
export interface IPaginationResult<T> {
  items: T[];
  meta: IPaginationMeta;
  links: IPaginationLinks;
}

export class PaginationUtils {
  /**
   * Get pagination parameters from request query
   */
  static getPaginationParams(
    req: Request,
    options: IPaginationOptions = {}
  ): IPaginationParams {
    const defaultLimit = options.defaultLimit || 10;
    const maxLimit = options.maxLimit || 100;
    
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(maxLimit, Math.max(1, Number(req.query.limit) || defaultLimit));
    const skip = (page - 1) * limit;

    return { page, limit, skip };
  }

  /**
   * Build pagination metadata
   */
  static buildPaginationMeta(
    page: number,
    limit: number,
    total: number
  ): IPaginationMeta {
    const totalPages = Math.ceil(total / limit);
    return {
      currentPage: page,
      itemsPerPage: limit,
      totalItems: total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };
  }

  /**
   * Build pagination links
   */
  static buildPaginationLinks(
    req: Request,
    page: number,
    limit: number,
    total: number,
    isPathBased: boolean = false
  ): IPaginationLinks {
    const totalPages = Math.ceil(total / limit);
    const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl || ''}`;
    
    const buildUrl = (p: number): string => {
      if (isPathBased) {
        return `${baseUrl}/page/${p}/limit/${limit}`;
      }
      const url = new URL(`${baseUrl}${req.path}`);
      const searchParams = new URLSearchParams(req.query as Record<string, string>);
      searchParams.set('page', p.toString());
      searchParams.set('limit', limit.toString());
      return `${url}?${searchParams.toString()}`;
    };

    return {
      first: buildUrl(1),
      last: buildUrl(totalPages),
      next: page < totalPages ? buildUrl(page + 1) : null,
      prev: page > 1 ? buildUrl(page - 1) : null,
    };
  }

  /**
   * Create a paginated response
   */
  static createPaginatedResponse<T>(
    req: Request,
    items: T[],
    total: number,
    options: IPaginationOptions & { isPathBased?: boolean } = {}
  ): IPaginationResult<T> {
    const { page, limit } = this.getPaginationParams(req, options);
    
    return {
      items,
      meta: this.buildPaginationMeta(page, limit, total),
      links: this.buildPaginationLinks(
          req,
          page,
          limit,
          total,
          options.isPathBased
        ),
    };
  }
}
