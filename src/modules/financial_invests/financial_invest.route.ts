import express from "express";
import { FinancialInvestController } from "@/modules/financial_invests/financial_invest.controller";
import { processRequestFiles } from "@/middlewares/upload.middleware";


const router = express.Router();

router.get("/financialTasks/:task_id", FinancialInvestController.financialTaskDetail);
router.post("/financialTasks/:task_id/start", FinancialInvestController.startFinancialTask);

router.put("/financialTasks/:task_id/update", 
    processRequestFiles, 
    FinancialInvestController.updateFinancialTask
);
router.put("/financialTasks/:task_id/confirm", 
    processRequestFiles, 
    FinancialInvestController.confirmFinancialTask
);

export default router;