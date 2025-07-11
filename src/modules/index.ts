import express from "express";

import userRouter from "@/modules/users/user.route";
import reportRouter from "@/modules/reports/report.route";
import caseRouter from "@/modules/cases/case.route";

const router = express.Router();
const API_V1 = "/api/v1";

router.use(`${API_V1}/users`, userRouter);
router.use(`${API_V1}/home`, reportRouter);
router.use(`${API_V1}/cases`, caseRouter);

export default router;
