import express from "express";

import userRouter from "@/routes/user.route";

const router = express.Router();
const API_V1 = "/api/v1";

router.use(`${API_V1}/users`, userRouter);

export default router;
