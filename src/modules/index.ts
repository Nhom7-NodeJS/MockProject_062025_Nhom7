import express from "express";

import financialInvestRouter from "@/modules/financial_invests/financial_invest.route";
import forensicInvestRouter from "@/modules/forensic_invests/forensic_invest.route";

const router = express.Router();
const API_V1 = "/api/v1";

router.use(`${API_V1}/financial-invest`, financialInvestRouter);
router.use(`${API_V1}/forensic-invest`, forensicInvestRouter);

export default router;
