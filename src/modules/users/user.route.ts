import express from "express";

import userController from "@/modules/users/user.controller";
import { asyncHandle } from "@/utils/handle-error";
import { validateBody } from "@/middlewares/validate.middleware";
import { CreateUserSchema } from "@/modules/users/schemas/create-user-schema";

const UserRouter = express.Router();

UserRouter.get("/", asyncHandle(userController.getAll));

export default UserRouter;
