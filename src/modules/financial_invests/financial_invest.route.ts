import express from "express";

import { asyncHandle } from "@/utils/handle-error";

import financialInvestController from "./financial_invest.controller";

const router = express.Router();

router.put(
  "/update/:evidenceId",
  asyncHandle(financialInvestController.updateFinancialInvest)
);

export default router;
