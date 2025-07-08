import express from "express";

import caseRouter from "@/modules/cases/case.route";

import userRouter from "@/modules/users/user.route";
import financialInvestRouter from "./financial_invests/financial_invest.route";

const router = express.Router();
const API_V1 = "/api/v1";


router.use(`${API_V1}/cases`, caseRouter);
router.use(`${API_V1}/users`, userRouter);
router.use(`${API_V1}/financial-invests`, financialInvestRouter);

export default router;
