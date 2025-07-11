<<<<<<< HEAD
import TaskController from "./task.controller";
=======
import express from "express";

>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
import { RoleType } from "@/constants/role-type";
import { validateBody } from "@/middlewares/validate.middleware";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { asyncHandle } from "@/utils/handle-error";

import taskController from "./task.controller";
import { createTaskSchema } from "./schemas/create-task.schema";
import express from "express";
import { asyncHandle } from "@/utils/handle-error";
import { authMiddleware } from "@/middlewares/auth.middleware";
import taskController from "./task.controller";

const router = express.Router();
<<<<<<< HEAD

router.get(
  "/all/:username/:roleId/:caseId",
  asyncHandle(taskController.getAllTaskByRoleId)
);
router.get(
  "/detail/:roleId/:taskId",
  asyncHandle(taskController.getTaskDetailById)
);
router.put("/status/:taskId", asyncHandle(taskController.changeTaskStatus));
=======

router.get(
  "/all/:username/:roleId/:caseId",
  asyncHandle(taskController.getAllTaskByRoleId)
);

router.get(
  "/detail/:roleId/:taskId",
  asyncHandle(taskController.getTaskDetailById)
);

router.put("/status/:taskId", asyncHandle(taskController.changeTaskStatus));

>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
router.post(
  "/",
  authMiddleware([RoleType.POLICE_CHIEF]),
  validateBody(createTaskSchema),
  asyncHandle(taskController.createTask)
);

export default router;
