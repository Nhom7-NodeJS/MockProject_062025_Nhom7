import express from "express";
import userRouter from "@/modules/users/user.route";

import financialInvestRouter from "@/modules/financial_invests/financial_invest.route";
import caseRouter from "@/modules/cases/case.route";

const router = express.Router();
const API_V1 = "/api/v1";

router.use(`${API_V1}/financialTask`, financialInvestRouter);
router.use(`${API_V1}/users`, userRouter);
router.use(`${API_V1}/cases`, caseRouter);

export default router;