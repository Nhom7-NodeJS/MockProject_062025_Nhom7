import express from "express";

import { asyncHandle } from "@/utils/handle-error";

import taskController from "./task.controller";

const router = express.Router();

router.get(
  "/all/:username/:roleId",
  asyncHandle(taskController.getAllTaskByRoleId)
);
router.get(
  "/detail/:roleId/:taskId",
  asyncHandle(taskController.getTaskDetailById)
);

export default router;
