import { Router } from "express";
import CaseController from "./case.controller";
import { asyncHandle } from "@/utils/handle-error";
// import { validateQuery } from "@/middlewares/validate.middleware";
import { QueryCaseSchema } from "./schemas/query-case-schema";
// import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

// GET /cases - Get all cases or filter by status
// Example: /cases?status=In%20Process
router.get(
    "/",
    // validateQuery(QueryCaseSchema),
    asyncHandle(CaseController.getAllCases)
);

// PUT /cases/:caseId/confirm - Confirm a case and assign main investigator
// router.put(
//   "/:caseId/confirm",
//   authMiddleware([RoleType.SHERIFF]), // Only sheriff can confirm cases
//   asyncHandle(CaseController.confirmCaseAndAssignInvestigator)
// );

/**
 * TEST ROUTE - No authentication required
 * REMOVE THIS IN PRODUCTION
 * Example: POST /api/v1/cases/test-confirm
 */
router.post(
    "/test-confirm",
    asyncHandle(CaseController.testConfirmCaseAndAssignInvestigator)
);

export default router;