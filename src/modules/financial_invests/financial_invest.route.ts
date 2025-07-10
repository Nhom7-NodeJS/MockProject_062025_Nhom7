import express from "express";
import { FinancialInvestController } from "./financial_invest.controller";

const router = express.Router();

router.get("/:task_id", FinancialInvestController.financialTaskDetail);
router.post("/:task_id/start", FinancialInvestController.startFinancialTask);
router.put("/:task_id/update", FinancialInvestController.updateFinancialTask);
router.put("/:task_id/confirm", FinancialInvestController.confirmFinancialTask);


export default router;