import { Request, Response } from "express";
import authService from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { HttpStatusCode } from "@/constants/status-code";

class AuthController {
  public async login(req: Request, res: Response) {
    const loginDto: LoginDto = req.body;
    const result = await authService.login(loginDto);
    res.status(HttpStatusCode.OK).json({
      code: 200,
      message: "Login successful",
      result: {
        accessToken: result.accessToken
      }
    });
  }
}

export default new AuthController();