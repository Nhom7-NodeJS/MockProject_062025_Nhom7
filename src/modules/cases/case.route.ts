import { Router } from "express";
import CaseController from "./case.controller";
import { asyncHandle } from "@/utils/handle-error";
import { 
  validateQuery, 
  validateBody, 
  validateParams
} from "@/middlewares/validate.middleware";
import { 
  getAllCasesSchema, 
  getPaginatedCasesSchema 
} from "./schemas/query-case.schema";
import { 
  confirmCaseBodySchema, 
  confirmCaseParamsSchema 
} from "./schemas/confirm-case.schema";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { RoleType } from "@/constants/role-type";

const router = Router();

// GET /cases - Get all cases (non-paginated)
// Example: /cases?status=In%20Process
router.get(
  "/",
  validateQuery(getAllCasesSchema),
  asyncHandle(CaseController.getAllCases)
);

// GET /cases/paginated - Get paginated cases with optional status filter
// Example: /cases/paginated?status=In%20Process&page=1&limit=10
router.get(
  "/paginated",
  validateQuery(getPaginatedCasesSchema),
  asyncHandle(CaseController.getPaginatedCases)
);

// PUT /cases/:caseId/confirm - Confirm a case and assign main investigator
router.put(
  "/:caseId/confirm",
  authMiddleware([RoleType.POLICE_CHIEF]), // Only police chief can confirm cases
  validateParams(confirmCaseParamsSchema),
  validateBody(confirmCaseBodySchema),
  asyncHandle(CaseController.confirmCaseAndAssignInvestigator)
);

export default router;