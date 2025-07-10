import express from "express";
import userRouter from "@/modules/users/user.route";
import reportRouter from "./reports/report.route";
import authRouter from "./auth/auth.route";


const router = express.Router();
const API_V1 = "/api/v1";

router.use(`${API_V1}/users`, userRouter);
router.use(`${API_V1}/report`, reportRouter)
router.use("/account", authRouter);
export default router;