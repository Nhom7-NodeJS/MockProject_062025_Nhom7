import { Router } from "express";

import { asyncHandle } from "@/utils/handle-error";
import { 
  validateQuery, 
  validateBody, 
  validateParams
} from "@/middlewares/validate.middleware";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { RoleType } from "@/constants/role-type";

import UserController from "./user.controller";

const router = Router();

router.get(
  "/",
  authMiddleware([RoleType.POLICE_CHIEF]),
  asyncHandle(UserController.getPaginatedUsers)
);

router.get(
  "/:username",
  authMiddleware([RoleType.POLICE_CHIEF]),
  asyncHandle(UserController.getUserDetail)
);

// Example: /users/john_doe
router.put(
  "/:username",
  authMiddleware([RoleType.POLICE_CHIEF]), 
  asyncHandle(UserController.editUser)
);

export default router;