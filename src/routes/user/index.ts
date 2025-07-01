import express from "express";

import userController from "@/modules/users/user.controller";
import { asyncHandle } from "@/utils/handle-error";
import { validateBody } from "@/middlewares/validate.middleware";
import { CreateUserSchema } from "@/modules/users/schemas/create-user-schema";

const router = express.Router();

router.get("/", asyncHandle(userController.getAll));
router.post(
  "/",
  validateBody(CreateUserSchema),
  asyncHandle(userController.create)
);
router.get("/:id", asyncHandle(userController.getById));

export default router;
