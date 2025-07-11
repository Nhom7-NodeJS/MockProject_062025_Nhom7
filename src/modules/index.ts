import express from "express";
import userRouter from "@/modules/users/user.route";

import reportRouter from "./reports/report.route";
import authRouter from "./auth/auth.route";

import financialInvestRouter from "@/modules/financial_invests/financial_invest.route";
import forensicInvestRouter from "@/modules/forensic_invests/forensic_invest.route";

import caseRouter from "@/modules/cases/case.route";
import financialInvestRouter from "@/modules/financial_invests/financial_invest.route";
import forensicInvestRouter from "@/modules/forensic_invests/forensic_invest.route";
import reportRouter from "@/modules/reports/report.route";
import taskRouter from "@/modules/tasks/task.route";

const router = express.Router();
const API_V1 = "/api/v1";


router.use(`${API_V1}/financial-invest`, financialInvestRouter);
router.use(`${API_V1}/forensic-invest`, forensicInvestRouter);
router.use(`${API_V1}/tasks`, taskRouter);
router.use(`${API_V1}/users`, userRouter);
router.use(`${API_V1}/home`, reportRouter);
// Public routes
router.use(`${API_V1}/auth`, authRouter);
router.use(`${API_V1}/report`, reportRouter);

// Protected routes
router.use(`${API_V1}/cases`, caseRouter);
router.use(`${API_V1}/financial-invest`, financialInvestRouter);
router.use(`${API_V1}/forensic-invest`, forensicInvestRouter);
router.use(`${API_V1}/tasks`, taskRouter);


router.use(`${API_V1}/report`, reportRouter)
router.use("/account", authRouter);
export default router;

