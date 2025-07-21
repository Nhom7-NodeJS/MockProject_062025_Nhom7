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
import { asyncHandle } from "@/utils/handle-error";
const router = express.Router();

router.get(
  "/",
  validateQuery(getAllWarantSchema),
  // authMiddleware([RoleType.POLICE_CHIEF, RoleType.ADMIN]),
  warrantController.getAllWarrantsWithStatus
);

router.post(
  "/create",
  authMiddleware([RoleType.POLICE_CHIEF, RoleType.ADMIN]),
  processRequestFiles(CloudinaryFolder.WARRANT),
  parseJSONFields(["attached_file"]),
  validateBody(createWarrantSchema),
  asyncHandle((req, res) => warrantController.createNewWarrant(req, res))
);

router.post(
  "/searchWarrantByName",
  authMiddleware([RoleType.POLICE_CHIEF, RoleType.ADMIN]),
  validateBody(searchWarrantSchema),
  asyncHandle((req, res) => warrantController.searchWarrantByName(req, res))
);

router.get(
  "/:warrant_id",
  authMiddleware([RoleType.POLICE_CHIEF, RoleType.ADMIN]),
  asyncHandle((req, res) => warrantController.getWarrantById(req, res))
);

export default router;
