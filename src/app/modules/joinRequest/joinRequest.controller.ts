
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { JoinRequestService } from './joinRequest.service';

const list = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const data = await JoinRequestService.list(req.query, req.user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Join requests fetched successfully',
    data,
  });
});

export const JoinRequestController = { list };
