import express from "express";
import { FinancialInvestController } from "./financial_invest.controller";

const router = express.Router();

router.get("/:warrant_id", FinancialInvestController.financialTaskDetail);
router.put("/:warrant_id/update", FinancialInvestController.updateFinancialTask);
router.put("/:warrant_id/confirm", FinancialInvestController.confirmFinancialTask);
router.post("/:warrant_id/start", FinancialInvestController.startFinancialTask);

export default router;