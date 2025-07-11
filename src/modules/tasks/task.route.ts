import express from "express";

import { RoleType } from "@/constants/role-type";
import { validateBody } from "@/middlewares/validate.middleware";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandle } from "@/utils/handle-error";

import taskController from "./task.controller";
import { createTaskSchema } from "./schemas/create-task.schema";

const router = express.Router();

router.get(
  "/all/:username/:roleId/:caseId",
  asyncHandle(taskController.getAllTaskByRoleId)
);

router.get(
  "/detail/:roleId/:taskId",
  asyncHandle(taskController.getTaskDetailById)
);

router.put("/status/:taskId", asyncHandle(taskController.changeTaskStatus));

router.post(
  "/",
  authMiddleware([RoleType.POLICE_CHIEF]),
  validateBody(createTaskSchema),
  asyncHandle(taskController.createTask)
);

export default router;
