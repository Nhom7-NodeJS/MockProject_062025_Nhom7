import express from "express";

import financialInvestRouter from "@/modules/financial_invests/financial_invest.route";

const router = express.Router();
const API_V1 = "/api/v1";

router.use(`${API_V1}/financial-invest`, financialInvestRouter);

export default router;
