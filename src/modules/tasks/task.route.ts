import express from "express";

import { RoleType } from "@/constants/role-type";
import { validateBody } from "@/middlewares/validate.middleware";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandle } from "@/utils/handle-error";

import taskController from "./task.controller";
import { createTaskSchema } from "./schemas/create-task.schema";

const router = express.Router();

router.get(
  "/all/:caseId",
  authMiddleware([RoleType.FINANCIAL_INVESTIGATOR, RoleType.FORENSIC_OFFICER]),
  asyncHandle(taskController.getAllTaskByRoleId)
);

router.get(
  "/detail/:taskId",
  authMiddleware([RoleType.FINANCIAL_INVESTIGATOR, RoleType.FORENSIC_OFFICER]),
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