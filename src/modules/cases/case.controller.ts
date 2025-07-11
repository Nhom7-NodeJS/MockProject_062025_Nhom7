import { Request, Response } from 'express';

import { AppError } from '@/common/error.response';
import { AppResponse } from "@/common/success.response";
import { HttpStatusCode } from "@/constants/status-code";
import { SuccessMessages } from "@/constants/message";
import { AuthenticatedRequest } from '@/middlewares/auth.middleware';
import { PaginationUtils } from "@/utils/pagination";

import caseService from "./case.service";
import { GetAllCasesQuery, GetPaginatedCasesQuery } from "./dto/case.dto";
import { IConfirmCaseDto, IConfirmCaseResponseDto } from './dto/confirm-case.dto';

class CaseController {
  async getAllCases(req: Request, res: Response) {
    const { status } = req.query as GetAllCasesQuery;

    const cases = await caseService.getAllCases(status);
    return new AppResponse({
      message: SuccessMessages.CASE.CASE_GET,
      statusCode: HttpStatusCode.OK,
      data: cases,
    }).sendResponse(res);
  }

  async getPaginatedCases(req: Request, res: Response) {
    const { status } = req.query as GetPaginatedCasesQuery;
    
    const paginationOptions = {
      defaultLimit: 10,
      maxLimit: 100
    };

    const pagination = PaginationUtils.getPaginationParams(req, paginationOptions);
    
    // Get paginated cases with optional status filter
    const { items, total } = await caseService.getPaginatedCases(
      pagination,
      status
    );
    
    // Create paginated response
    const paginatedResponse = PaginationUtils.createPaginatedResponse(
      req,
      items,
      total,
      paginationOptions
    );
    
    return new AppResponse({
      message: SuccessMessages.CASE.CASE_GET,
      statusCode: HttpStatusCode.OK,
      data: paginatedResponse,
    }).sendResponse(res);
  }

  async confirmCaseAndAssignInvestigator(req: AuthenticatedRequest, res: Response) {
    const { caseId } = req.params;
    const { investigators, notes } = req.body as IConfirmCaseDto;
 
    const { case: updatedCase, caseUsers } = await caseService.confirmCaseAndAssignInvestigators(
      caseId,
      investigators,
      notes || null
    );

    const response: IConfirmCaseResponseDto = {
      caseId: updatedCase.case_id,
      status: updatedCase.status,
      investigators: caseUsers.map(cu => cu.username),
      assignedAt: caseUsers[0]?.assigned_at || new Date()
    };

    return new AppResponse({
      message: 'Case confirmed and investigators assigned successfully',
      statusCode: HttpStatusCode.OK,
      data: response,
    }).sendResponse(res);
  }

  async getCasesByUser(req: AuthenticatedRequest, res: Response) {
    const { status } = req.query as GetAllCasesQuery;
    const username = req.user?.username;

    if (!username) {
      throw new AppError(
        'User not authenticated',
        HttpStatusCode.UNAUTHORIZED,
        'AUTH.USER_NOT_AUTHENTICATED'
      );
    }

    const cases = await caseService.getCasesByUser(username, status);
    
    return new AppResponse({
      message: SuccessMessages.CASE.CASE_GET,
      statusCode: HttpStatusCode.OK,
      data: cases,
    }).sendResponse(res);
  }
}

export default new CaseController();
