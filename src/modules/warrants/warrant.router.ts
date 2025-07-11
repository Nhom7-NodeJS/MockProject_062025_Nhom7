// warrant.router.ts
import express from "express";
import warrantController from "./warrant.controller";
import { processRequestFiles } from "@/middlewares/upload.middleware";

const router = express.Router();

router.get("/", warrantController.getAllWarrants);

router.get(
  "/getExecutingWarrant",
  warrantController.getExecutingWarrants
);

router.get(
  "/getCompletedWarrant",
  warrantController.getCompletedWarrants
);

router.post(
  "/createNewWarrant",
  processRequestFiles,
  warrantController.createNewWarrant
);

router.post(
  "/searchWarrantByName",
  warrantController.searchWarrantByName
);

router.get(
  "/getWarrantById/:warrant_id",
  warrantController.getWarrantById
);

export default router;
