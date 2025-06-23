import express from "express";

import UserController from "@/controllers/user.controller";

const router = express.Router();

router.get("/", (req, res) => UserController.getAll(req, res));
router.get("/:id", (req, res) => UserController.getById(req, res));
router.post("/", (req, res) => UserController.create(req, res));
router.put("/:id", (req, res) => UserController.update(req, res));
router.delete("/:id", (req, res) => UserController.delete(req, res));

export default router;
