import express from "express";

import userRouter from "@/modules/users/user.route";
import reportRouter from "@/modules/reports/report.route";

const router = express.Router();
const API_V1 = "/api/v1";

router.use(`${API_V1}/users`, userRouter);
router.use(`${API_V1}/reports`, reportRouter);

export default router;
