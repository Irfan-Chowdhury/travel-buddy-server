
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { prisma } from '../../shared/prisma';

const list = async (query: any) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.travelPlan.findMany({
      skip,
      take: limit,
      orderBy: { startDate: 'asc' },
      include: {
        host: { select: { id: true, name: true, location: true, imageUrl: true } },
        interests: { include: { interest: true } },
        participants: true,
      },
    }),
    prisma.travelPlan.count(),
  ]);

  const transformed = data.map(p => ({
    ...p,
    interests: p.interests.map(pi => pi.interest),
    participants_count: p.participants.length,
  }));

  return {
    data: transformed,
    meta: { current_page: page, per_page: limit, total, last_page: Math.ceil(total / limit) || 1 },
  };
};

const create = async (userId: string, payload: any) => {
  const plan = await prisma.travelPlan.create({
    data: {
      userId,
      title: payload.title,
      shortDescription: payload.shortDescription,
      destination: payload.destination,
      startDate: new Date(payload.startDate),
      endDate: new Date(payload.endDate),
      budget: payload.budget,
      travelType: payload.travelType,
      itinerary: payload.itinerary ?? null,
      groupSize: payload.groupSize ?? 1,
      status: payload.status ?? 'active',
      interests: payload.interests?.length
        ? {
            create: payload.interests.map((id: number) => ({
              interest: { connect: { id } },
            })),
          }
        : undefined,
      participants: {
        create: {
          userId,
          role: 'host',
          status: 'approved',
        },
      },
    },
    include: {
      host: { select: { id: true, name: true, location: true, imageUrl: true } },
      interests: { include: { interest: true } },
      participants: true,
    },
  });

  return {
    ...plan,
    interests: plan.interests.map(pi => pi.interest),
    participants_count: plan.participants.length,
  };
};

const get = async (id: number) => {
  const plan = await prisma.travelPlan.findUnique({
    where: { id },
    include: {
      host: { select: { id: true, name: true, location: true, imageUrl: true } },
      interests: { include: { interest: true } },
      participants: {
        include: { user: { select: { id: true, name: true, imageUrl: true, location: true } } },
      },
    },
  });
  if (!plan) throw new ApiError(httpStatus.NOT_FOUND, 'Travel plan not found');

  return {
    ...plan,
    interests: plan.interests.map(pi => pi.interest),
    participants_count: plan.participants.length,
  };
};

const update = async (id: number, userId: string, payload: any) => {
  const plan = await prisma.travelPlan.findUnique({ where: { id } });
  if (!plan) throw new ApiError(httpStatus.NOT_FOUND, 'Travel plan not found');
  if (plan.userId !== userId) throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');

  if (payload.interests) {
    await prisma.travelPlanInterest.deleteMany({ where: { travelPlanId: id } });
  }

  const updated = await prisma.travelPlan.update({
    where: { id },
    data: {
      title: payload.title,
      shortDescription: payload.shortDescription,
      destination: payload.destination,
      startDate: payload.startDate ? new Date(payload.startDate) : undefined,
      endDate: payload.endDate ? new Date(payload.endDate) : undefined,
      budget: payload.budget,
      travelType: payload.travelType,
      itinerary: payload.itinerary,
      groupSize: payload.groupSize,
      status: payload.status,
      interests: payload.interests
        ? payload.interests.length
          ? { create: payload.interests.map((interestId: number) => ({ interest: { connect: { id: interestId } } })) }
          : undefined
        : undefined,
    },
    include: {
      host: { select: { id: true, name: true, location: true, imageUrl: true } },
      interests: { include: { interest: true } },
      participants: true,
    },
  });

  return {
    ...updated,
    interests: updated.interests.map(pi => pi.interest),
    participants_count: updated.participants.length,
  };
};

const remove = async (id: number, userId: string) => {
  const plan = await prisma.travelPlan.findUnique({ where: { id } });
  if (!plan) throw new ApiError(httpStatus.NOT_FOUND, 'Travel plan not found');
  if (plan.userId !== userId) throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');

  await prisma.travelPlan.delete({ where: { id } });
  return null;
};

const upcomingTrips = async () => {
  const now = new Date();
  const trips = await prisma.travelPlan.findMany({
    where: { startDate: { gt: now }, status: 'active' },
    orderBy: { startDate: 'asc' },
  });
  return trips;
};

