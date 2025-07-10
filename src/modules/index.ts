import express from "express";

import caseRouter from "@/modules/cases/case.route";

import UserRouter from "@/modules/users/user.route";
const router = express.Router();
const API_V1 = "/api/v1";

router.use(`${API_V1}/cases`, caseRouter);

export default router;
