import { Request, Response } from "express";
import reportService from "./report.service";
import { AppResponse } from "@/common/success.response";
import { HttpStatusCode } from "@/constants/status-code";
import { UpdateReportStatusDto } from "./dto/report.dto";

export class ReportController {
  
  async updateReportStatus(req: Request, res: Response): Promise<void> {
    try {
      const reportId = req.params.reportId;
      const updateDto: UpdateReportStatusDto = req.body;

      if (!updateDto.reportStatus) {
        res.status(HttpStatusCode.BAD_REQUEST).json({
          code: HttpStatusCode.BAD_REQUEST,
          message: "reportStatus is required"
        });
        return;
      }

      await reportService.updateReportStatus(reportId, updateDto);
      res.status(HttpStatusCode.OK).json({
        code: 200,
        message: "report status updated"
      });

    } catch (error) {
      throw error;
    }
  }

  async getReportById(req: Request, res: Response): Promise<void> {
    try {
      const reportId = req.params.reportId;
      const report = await reportService.getById(reportId);
      
      // Sử dụng AppResponse class
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

export default new ReportController();