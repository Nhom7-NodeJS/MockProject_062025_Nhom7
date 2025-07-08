import { Request, Response } from "express";
// import { AuthenticatedRequest } from "@/middlewares/auth.middleware";
import { CaseService } from "./case.service";
import { AppResponse } from "@/common/success.response";
import { HttpStatusCode } from "@/constants/status-code";
import { SuccessMessages } from "@/constants/message";
import { CaseStatus } from "./enums/case.enum";
import { ConfirmCaseDto, ConfirmCaseResponseDto } from "./dto/confirm-case.dto";

const caseService = new CaseService();

class CaseController {
  async getAllCases(req: Request, res: Response) {
    const { status } = req.query;
    
    // If status is provided, filter by status
    if (status) {
      // Validate status
      if (!Object.values(CaseStatus).includes(status as CaseStatus)) {
        return new AppResponse({
          message: `Invalid status. Must be one of: ${Object.values(CaseStatus).join(', ')}`,
          statusCode: HttpStatusCode.BAD_REQUEST,
        }).sendResponse(res);
      }

      const cases = await caseService.getAllByStatus(status as CaseStatus);
      return new AppResponse({
        message: SuccessMessages.CASE.CASE_GET,
        statusCode: HttpStatusCode.OK,
        data: cases,
      }).sendResponse(res);
    }
    
    // If no status provided, return all cases
    const cases = await caseService.getAll();
    return new AppResponse({
      message: SuccessMessages.CASE.CASE_GET,
      statusCode: HttpStatusCode.OK,
      data: cases,
    }).sendResponse(res);
  }

  // async confirmCaseAndAssignInvestigator(req: AuthenticatedRequest, res: Response) {
  //   const { caseId } = req.params;
  //   const { username, notes = null } = req.body as ConfirmCaseDto;
  //   const currentUser = req.user; // Current user from auth middleware
    
  //   if (!currentUser) {
  //     return new AppResponse({
  //       message: 'User not authenticated',
  //       statusCode: HttpStatusCode.UNAUTHORIZED,
  //     }).sendResponse(res);
  //   }

  //   try {
  //     const { case: updatedCase, caseUser } = await caseService.confirmCaseAndAssignInvestigator(
  //       caseId,
  //       username,
  //       notes
  //     );

  //     const response = new ConfirmCaseResponseDto(
  //       updatedCase.case_id,
  //       updatedCase.status,
  //       caseUser.username,
  //       new Date()
  //     );

  //     return new AppResponse({
  //       message: SuccessMessages.CASE.CASE_UPDATED,
  //       statusCode: HttpStatusCode.OK,
  //       data: response
  //     }).sendResponse(res);
  //   } catch (error: any) {
  //     return new AppResponse({
  //       message: error.message || 'Failed to confirm case and assign investigator',
  //       statusCode: HttpStatusCode.BAD_REQUEST
  //     }).sendResponse(res);
  //   }
  // }

  /**
   * TEST ONLY - Bypasses authentication for testing
   * REMOVE THIS IN PRODUCTION
   * 
   * Example request:
   * POST /api/v1/cases/test-confirm
   * {
   *   "caseId": "your-case-id",
   *   "username": "investigator-username",
   *   "notes": "Test assignment"
   * }
   */
  async testConfirmCaseAndAssignInvestigator(req: Request, res: Response) {
    const { caseId, username, notes = null } = req.body;
    
    console.log('TEST MODE: Bypassing authentication');
    
    try {
      const { case: updatedCase, caseUser } = await caseService.confirmCaseAndAssignInvestigator(
        caseId,
        username,
        notes
      );

      const response = new ConfirmCaseResponseDto(
        updatedCase.case_id,
        updatedCase.status,
        caseUser.username,
        new Date()
      );

      return new AppResponse({
        message: 'TEST MODE: ' + SuccessMessages.CASE.CASE_UPDATED,
        statusCode: HttpStatusCode.OK,
        data: response
      }).sendResponse(res);
    } catch (error: any) {
      console.error('TEST MODE ERROR:', error);
      return new AppResponse({
        message: 'TEST MODE ERROR: ' + (error.message || 'Failed to confirm case'),
        statusCode: HttpStatusCode.BAD_REQUEST
      }).sendResponse(res);
    }
  }
}

export default new CaseController();
