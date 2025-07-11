// warrant.router.ts
import express from "express";
import warrantController from "./warrant.controller";
import { getAllWarantSchema } from "./validate/warrant.validate";
import { validateBody, validateQuery } from "@/middlewares/validate.middleware";
import {
  searchWarrantSchema,
  createWarrantSchema,
} from "./validate/warrant.validate";
import { CloudinaryFolder } from "@/constants/cloudinary-folder";
import { processRequestFiles } from "@/middlewares/process-file.middleware";
import { parseJSONFields } from "@/middlewares/parse-json.middleware";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { RoleType } from "@/constants/role-type";
const router = express.Router();

router.get(
  "/",
  validateQuery(getAllWarantSchema),
  authMiddleware([RoleType.POLICE_CHIEF, RoleType.ADMIN]),
  warrantController.getAllWarrantsWithStatus
);

router.post(
  "/createNewWarrant",
  authMiddleware([RoleType.POLICE_CHIEF, RoleType.ADMIN]),
  processRequestFiles(CloudinaryFolder.WARRANT),
  parseJSONFields(["attached_file"]),
  validateBody(createWarrantSchema),
  warrantController.createNewWarrant
);

router.post(
  "/searchWarrantByName",
  authMiddleware([RoleType.POLICE_CHIEF, RoleType.ADMIN]),
  validateBody(searchWarrantSchema),
  warrantController.searchWarrantByName
);

router.get(
  "/getWarrantById/:warrant_id",
  authMiddleware([RoleType.POLICE_CHIEF, RoleType.ADMIN]),
  warrantController.getWarrantById
);

export default router;
