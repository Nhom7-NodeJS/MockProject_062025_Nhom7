import { Repository } from 'typeorm';
import { AppDataSource } from '@/shared/database/connection';
import { User } from './entities/user.entity';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  /**
   * Get all users without pagination
   */
  public async getAllUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      console.error('Error in UserService.getAllUsers:', error);
      throw error instanceof Error ? error : new Error('Failed to fetch all users');
    }
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
    options: any = {}
  ): Promise<{ data: User[]; total: number }> {
    try {
      const [data, total] = await this.userRepository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        ...options,
      });
      
      return { data, total };
    } catch (error) {
      console.error('Error in UserService.getUsersPaginated:', error);
      throw error instanceof Error ? error : new Error('Failed to fetch users');
    }
  }

  /**
   * Get user by ID
   */
  public async getUserById(id: number | string): Promise<User | null> {
    try {
      const userId = Number(id);
      if (isNaN(userId)) {
        throw new Error('Invalid user ID');
      }
      
      const user = await this.userRepository.findOne({ 
        where: { id: userId },
        // You can add relations here if needed
        // relations: ['someRelation']
      });
      
      return user || null;
    } catch (error) {
      console.error(`Error in UserService.getById(${id}):`, error);
      throw error instanceof Error ? error : new Error('Failed to fetch user');
    }
  }

  /**
   * Create a new user
   */
  public async create(userData: Partial<User>): Promise<User> {
    try {
      if (!userData.email || !userData.name) {
        throw new Error('Name and email are required');
      }

      // Check if user with email already exists
      const existingUser = await this.userRepository.findOne({ 
        where: { email: userData.email } 
      });
      
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const newUser = this.userRepository.create(userData);
      return await this.userRepository.save(newUser);
    } catch (error) {
      console.error('Error in UserService.create:', error);
      throw error instanceof Error ? error : new Error('Failed to create user');
    }
  }

  /**
   * Update a user
   */
  public async update(id: number, userData: Partial<User>): Promise<boolean> {
    const queryRunner = AppDataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await queryRunner.manager.findOne(User, { where: { id } });
      if (!user) {
        return false;
      }

      // Prevent updating email to an existing one
      if (userData.email && userData.email !== user.email) {
        const existingUser = await queryRunner.manager.findOne(User, { 
          where: { email: userData.email } 
        });
        
        if (existingUser) {
          throw new Error('Email is already in use');
        }
      }

      await queryRunner.manager.update(User, id, userData);
      await queryRunner.commitTransaction();
      
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(`Error in UserService.update(${id}):`, error);
      throw error instanceof Error ? error : new Error('Failed to update user');
    } finally {
      await queryRunner.release();
    }
  }

  /**
   * Delete a user
   */
  public async delete(id: number | string): Promise<boolean> {
    try {
      const userId = Number(id);
      if (isNaN(userId)) {
        throw new Error('Invalid user ID');
      }

      const result = await this.userRepository.delete(userId);
      return (result.affected ?? 0) > 0;
    } catch (error) {
      console.error(`Error in UserService.delete(${id}):`, error);
      throw error instanceof Error ? error : new Error('Failed to delete user');
    }
  }
}

export default new UserService();
