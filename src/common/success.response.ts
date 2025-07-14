import { HttpStatusCode } from "@/constants/status-code";
import { Response } from "express";

interface IAppResponse {
  message: string;
  statusCode?: number;
  data?: any;
  pagination?: any;
}

export class AppResponse {
  message: string;
  statusCode: number;
  data: any;
  pagination?: any;

  constructor({ message, statusCode = HttpStatusCode.OK, data = {}, pagination }: IAppResponse) {
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.pagination = pagination;
  }

  sendResponse(res: Response) {
    return res.status(this.statusCode).json({
      success: true,
      message: this.message,
      data: this.data,
      pagination: this.pagination,
    });
  }
}