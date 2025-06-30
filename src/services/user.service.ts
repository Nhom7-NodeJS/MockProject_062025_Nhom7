import { Repository } from 'typeorm';

import { AppDataSource } from '@/configs/db';
import { User } from '@/entities/user.entity';
import { HttpError } from '@/util/http-error.util';

export class UserService {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async getAll(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            throw new HttpError(500, 'Failed to fetch user');
        }
    }

    async getById(id: string): Promise<User> {
        const idAsNumber = parseInt(id);
        if (isNaN(idAsNumber)) {
            throw new HttpError(400, 'Invalid user ID');
        }

        try {
            const user = await this.userRepository.findOneBy({ id: idAsNumber });
            if (!user) {
                throw new HttpError(404, 'User not found');
            }

            return user;
        } catch (error) {
            throw new HttpError(500, 'Failed to fetch user');
        }
    }

    async create(user: Partial<User>): Promise<User> {
        try {
            const newUser = this.userRepository.create(user);
            return await this.userRepository.save(newUser);
        } catch (error) {
            throw new HttpError(500, 'Failed to create user');
        }
    }

    async update(id: string, user: Partial<User>): Promise<boolean> {
        const idAsNumber = parseInt(id);
        if (isNaN(idAsNumber)) {
            throw new HttpError(400, 'Invalid user ID');
        }

        try {
            const existingUser = await this.userRepository.findOneBy({ id: idAsNumber });
            if (!existingUser) {
                return false;
            }

            Object.assign(existingUser, user);
            await this.userRepository.save(existingUser);
            return true;
        } catch (error) {
            throw new HttpError(500, 'Failed to update user');
        }
    }

    async delete(id: string): Promise<boolean> {
        const idAsNumber = parseInt(id);
        if (isNaN(idAsNumber)) {
            throw new HttpError(400, 'Invalid user ID');
        }

        try {
            const result = await this.userRepository.delete(idAsNumber);
            return result.affected !== 0;
        } catch (error) {
            throw new HttpError(500, 'Failed to delete user');
        }
    }
}

export default new UserService();