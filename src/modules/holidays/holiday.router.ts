// warrant.router.ts
import express from "express";
import holidayController from "./holiday.controller";
import { createHolidaySchema } from "./validate/holiday.validate";
import { validateBody, validateQuery } from "@/middlewares/validate.middleware";

import { CloudinaryFolder } from "@/constants/cloudinary-folder";
import { processRequestFiles } from "@/middlewares/process-file.middleware";
import { parseJSONFields } from "@/middlewares/parse-json.middleware";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { RoleType } from "@/constants/role-type";
const router = express.Router();

router.post(
  "/createNewHoliday",
  // authMiddleware([RoleType.POLICE_CHIEF, RoleType.ADMIN]),
  validateBody(createHolidaySchema),
  holidayController.createHoliday
);
router.get("/getAll", holidayController.getAllHolidays);

export default router;
