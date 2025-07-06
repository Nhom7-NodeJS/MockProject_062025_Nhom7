import { Request, Response } from "express";
import reportService from "./report.service";
import { AppResponse } from "@/common/success.response";
import { HttpStatusCode } from "@/constants/status-code";
import { UpdateReportStatusDto } from "./dto/report.dto";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    email: string;
  };
}

export class ReportController {
  
  async updateReportStatus(req: AuthRequest, res: Response): Promise<void> {
    try {
      const reportId = req.params.reportId;
      const updateDto: UpdateReportStatusDto = req.body;
      
      // Middleware đã validate token và reportStatus rồi
      await reportService.updateReportStatus(reportId, updateDto);
      
      res.status(HttpStatusCode.OK).json({
        code: 200,
        message: "report status updated"
      });

    } catch (error) {
      throw error;
    }
  }

  async getReportById(req: AuthRequest, res: Response): Promise<void> {
    try {
      const reportId = req.params.reportId;
      const report = await reportService.getById(reportId);
    
      const response = new AppResponse({
        message: "Report retrieved successfully",
        statusCode: HttpStatusCode.OK,
        data: report
      });
      
      response.sendResponse(res);
    } catch (error) {
      throw error;
    }
  }
}