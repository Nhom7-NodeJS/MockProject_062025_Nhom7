import { Request, Response } from 'express';

import { AppDataSource } from '@/configs/db';
import { User } from '@/entities/user.entity';
import { UserService } from '@/services/user.service';
import { HttpError } from '@/util/http-error.util';

class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    async getAll(req: Request, res: Response) {
        try{
            const users = await this.userService.getAll();
            res.json(users);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async getById(req: Request<{ id: string}>, res: Response){
        try{
            const user = await this.userService.getById(req.params.id);

            res.json(user);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async create(req: Request<{}, {}, { name: string; email: string; password: string }>, res: Response) {
        try {
            const user = await this.userService.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async update(req: Request<{ id: string}, {}, { name?: string; email?: string; password?: string}>, res: Response){
        try {
            const updated = await this.userService.update(req.params.id, req.body); // pass string ID
            if (!updated) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ message: 'User updated successfully' });
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async delete(req: Request<{ id: string }>, res: Response) {
        try {
            const deleted = await this.userService.delete(req.params.id); // pass string
            if (!deleted) {
                return res.status(404).json({ error: 'User not found' });
            }

            res.json({ message: 'User deleted successfully' });
        } catch (error) {
            if (error instanceof HttpError) {
                return res.status(error.status).json({ error: error.message });
            }
            res.status(500).json({ error: 'Internal server error' });
        }
    }

}

export default new UserController();