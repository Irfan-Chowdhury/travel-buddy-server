
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { UserService } from './user.service';

const list = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.list(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const get = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.get(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully',
    data,
  });
});

const create = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.create(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data,
  });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const data = await UserService.update(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data,
  });
});

const remove = catchAsync(async (req: Request, res: Response) => {
  await UserService.remove(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: null,
  });
});

export const UserController = { list, get, create, update, remove };
