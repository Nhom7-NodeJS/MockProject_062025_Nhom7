import { Router } from "express";
import TaskController from "./task.controller";
import { asyncHandle } from "@/utils/handle-error";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { RoleType } from "@/constants/role-type";
import { validateBody } from "@/middlewares/validate.middleware";
import { createTaskSchema } from "./schemas/create-task.schema";

const router = Router();

// POST /tasks - Create a new task for an assigned user
router.post(
  "/",
  authMiddleware([RoleType.POLICE_CHIEF]),
  validateBody(createTaskSchema),
  asyncHandle(TaskController.createTask)
);

export default router;
