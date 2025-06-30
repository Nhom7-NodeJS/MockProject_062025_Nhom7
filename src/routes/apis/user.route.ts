import express from 'express';
import { Request, Response } from 'express';

import UserController from '@/controllers/user.controller';

const router = express.Router();

// GET /users - fetch all users
router.get('/get-all', (req, res) => UserController.getAll(req, res));

// GET /users/:id - fetch a single user
router.get('/get/:id', (req, res) => UserController.getById(req, res));

// POST /users - create a new user
router.post('/create', (req, res) => UserController.create(req, res));

// PUT /users/:id - update a user
router.put('/update/:id', (req, res) => UserController.update(req, res));

// DELETE /users/:id - delete a user
router.delete('/delete/:id', (req, res) => UserController.delete(req, res));

export default router;