import express from 'express';
import { Request, Response } from 'express';

import UserController from '@/controllers/user.controller';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const users = await UserController.getAll(req, res);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const user = await UserController.getById(req, res);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req: Request<{}, {}, { name: string; email: string }>, res: Response) => {
    try {
        const user = await UserController.create(req, res);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req: Request<{ id: string }, {}, { name?: string; email?: string }>, res: Response) => {
    try {
        const success = await UserController.update(req, res);
        if (!success) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
    try {
        const success = await UserController.delete(req, res);
        if (!success) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
