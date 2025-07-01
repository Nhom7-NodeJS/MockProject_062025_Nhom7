import { Repository, FindManyOptions } from 'typeorm';

import { AppDataSource } from '@/shared/config/database.config';
import { AppError } from '@/shared/middleware/error-handler.middleware';

import { User } from './entities/user.entity';

// Interface for pagination options
type PaginationOptions = Omit<FindManyOptions<User>, 'skip' | 'take'> & {
  // Add any additional custom options here
};

class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  /**
   * Get all users without pagination
   */
  public async getAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * Get all users with pagination
   * @param page Page number (1-based)
   * @param limit Number of items per page
   * @param options Additional find options
   */
  public async getUsersPaginated(
    page: number = 1,
    limit: number = 10,
    options: PaginationOptions = {}
  ): Promise<{ data: User[]; total: number }> {
    const [data, total] = await this.userRepository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      ...options,
    });
    
    return { data, total };
  }

  /**
   * Get user by ID
   */
  public async getUserById(id: number | string): Promise<User | null> {
    const userId = this.parseUserId(id);
    return this.userRepository.findOne({ 
      where: { id: userId },
      // You can add relations here if needed
      // relations: ['someRelation']
    });
  }

  /**
   * Create a new user
   */
  public async create(userData: Partial<User>): Promise<User> {
    if (!userData.email || !userData.name) {
      throw new AppError('Name and email are required', 400);
    }

    // Check if user with email already exists
    const existingUser = await this.userRepository.findOne({ 
      where: { email: userData.email } 
    });
    
    if (existingUser) {
      throw new AppError('User with this email already exists', 409);
    }

    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  /**
   * Update a user
   */
  public async update(id: number | string, userData: Partial<User>): Promise<boolean> {
    const userId = this.parseUserId(id);
    
    // Check if user exists
    const user = await this.userRepository.findOne({ 
      where: { id: userId } 
    });
    
    if (!user) {
      throw new AppError('User not found', 404);
    }

    // Prevent updating email to an existing one
    if (userData.email && userData.email !== user.email) {
      const existingUser = await this.userRepository.findOne({ 
        where: { email: userData.email } 
      });
      
      if (existingUser) {
        throw new AppError('Email is already in use', 409);
      }
    }

    // Perform the update
    const result = await this.userRepository.update(userId, userData);
    return (result.affected ?? 0) > 0;
  }

  /**
   * Delete a user
   */
  public async delete(id: number | string): Promise<boolean> {
    const userId = this.parseUserId(id);
    const result = await this.userRepository.delete(userId);
    
    if ((result.affected ?? 0) === 0) {
      throw new AppError('User not found', 404);
    }
    
    return true;
  }

  /**
   * Parse and validate user ID
   * Here parse string to number because declare id as number in entity
   * @private
   */
  private parseUserId(id: number | string): number {
    const userId = typeof id === 'string' ? parseInt(id, 10) : id;
    if (isNaN(userId)) {
      throw new AppError('Invalid user ID', 400);
    }
    return userId;
  }
}

export default UserService;