const match = async (query: any) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  const destination = query.destination as string | undefined;
  const minBudget = query.min_budget ? Number(query.min_budget) : undefined;
  const maxBudget = query.max_budget ? Number(query.max_budget) : undefined;
  const startDate = query.start_date ? new Date(query.start_date) : undefined;
  const endDate = query.end_date ? new Date(query.end_date) : undefined;
  const interestsParam = query.interests as string | undefined;

  const where: any = {};

  if (destination) where.destination = { contains: destination, mode: 'insensitive' };
  if (minBudget !== undefined || maxBudget !== undefined) {
    where.budget = {};
    if (minBudget !== undefined) where.budget.gte = minBudget;
    if (maxBudget !== undefined) where.budget.lte = maxBudget;
  }
  if (startDate) where.startDate = { gte: startDate };
  if (endDate) where.endDate = { lte: endDate };

  if (interestsParam) {
    const ids = interestsParam.split(',').map(Number).filter(Boolean);
    if (ids.length) {
      where.interests = { some: { interestId: { in: ids } } };
    }
  }

  const [plans, total] = await Promise.all([
    prisma.travelPlan.findMany({
      where,
      skip,
      take: limit,
      orderBy: { startDate: 'asc' },
      include: {
        host: { select: { id: true, name: true, location: true, imageUrl: true } },
        interests: { include: { interest: true } },
        participants: true,
      },
    }),
    prisma.travelPlan.count({ where }),
  ]);

  const data = plans.map(p => ({
    id: p.id,
    title: p.title,
    destination: p.destination,
    start_date: p.startDate,
    end_date: p.endDate,
    budget: p.budget,
    group_size: p.groupSize,
    status: p.status,
    host: p.host,
    interests: p.interests.map(pi => pi.interest),
    participants_count: p.participants.length,
  }));

  return {
    data,
    meta: { current_page: page, per_page: limit, total, last_page: Math.ceil(total / limit) || 1 },
  };
};

const join = async (travelPlanId: number, userId: string, message?: string) => {
  const plan = await prisma.travelPlan.findUnique({ where: { id: travelPlanId } });
  if (!plan) throw new ApiError(httpStatus.NOT_FOUND, 'Travel plan not found');

  if (plan.userId === userId) throw new ApiError(httpStatus.BAD_REQUEST, 'Host cannot join own plan');

  const existing = await prisma.travelPlanParticipant.findUnique({
    where: { travelPlanId_userId: { travelPlanId, userId } },
  });

  if (existing) throw new ApiError(httpStatus.CONFLICT, 'Already requested or joined');

  const participant = await prisma.travelPlanParticipant.create({
    data: { travelPlanId, userId, role: 'member', status: 'pending' },
  });

  // optional join request message
  if (message) {
    await prisma.joinRequest.upsert({
      where: { travelPlanId_userId: { travelPlanId, userId } },
      update: { message, status: 'pending' },
      create: { travelPlanId, userId, message, status: 'pending' },
    });
  }

  return participant;
};

const approve = async (participantId: number, hostId: string) => {
  const participant = await prisma.travelPlanParticipant.findUnique({
    where: { id: participantId },
    include: { travelPlan: true },
  });

  if (!participant) throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
  if (participant.travelPlan.userId !== hostId) throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');

  const updated = await prisma.travelPlanParticipant.update({
    where: { id: participantId },
    data: { status: 'approved' },
  });

  // keep join request status in sync
  await prisma.joinRequest.updateMany({
    where: { travelPlanId: participant.travelPlanId, userId: participant.userId },
    data: { status: 'approved' },
  });

  return updated;
};

const decline = async (participantId: number, hostId: string) => {
  const participant = await prisma.travelPlanParticipant.findUnique({
    where: { id: participantId },
    include: { travelPlan: true },
  });

  if (!participant) throw new ApiError(httpStatus.NOT_FOUND, 'Request not found');
  if (participant.travelPlan.userId !== hostId) throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');

  const updated = await prisma.travelPlanParticipant.update({
    where: { id: participantId },
    data: { status: 'declined' },
  });

  await prisma.joinRequest.updateMany({
    where: { travelPlanId: participant.travelPlanId, userId: participant.userId },
    data: { status: 'declined' },
  });

  return updated;
};

export const TravelPlanService = {
  list,
  create,
  get,
  update,
  remove,
  upcomingTrips,
  match,
  join,
  approve,
  decline,
};
