import { Request, Response } from 'express';

import { AppResponse } from "@/common/success.response";
import { AppError } from "@/common/error.response";
import { HttpStatusCode } from "@/constants/status-code";

import authService from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

export class AuthController {
  async login(req: Request, res: Response) {
    const loginData: LoginDto = req.body;
    
    const loginResponse = await authService.validateUser(loginData.username, loginData.password);

    if (!loginResponse) {
      throw new AppError(
        'Invalid username or password',
        HttpStatusCode.UNAUTHORIZED,
        'AUTH.INVALID_CREDENTIALS'
      );
    }

    return new AppResponse({
      message: 'Login successful',
      statusCode: HttpStatusCode.OK,
      data: loginResponse,
    }).sendResponse(res);
  }

  async signup(req: Request, res: Response) {
    const signupData: SignupDto = req.body;
    
    // Create user
    const newUser = await authService.signup(signupData);

    if (!newUser) {
      throw new AppError(
        'Failed to create user',
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        'AUTH.SIGNUP_FAILED'
      );
    }

    return new AppResponse({
      message: 'Signup successful',
      statusCode: HttpStatusCode.CREATED,
      data: newUser,
    }).sendResponse(res);
  }

  async getProfile(req: any, res: Response) {
    const user = req.user;
    
    if (!user) {
      throw new AppResponse({
        message: 'User not found',
        statusCode: HttpStatusCode.NOT_FOUND,
      });
    }

    return new AppResponse({
      message: 'Profile retrieved successfully',
      statusCode: HttpStatusCode.OK,
      data: user,
    }).sendResponse(res);
  }
}

export default new AuthController();
