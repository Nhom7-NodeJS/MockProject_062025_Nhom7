import { Router } from "express";
import { ReportController } from "@/modules/reports/report.controller";
import { reportAuthMiddleware } from "@/middlewares/auth.middleware";

const reportRouter = Router();
const reportController = new ReportController();

reportRouter.put(
  "/:reportId/status",
  reportAuthMiddleware,
  reportController.updateReportStatus.bind(reportController)
);
reportRouter.get(
  "/:reportId",
  reportAuthMiddleware,
  reportController.getReportById.bind(reportController)
);

export { reportRouter };