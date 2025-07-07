import express from "express";

//import userRouter from "@/routes/user.routes";

import UserRouter from "@/modules/users/user.route";
const router = express.Router();
const API_V1 = "/api/v1";

router.use(`${API_V1}/users`, UserRouter);

export default router;
