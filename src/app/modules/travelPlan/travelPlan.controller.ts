
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { TravelPlanService } from './travelPlan.service';

const list = catchAsync(async (req: Request, res: Response) => {
  const result = await TravelPlanService.list(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Travel plans fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const create = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const userId = req.user.userId;
  const data = await TravelPlanService.create(userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Travel plan created successfully',
    data,
  });
});

const get = catchAsync(async (req: Request, res: Response) => {
  const data = await TravelPlanService.get(Number(req.params.id));
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Travel plan details',
    data,
  });
});

const update = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const data = await TravelPlanService.update(Number(req.params.id), req.user.userId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Travel plan updated successfully',
    data,
  });
});

const remove = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  await TravelPlanService.remove(Number(req.params.id), req.user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Travel plan deleted successfully',
    data: null,
  });
});

const upcomingTrips = catchAsync(async (_req: Request, res: Response) => {
  const data = await TravelPlanService.upcomingTrips();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Upcoming trips fetched successfully',
    data,
  });
});

const match = catchAsync(async (req: Request, res: Response) => {
  const result = await TravelPlanService.match(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Matched travel plans fetched successfully',
    data: result.data,
    meta: result.meta,
  });
});

const join = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const travelPlanId = Number(req.params.id);
  const participant = await TravelPlanService.join(travelPlanId, req.user.userId, req.body?.message);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Join request sent',
    data: participant,
  });
});

const approve = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const participantId = Number(req.params.id);
  const data = await TravelPlanService.approve(participantId, req.user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User approved',
    data,
  });
});

const decline = catchAsync(async (req: Request & { user?: any }, res: Response) => {
  const participantId = Number(req.params.id);
  const data = await TravelPlanService.decline(participantId, req.user.userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User declined',
    data,
  });
});

export const TravelPlanController = { list, create, get, update, remove, upcomingTrips, match, join, approve, decline };
