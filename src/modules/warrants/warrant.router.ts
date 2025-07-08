// warrant.router.ts
import { Router } from "express";
import WarrantController from "./warrant.controller";

const WarrantRouter = Router();

WarrantRouter.get("/getAllWarrant", WarrantController.getAllWarrants);
// 👆 RẤT QUAN TRỌNG: bind để đảm bảo `this` trong class hoạt động đúng

export default WarrantRouter;
