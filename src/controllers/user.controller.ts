import { Request, Response } from 'express';

import { AppDataSource } from '@/config/db';
import { User } from '@/entities/user.entity';

class UserController {
    private userRepository = AppDataSource.getRepository(User);

    async getAll(req: Request, res: Response) {
        try {
            const users = await this.userRepository.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getById(req: Request<{ id: string }>, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid user ID' });
            }
            
            const user = await this.userRepository.findOneBy({ id });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async create(req: Request<{}, {}, { name: string; email: string }>, res: Response) {
        try {
            const { name, email } = req.body;
            const user = this.userRepository.create({ name, email });
            await this.userRepository.save(user);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async update(req: Request<{ id: string }, {}, { name?: string; email?: string }>, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid user ID' });
            }
            
            const user = await this.userRepository.findOneBy({ id });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            const { name, email } = req.body;
            if (name) user.name = name;
            if (email) user.email = email;

            await this.userRepository.save(user);
            res.json({ message: 'User updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async delete(req: Request<{ id: string }>, res: Response) {
        try {
            const id = parseInt(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'Invalid user ID' });
            }
            
            const result = await this.userRepository.delete(id);
            if (result.affected === 0) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export default new UserController();
