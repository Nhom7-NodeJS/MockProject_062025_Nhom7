// import { Router } from "express";
// import { ReportController } from "./report.controller";
// import { reportAuthMiddleware } from "@/middlewares/auth.middleware";

// const reportRouter = Router();
// const reportController = new ReportController();

// // reportRouter.put(
// //   "/:reportId/status",
// //   reportAuthMiddleware,
// //   reportController.updateReportStatus.bind(reportController)
// // );
// reportRouter.put('/reports/:reportId', reportAuthMiddleware, reportController.updateReportStatus);
// reportRouter.get(
//   "/:reportId",
//   reportAuthMiddleware,
//   reportController.getReportById.bind(reportController)
// );

// export { reportRouter };



// import { Router } from "express";
// import { ReportController } from "./report.controller";
// import { reportAuthMiddleware } from "@/middlewares/auth.middleware";

// const reportRouter = Router();
// const reportController = new ReportController();

// reportRouter.put(
//   "/:reportId",
//   reportAuthMiddleware,
//   reportController.updateReportStatus.bind(reportController)
// );

// reportRouter.get(
//   "/:reportId",
//   reportAuthMiddleware,
//   reportController.getReportById.bind(reportController)
// );

// export { reportRouter };




import { Router } from "express";
import ReportController from "./report.controller";
import { asyncHandle } from "@/utils/handle-error";
import { validateBody } from "@/middlewares/validate.middleware";
import { UpdateReportStatusSchema } from "./schemas/update-report-status.schema";

const reportRouter = Router();

reportRouter.get(
  "/",
  asyncHandle(ReportController.getAllReports)
);
reportRouter.put(
  "/:reportId/status",
  validateBody(UpdateReportStatusSchema),
  asyncHandle(ReportController.updateReportStatus)
);

export default reportRouter;