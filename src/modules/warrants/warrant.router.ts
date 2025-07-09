// warrant.router.ts
import { Router } from "express";
import WarrantController from "./warrant.controller";

const WarrantRouter = Router();

WarrantRouter.get("/getAllWarrant", WarrantController.getAllWarrants);
WarrantRouter.get("/getExecutingWarrant", WarrantController.getExecutingWarrants);
WarrantRouter.get("/getCompletedWarrant", WarrantController.getCompletedWarrants);
WarrantRouter.post("/createNewWarrant", WarrantController.createNewWarrant);
WarrantRouter.post("/searchWarrantByName", WarrantController.searchWarrantByName);
export default WarrantRouter;
