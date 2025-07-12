import { Router } from "express";

import { asyncHandle } from "@/utils/handle-error";
import { 
  validateQuery, 
  validateBody, 
  validateParams
} from "@/middlewares/validate.middleware";
import { authMiddleware } from "@/middlewares/auth.middleware";
import { RoleType } from "@/constants/role-type";

import CaseController from "./case.controller";
import { getAllCasesSchema, getPaginatedCasesSchema } from "./schemas/query-case.schema";
import { confirmCaseBodySchema, confirmCaseParamsSchema } from "./schemas/confirm-case.schema";

const router = Router();

// GET /cases - Get all cases (non-paginated)
// Example: /cases?status=In%20Process
router.get(
  "/",
  authMiddleware([RoleType.POLICE_CHIEF]),
  validateQuery(getAllCasesSchema),
  asyncHandle(CaseController.getAllCases)
);

// GET /cases/paginated - Get paginated cases with optional status filter
// Example: /cases/paginated?status=In%20Process&page=1&limit=10
router.get(
  "/paginated",
  authMiddleware([RoleType.POLICE_CHIEF]),
  validateQuery(getPaginatedCasesSchema),
  asyncHandle(CaseController.getPaginatedCases)
);

// PUT /cases/:caseId/confirm - Confirm a case and assign main investigator
// Example: /cases/CASE-002/confirm
router.put(
  "/:caseId/confirm",
  authMiddleware([RoleType.POLICE_CHIEF]), // Only police chief can confirm cases
  validateParams(confirmCaseParamsSchema),
  validateBody(confirmCaseBodySchema),
  asyncHandle(CaseController.confirmCaseAndAssignInvestigator)
);

// GET /cases/me - Get cases assigned to the authenticated user
// Example: /cases/me?status=In%20Process
router.get(
  "/me",
  authMiddleware([
    RoleType.POLICE_CHIEF,
    RoleType.INVESTIGATOR,
    RoleType.FORENSIC_OFFICER,
    RoleType.FINANCIAL_INVESTIGATOR
  ]),
  validateQuery(getAllCasesSchema),
  asyncHandle(CaseController.getCasesByUser)
);

export default router;