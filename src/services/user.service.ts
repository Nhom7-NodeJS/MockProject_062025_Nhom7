import { Repository } from 'typeorm';

import { AppDataSource } from '@/config/db';
import { User } from '@/entities/user.entity';

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async getAll(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    }

    async getById(id: number): Promise<User | null> {
        try {
            const user = await this.userRepository.findOneBy({ id });
            return user || null;
        } catch (error) {
            throw new Error('Failed to fetch user');
        }
    }

    async create(user: Partial<User>): Promise<User> {
        try {
            const newUser = this.userRepository.create(user);
            return await this.userRepository.save(newUser);
        } catch (error) {
            throw new Error('Failed to create user');
        }
    }

    async update(id: number, user: Partial<User>): Promise<boolean> {
        try {
            const existingUser = await this.userRepository.findOneBy({ id });
            if (!existingUser) {
                return false;
            }

            Object.assign(existingUser, user);
            await this.userRepository.save(existingUser);
            return true;
        } catch (error) {
            throw new Error('Failed to update user');
        }
    }

    async delete(id: number): Promise<boolean> {
        try {
            const result = await this.userRepository.delete(id);
            return Boolean(result.affected ?? 0 > 0);
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    }
}

export default new UserService();
