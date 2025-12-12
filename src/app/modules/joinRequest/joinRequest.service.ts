
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { prisma } from '../../shared/prisma';

const list = async (query: any, requesterId: string) => {
  const travelPlanId = query.travelPlanId ? Number(query.travelPlanId) : undefined;
  if (!travelPlanId) throw new ApiError(httpStatus.BAD_REQUEST, 'travelPlanId is required');

  const plan = await prisma.travelPlan.findUnique({ where: { id: travelPlanId } });
  if (!plan) throw new ApiError(httpStatus.NOT_FOUND, 'Travel plan not found');
  if (plan.userId !== requesterId) throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');

  return prisma.joinRequest.findMany({
    where: { travelPlanId },
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { id: true, name: true, imageUrl: true } } },
  });
};

export const JoinRequestService = { list };
