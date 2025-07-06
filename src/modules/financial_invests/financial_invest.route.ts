import express from "express";

import financialInvestController from "./financial_invest.controller";
import { asyncHandle } from "@/utils/handle-error";

const router = express.Router();

router.get("/", asyncHandle(financialInvestController.getAll));

router.get("/:evidenceId", asyncHandle(financialInvestController.getById));

export default router;
