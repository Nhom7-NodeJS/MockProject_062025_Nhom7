import express from "express";
import { FinancialInvestController } from "./financial_invest.controller";

const router = express.Router();

router.get("/:warrant_id", FinancialInvestController.financialTaskDetail);
router.put("/:warrant_id/update", FinancialInvestController.updateFinancialTask);
router.put("/:warrant_id/confirm", FinancialInvestController.confirmFinancialTask);

export default router;