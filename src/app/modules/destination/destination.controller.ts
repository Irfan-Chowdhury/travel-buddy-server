
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { DestinationService } from './destination.service';

const popular = catchAsync(async (_req: Request, res: Response) => {
  const data = await DestinationService.popular();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Popular destinations fetched successfully',
    data,
  });
});

export const DestinationController = { popular };
