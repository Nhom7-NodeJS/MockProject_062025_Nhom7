import { Router, Request, Response, NextFunction } from 'express';


import { ErrorCodes } from '@/shared/constants/error-codes';
import { HttpStatus } from '@/shared/constants/http-status';
import { validateJoi } from '@/shared/middleware/validation.middleware';
import { ApiResponse } from '@/shared/utils/api-response';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserParamsDto } from './dto/user-params.dto';
import UserController from './user.controller';
import UserService from './user.service';

export class UserRoutes {
  public router: Router;
  private controller: UserController;

  constructor() {
    this.router = Router();

    const userService = new UserService();
    this.controller = new UserController(userService);
    this.initializeRoutes();
  }

  private buildPaginationMeta(
    page: number,
    limit: number,
    total: number
  ) {
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

  private buildPaginationLinks(
    baseUrl: string,
    page: number,
    limit: number,
    total: number,
    isPathBased: boolean = false
  ) {
    const totalPages = Math.ceil(total / limit);
    
    const buildUrl = (page: number): string => {
      if (isPathBased) {
        return `${baseUrl}/page/${page}/limit/${limit}`;
      }
      const url = new URL(baseUrl);
      url.searchParams.set('page', page.toString());
      url.searchParams.set('limit', limit.toString());
      return url.toString();
    };

    return {
      first: buildUrl(1),
      last: buildUrl(totalPages),
      next: page < totalPages ? buildUrl(page + 1) : null,
      prev: page > 1 ? buildUrl(page - 1) : null,
    };
  }

  private initializeRoutes(): void {
    // Get all users without pagination (use with caution for large datasets)
    this.router.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const users = await this.controller.getAllUsers();
        res.status(HttpStatus.OK).json(ApiResponse.success(users, 'Users retrieved successfully'));
      } catch (error) {
        next(error);
      }
    });

    // Get all users with pagination (query params)
    this.router.get(
      '/paginated', 
      
      async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const page = Math.max(1, Number(req.query.page) || 1);
          const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
          
          const { data: users, total } = await this.controller.getUsersPaginated(page, limit);
          const baseUrl = `${req.protocol}://${req.get('host')}${req.baseUrl || ''}`;
          
          const response = ApiResponse.paginated(
            users,
            this.buildPaginationMeta(page, limit, total),
            this.buildPaginationLinks(baseUrl, page, limit, total),
            'Users retrieved successfully'
          );
          
          res.status(HttpStatus.OK).json(response);
        } catch (error) {
          next(error);
        }
      }
    );

    // Get user by ID
    this.router.get('/:id',
      validateJoi(UserParamsDto, 'params'),
      async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const user = await this.controller.getUserById(req);
          if (!user) {
            res.status(HttpStatus.NOT_FOUND).json(
              ApiResponse.error('User not found', ErrorCodes.NOT_FOUND.code)
            );
            return;
          }
          
          res.status(HttpStatus.OK).json(ApiResponse.success(user, 'User retrieved successfully'));
        } catch (error) {
          next(error);
        }
      }
    );

    // Create new user
    this.router.post(
      '/',
      validateJoi(CreateUserDto),
      async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          // Attach validated data to the request object
          (req as any).validated = req.body;
          const user = await this.controller.create(req);
          res.status(HttpStatus.CREATED).json(
            ApiResponse.success(user, 'User created successfully')
          );
        } catch (error) {
          next(error);
        }
      }
    );

    // Update user
    this.router.put(
      '/:id',
      [
        validateJoi(UserParamsDto, 'params'),
        validateJoi(UpdateUserDto)
      ],
      async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          // Attach validated data to the request object
          (req as any).validated = req.body;
          const user = await this.controller.update(req);
          if (!user) {
            res.status(HttpStatus.NOT_FOUND).json(
              ApiResponse.error('User not found', ErrorCodes.NOT_FOUND.code)
            );
            return;
          }
          
          res.status(HttpStatus.OK).json(
            ApiResponse.success(user, 'User updated successfully')
          );
        } catch (error) {
          next(error);
        }
      }
    );

    // Delete user
    this.router.delete('/:id',
      validateJoi(UserParamsDto, 'params'),
      async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const success = await this.controller.delete(req);
          if (!success) {
            res.status(HttpStatus.NOT_FOUND).json(
              ApiResponse.error('User not found', ErrorCodes.NOT_FOUND.code)
            );
            return;
          }
          
          res.status(HttpStatus.OK).json(
            ApiResponse.success({ deleted: true }, 'User deleted successfully')
          );
        } catch (error) {
          next(error);
        }
      }
    );  
  }
}

export default new UserRoutes().router;
