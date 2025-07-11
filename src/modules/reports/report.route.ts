import express from "express";

import { CloudinaryFolder } from "@/constants/cloudinary-folder";
import { asyncHandle } from "@/utils/handle-error";
import { parseJSONFields } from "@/middlewares/parse-json.middleware";
import { processRequestFiles } from "@/middlewares/process-file.middleware";
import { validateBody } from "@/middlewares/validate.middleware";
import reportController from "@/modules/reports/report.controller";

import ReportController from "./report.controller";
import { CreateReportSchema } from "./schemas/create-report.schema";
import { UpdateReportStatusSchema } from "./schemas/update-report-status.schema";

const router = express.Router();

router.post(
  "/report",
  processRequestFiles(CloudinaryFolder.EVIDENCES), 
  parseJSONFields(["reporterInfo", "incidentInfo", "relevantParties", "evidences"]), 
  validateBody(CreateReportSchema), 
  asyncHandle((req, res) => reportController.createReport(req, res)
));
router.get(
  "/",
  asyncHandle(ReportController.getAllReports)
);
router.put(
  "/:reportId/status",
  validateBody(UpdateReportStatusSchema),
  asyncHandle(ReportController.updateReportStatus)
);


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

export default router;

