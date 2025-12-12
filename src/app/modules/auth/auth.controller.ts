
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  // set cookie for template compatibility
  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Registration successful',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  res.cookie('accessToken', result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: result,
  });
});

const logout = catchAsync(async (_req: Request, res: Response) => {
  res.clearCookie('accessToken');
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logout successful',
    data: null,
  });
});

export const AuthController = { register, login, logout };
