import express from "express";
import { FinancialInvestController } from "@/modules/financial_invests/financial_invest.controller";
import { processRequestFiles } from "@/middlewares/upload.middleware";
import { validateParams, validateBody } from "@/middlewares/validate.middleware";
import { asyncHandle } from "@/utils/handle-error";
import { authMiddleware } from "@/middlewares/auth.middleware";
import {
  taskIdParamSchema,
  updateFinancialTaskSchema,
  confirmFinancialTaskSchema
} from "@/modules/financial_invests/validate/financial_invest.validate";
import { RoleType } from "@/constants/role-type";

const router = express.Router();

router.get(
  "/:task_id",
  authMiddleware([RoleType.FINANCIAL_INVESTIGATOR]),
  validateParams(taskIdParamSchema),
  asyncHandle(FinancialInvestController.financialTaskDetail)
);

router.post(
  "/:task_id/start",
  authMiddleware([RoleType.FINANCIAL_INVESTIGATOR]),
  validateParams(taskIdParamSchema),
  asyncHandle(FinancialInvestController.startFinancialTask)
);

router.put(
  "/:task_id/update",
  authMiddleware([RoleType.FINANCIAL_INVESTIGATOR]),
  validateParams(taskIdParamSchema),
  processRequestFiles,
  validateBody(updateFinancialTaskSchema),
  asyncHandle(FinancialInvestController.updateFinancialTask)
);

router.put(
  "/:task_id/confirm",
  authMiddleware([RoleType.FINANCIAL_INVESTIGATOR]),
  validateParams(taskIdParamSchema),
  processRequestFiles,
  validateBody(confirmFinancialTaskSchema),
  asyncHandle(FinancialInvestController.confirmFinancialTask)
);

export default router;