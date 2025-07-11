import express from "express";

import reportController from "@/modules/reports/report.controller";
import { asyncHandle } from "@/utils/handle-error";
import { processRequestFiles } from "@/middlewares/process-file.middleware";
import { validateBody } from "@/middlewares/validate.middleware";
import { parseJSONFields } from "@/middlewares/parse-json.middleware";
import { CreateReportSchema } from "./schemas/create-report.schema";
import { CloudinaryFolder } from "@/constants/cloudinary-folder";

const router = express.Router();

router.post(
  "/report",
  processRequestFiles(CloudinaryFolder.EVIDENCES), 
  parseJSONFields(["reporterInfo", "incidentInfo", "relevantParties", "evidences"]), 
  validateBody(CreateReportSchema), 
  asyncHandle((req, res) => reportController.createReport(req, res)
));

export default router;