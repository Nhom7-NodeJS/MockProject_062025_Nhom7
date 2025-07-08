// warrant.controller.ts
import { Request, Response } from "express";
import WarrantService from "./warrant.service";
import { SuccessMessages, ErrorMessages } from "@/constants/message";
import { HttpStatusCode } from "@/constants/status-code";

class WarrantController {
   getAllWarrants = async (req: Request, res: Response) =>{
    try {
      const warrants = await WarrantService.getAllWarrants();
      if (!warrants) {
        return res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ error: ErrorMessages.Warrant_NOT_FOUND });
      }
      return res.status(HttpStatusCode.OK).json({
        message: SuccessMessages.Warrant.WARRANT_GET,
        data: warrants,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  getExecutingWarrants = async (req: Request, res: Response) =>{
    try {
      const warrants = await WarrantService.getExecutingWarrants();
      if (!warrants) {
        return res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ error: ErrorMessages.Warrant_NOT_FOUND });
      }
      return res.status(HttpStatusCode.OK).json({
        message: SuccessMessages.Warrant.WARRANT_GET,
        data: warrants,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
  getCompletedWarrants = async (req: Request, res: Response) =>{
    try {
      const warrants = await WarrantService.getCompletedWarrants();
      if (!warrants) {
        return res
          .status(HttpStatusCode.NOT_FOUND)
          .json({ error: ErrorMessages.Warrant_NOT_FOUND });
      }
      return res.status(HttpStatusCode.OK).json({
        message: SuccessMessages.Warrant.WARRANT_GET,
        data: warrants,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new  WarrantController();
