import express from "express";

import { asyncHandle } from "@/utils/handle-error";

import financialInvestController from "./financial_invest.controller";

const router = express.Router();

router.get("/", asyncHandle(financialInvestController.getAll));

router.get("/:warrantId", asyncHandle(financialInvestController.getById));

export default router;
