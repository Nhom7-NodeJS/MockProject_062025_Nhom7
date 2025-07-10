import express from "express";

import { asyncHandle } from "@/utils/handle-error";
import forensicInvestController from "./forensic_invest.controller";

const router = express.Router();

router.put(
  "/update/:evidenceId",
  asyncHandle(forensicInvestController.updateFinancialInvest)
);

export default router;
