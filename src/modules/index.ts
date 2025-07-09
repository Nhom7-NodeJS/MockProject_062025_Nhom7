import express from "express";

import authRouter from "@/modules/auth/auth.route";
import caseRouter from "@/modules/cases/case.route";

const router = express.Router();
const API_V1 = "/api/v1";

// Public routes
router.use(`${API_V1}/auth`, authRouter);

// Protected routes
router.use(`${API_V1}/cases`, caseRouter);

export default router;
