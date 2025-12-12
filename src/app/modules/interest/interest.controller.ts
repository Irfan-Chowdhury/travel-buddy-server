
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { InterestService } from './interest.service';

const list = catchAsync(async (_req: Request, res: Response) => {
  const data = await InterestService.list();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Interests fetched successfully',
    data,
  });
});

export const InterestController = { list };
