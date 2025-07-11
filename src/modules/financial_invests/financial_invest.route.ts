import express from "express";

import { FinancialInvestController } from "@/modules/financial_invests/financial_invest.controller";
import { processRequestFiles } from "@/middlewares/upload.middleware";
import { asyncHandle } from "@/utils/handle-error";

const router = express.Router();

router.get("/:task_id", FinancialInvestController.financialTaskDetail);
router.post("/:task_id/start", FinancialInvestController.startFinancialTask);

router.put("/:task_id/update", 
    processRequestFiles, 
    FinancialInvestController.updateFinancialTask
);
router.put("/:task_id/confirm", 
    processRequestFiles, 
    FinancialInvestController.confirmFinancialTask
);

export default router;
