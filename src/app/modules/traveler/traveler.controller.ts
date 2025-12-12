
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { TravelerService } from './traveler.service';

const topRated = catchAsync(async (_req: Request, res: Response) => {
  const data = await TravelerService.topRated();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top-rated travelers fetched successfully',
    data,
  });
});

export const TravelerController = { topRated };
