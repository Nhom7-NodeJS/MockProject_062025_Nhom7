import express from "express";

import reportController from "@/modules/reports/report.controller";
import { asyncHandle } from "@/utils/handle-error";
import { validateBody } from "@/middlewares/validate.middleware";

const router = express.Router();

router.post("/create-report", asyncHandle((req, res) =>
  reportController.createReport(req, res)
));

export default router;