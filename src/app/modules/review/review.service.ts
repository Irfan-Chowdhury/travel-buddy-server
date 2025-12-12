
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { prisma } from '../../shared/prisma';

const recalculateUserRating = async (userId: string) => {
  const agg = await prisma.review.aggregate({
    where: { reviewedUserId: userId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  const avg = Number(agg._avg.rating || 0);
  const count = agg._count.rating || 0;

  await prisma.user.update({
    where: { id: userId },
    data: { ratingAvg: avg, ratingCount: count },
  });

  return { ratingAvg: avg, ratingCount: count };
};

const create = async (reviewerId: string, payload: any) => {
  // ensure travel plan exists
  const plan = await prisma.travelPlan.findUnique({ where: { id: payload.travelPlanId } });
  if (!plan) throw new ApiError(httpStatus.NOT_FOUND, 'Travel plan not found');

  if (payload.reviewedUserId === reviewerId) throw new ApiError(httpStatus.BAD_REQUEST, 'You cannot review yourself');

  const review = await prisma.review.create({
    data: {
      reviewerId,
      reviewedUserId: payload.reviewedUserId,
      travelPlanId: payload.travelPlanId,
      rating: payload.rating,
      comment: payload.comment,
    },
  });

  await recalculateUserRating(payload.reviewedUserId);

  return review;
};

const update = async (id: number, reviewerId: string, payload: any) => {
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  if (review.reviewerId !== reviewerId) throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');

  const updated = await prisma.review.update({
    where: { id },
    data: {
      rating: payload.rating,
      comment: payload.comment,
    },
  });

  await recalculateUserRating(updated.reviewedUserId);

  return updated;
};

const remove = async (id: number, reviewerId: string) => {
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw new ApiError(httpStatus.NOT_FOUND, 'Review not found');
  if (review.reviewerId !== reviewerId) throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');

  await prisma.review.delete({ where: { id } });
  await recalculateUserRating(review.reviewedUserId);

  return null;
};

const reviewsForUser = async (userId: string) => {
  return prisma.review.findMany({
    where: { reviewedUserId: userId },
    orderBy: { createdAt: 'desc' },
    include: {
      reviewer: { select: { id: true, name: true, imageUrl: true } },
      travelPlan: { select: { id: true, title: true, destination: true, startDate: true, endDate: true } },
    },
  });
};

export const ReviewService = { create, update, remove, reviewsForUser, recalculateUserRating };
