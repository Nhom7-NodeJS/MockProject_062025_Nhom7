import express from "express";

import { asyncHandle } from "@/utils/handle-error";

import taskController from "./task.controller";

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

export default router;
