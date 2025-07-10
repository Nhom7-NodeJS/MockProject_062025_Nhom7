// import { Request, Response } from "express";
// import reportService from "./report.service";
// import { AppResponse } from "@/common/success.response";
// import { HttpStatusCode } from "@/constants/status-code";
// import { UpdateReportStatusDto } from "./dto/report.dto";

// interface AuthRequest extends Request {
//   user?: {
//     id: string;
//     role: string;
//     email: string;
//   };
// }

// export class ReportController {
  
//   async updateReportStatus(req: AuthRequest, res: Response): Promise<void> {
//     try {
//       const reportId = req.params.reportId;
//       const updateDto: UpdateReportStatusDto = req.body;
      
//       // Middleware đã validate token và reportStatus rồi
//       await reportService.updateReportStatus(reportId, updateDto);
      
//       res.status(HttpStatusCode.OK).json({
//         code: 200,
//         message: "report status updated"
//       });

//     } catch (error) {
//       throw error;
//     }
//   }

//   async getReportById(req: AuthRequest, res: Response): Promise<void> {
//     try {
//       const reportId = req.params.reportId;
//       const report = await reportService.getById(reportId);
    
//       const response = new AppResponse({
//         message: "Report retrieved successfully",
//         statusCode: HttpStatusCode.OK,
//         data: report
//       });
      
//       response.sendResponse(res);
//     } catch (error) {
//       throw error;
//     }
//   }
// }


import { Request, Response } from "express";
import { AppResponse } from "@/common/success.response";
import { HttpStatusCode } from "@/constants/status-code";
import { SuccessMessages, ErrorMessages } from "@/constants/message";
import { AppError } from "@/common/error.response";
import { ErrorCode } from "@/constants/error-code";
import reportService from "./report.service";
import { UpdateReportStatusDto } from "./dto/report.dto";

class ReportController {
  async updateReportStatus(req: Request, res: Response) {
    try {
      const { reportId } = req.params;
      const { reportStatus } = req.body as UpdateReportStatusDto;

      const updatedReport = await reportService.updateReportStatus(reportId, reportStatus);

      return new AppResponse({
        message: "Report status updated successfully",
        statusCode: HttpStatusCode.OK,
        data: updatedReport
      }).sendResponse(res);
    } catch (error: any) {
      throw new AppError(
        error.message || ErrorMessages.INTERNAL_SERVER_ERROR,
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.DATABASE_ERROR
      );
    }
  }

  async getAllReports(req: Request, res: Response) {
    try {
      const reports = await reportService.getAllReports();
      
      return new AppResponse({
        message: "Fetch reports data successfully",
        statusCode: HttpStatusCode.OK,
        data: reports
      }).sendResponse(res);
    } catch (error: any) {
      throw new AppError(
        error.message || ErrorMessages.INTERNAL_SERVER_ERROR,
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.DATABASE_ERROR
      );
    }
  }
}

export default new ReportController();