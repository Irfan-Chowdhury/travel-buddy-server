
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { ReviewService } from './review.service';

const create = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const data = await ReviewService.create(req.user.userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Review created successfully',
    data,
  });
});

const update = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const data = await ReviewService.update(Number(req.params.id), req.user.userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review updated successfully',
    data,
  });
});

const remove = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  await ReviewService.remove(Number(req.params.id), req.user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Review deleted successfully',
    data: null,
  });
});

const reviewsForUser = catchAsync(async (req: Request, res: Response) => {
  const data = await ReviewService.reviewsForUser(req.params.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Reviews fetched successfully',
    data,
  });
});

export const ReviewController = { create, update, remove, reviewsForUser };
