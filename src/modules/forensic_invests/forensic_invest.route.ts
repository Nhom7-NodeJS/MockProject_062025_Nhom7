import express from "express";

import { asyncHandle } from "@/utils/handle-error";
import forensicInvestController from "./forensic_invest.controller";

const router = express.Router();

router.get("/", asyncHandle(forensicInvestController.getAll));

router.get("/:warrantId", asyncHandle(forensicInvestController.getById));

export default router;
