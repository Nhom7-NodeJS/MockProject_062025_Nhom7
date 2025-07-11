import { Router } from "express";
import authController from "./auth.controller";
import { asyncHandle } from "@/utils/handle-error";
import { validateBody } from "@/middlewares/validate.middleware";
import { LoginSchema } from "./schemas/login.schema";
// import { LoginSchema } from "./schemas/login.schema";

const router = Router();

router.post(
  "/",
  validateBody(LoginSchema),
  asyncHandle(authController.login)
);

export default router;