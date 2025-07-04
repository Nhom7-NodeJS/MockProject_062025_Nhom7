import { Router } from "express";
import reportController from "@/modules/reports/report.controller";
const reportRouter = Router();

reportRouter.put(
  "/:reportId/status",
  reportController.updateReportStatus.bind(reportController)
);
reportRouter.get(
  "/:reportId",
  reportController.getReportById.bind(reportController)
);

export { reportRouter };