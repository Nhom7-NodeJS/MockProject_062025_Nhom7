// warrant.router.ts
import { Router } from "express";
import WarrantController from "./warrant.controller";
import { processRequestFiles } from "@/middlewares/upload.middleware";

const WarrantRouter = Router();

WarrantRouter.get("/getAllWarrant", WarrantController.getAllWarrants);
WarrantRouter.get(
  "/getExecutingWarrant",
  WarrantController.getExecutingWarrants
);
WarrantRouter.get(
  "/getCompletedWarrant",
  WarrantController.getCompletedWarrants
);
WarrantRouter.post(
  "/createNewWarrant",
  processRequestFiles,
  WarrantController.createNewWarrant
);
WarrantRouter.post(
  "/searchWarrantByName",
  WarrantController.searchWarrantByName
);
WarrantRouter.get(
  "/getWarrantById/:warrant_id",
  WarrantController.getWarrantById
);
export default WarrantRouter;
