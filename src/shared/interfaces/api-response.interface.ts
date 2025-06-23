export interface IPaginationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface IPaginationMeta {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// Response for paginated data
export interface IPaginatedResponse<T> {
  items: T[];
  meta: IPaginationMeta;
  links: IPaginationLinks;
}

// Response for overall data
export interface IApiResponse<T = any> {
  status: 'success' | 'error' | 'fail';
  message?: string;
  data?: T;
  error?: {
    code?: string | number;
    message: string;
    details?: any;
  };
}
