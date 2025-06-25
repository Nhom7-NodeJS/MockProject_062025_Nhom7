import { Request, Response, NextFunction } from 'express';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserParamsDto } from './dto/user-params.dto';
import { User } from './entities/user.entity';
import UserService from './user.service';

class UserController {
  constructor(private userService: UserService) {}

  /**
   * Get all users without pagination
   */
  public async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  /**
   * Get all users with pagination
   */
  public async getUsersPaginated(page: number = 1, limit: number = 10): Promise<{ data: User[]; total: number }> {
    return this.userService.getUsersPaginated(page, limit);
  }

  /**
   * Get user by ID
   */
  public async getUserById(req: Request): Promise<User | null> {
    const { id } = req.params as unknown as UserParamsDto;
    return this.userService.getUserById(Number(id));
  }

  /**
   * Create a new user
   */
  public async create(req: Request): Promise<User> {
    const userData = req.validated as CreateUserDto;
    return this.userService.create(userData);
  }

  /**
   * Update a user
   */
  public async update(req: Request): Promise<User | null> {
    const { id } = req.params as unknown as UserParamsDto;
    const userData = req.body as UpdateUserDto;
    const updated = await this.userService.update(Number(id), userData);
    if (!updated) return null;
    return this.userService.getUserById(Number(id));
  }

  /**
   * Delete a user
   */
  public async delete(req: Request): Promise<boolean> {
    const { id } = req.params as unknown as UserParamsDto;
    return this.userService.delete(Number(id));
  }

  /**
   * Error handling middleware
   */
  public handleError(error: Error, req: Request, res: Response, next: NextFunction): void {
    console.error('UserController error:', error);
    next(error);
  }
}

export default UserController;
