import express from "express";

import userRouter from "@/routes/user";
import { reportRouter } from "./report";

const router = express.Router();
const API_V1 = "/api/v1";

router.use(`${API_V1}/users`, userRouter);
router.use(`${API_V1}/reports`, reportRouter);

export default router;
