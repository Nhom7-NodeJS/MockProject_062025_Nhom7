// warrant.router.ts
import express from "express";
import warrantController from "./warrant.controller";
import { processRequestFiles } from "@/middlewares/upload.middleware";

import { validateQuery } from "@/middlewares/validate.middleware";
import {
  searchWarrantSchema,
  createWarrantSchema,
  getAllWarantSchema,
} from "./validate/warrant.validate";
const router = express.Router();

router.get(
  "/",
  validateQuery(getAllWarantSchema),
  warrantController.getAllWarrantsWithStatus
);

router.post(
  "/createNewWarrant",
  validateQuery(createWarrantSchema),
  processRequestFiles,
  warrantController.createNewWarrant
);

router.post(
  "/searchWarrantByName",
  validateQuery(searchWarrantSchema),
  warrantController.searchWarrantByName
);

router.get("/getWarrantById/:warrant_id", warrantController.getWarrantById);

export default router;
