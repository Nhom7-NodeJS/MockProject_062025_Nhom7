// warrant.router.ts
<<<<<<< HEAD
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
=======
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
>>>>>>> d627b66cfc31fa246dcaffe0e4d745d8ea3e5c48
