
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { prisma } from '../../shared/prisma';
import config from '../../../config';

const list = async (query: any) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  const interestsParam = query.interests as string | undefined; // "1,2"
  const location = query.location as string | undefined;
  const minAge = query.min_age ? Number(query.min_age) : undefined;
  const maxAge = query.max_age ? Number(query.max_age) : undefined;

  const where: any = {};

  if (location) where.location = { contains: location, mode: 'insensitive' };
  if (minAge !== undefined || maxAge !== undefined) {
    where.age = {};
    if (minAge !== undefined) where.age.gte = minAge;
    if (maxAge !== undefined) where.age.lte = maxAge;
  }

  if (interestsParam) {
    const ids = interestsParam.split(',').map(Number).filter(Boolean);
    if (ids.length) {
      where.interests = {
        some: { interestId: { in: ids } },
      };
    }
  }

  const [data, total] = await Promise.all([
    prisma.user.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true, name: true, email: true, role: true, imageUrl: true, location: true, age: true, bio: true,
        ratingAvg: true, ratingCount: true,
        interests: { include: { interest: true } },
      },
    }),
    prisma.user.count({ where }),
  ]);

  const transformed = data.map(u => ({
    ...u,
    interests: u.interests.map(ui => ui.interest),
  }));

  return {
    data: transformed,
    meta: {
      current_page: page,
      per_page: limit,
      total,
      last_page: Math.ceil(total / limit) || 1,
    },
  };
};

const get = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true, name: true, email: true, role: true, imageUrl: true, location: true, age: true, bio: true,
      ratingAvg: true, ratingCount: true,
      interests: { include: { interest: true } },
    },
  });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  return {
    ...user,
    interests: user.interests.map(ui => ui.interest),
  };
};

const create = async (payload: any) => {
  const existing = await prisma.user.findUnique({ where: { email: payload.email } });
  if (existing) throw new ApiError(httpStatus.CONFLICT, 'Email already exists');

  const hashed = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds || 10));

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashed,
      role: payload.role ?? 'user',
      imageUrl: payload.imageUrl,
      location: payload.location,
      age: payload.age,
      bio: payload.bio,
      interests: payload.interests?.length
        ? {
            create: payload.interests.map((id: number) => ({
              interest: { connect: { id } },
            })),
          }
        : undefined,
    },
    select: {
      id: true, name: true, email: true, role: true, imageUrl: true, location: true, age: true, bio: true,
      ratingAvg: true, ratingCount: true,
      interests: { include: { interest: true } },
    },
  });

  return { ...user, interests: user.interests.map(ui => ui.interest) };
};

const update = async (id: string, payload: any) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');

  const data: any = { ...payload };

  if (payload.password) {
    data.password = await bcrypt.hash(payload.password, Number(config.bcrypt_salt_rounds || 10));
  }

  // replace interests if provided
  if (payload.interests) {
    await prisma.userInterest.deleteMany({ where: { userId: id } });
    data.interests = payload.interests.length
      ? {
          create: payload.interests.map((interestId: number) => ({
            interest: { connect: { id: interestId } },
          })),
        }
      : undefined;
  }

  const updated = await prisma.user.update({
    where: { id },
    data,
    select: {
      id: true, name: true, email: true, role: true, imageUrl: true, location: true, age: true, bio: true,
      ratingAvg: true, ratingCount: true,
      interests: { include: { interest: true } },
    },
  });

  return { ...updated, interests: updated.interests.map(ui => ui.interest) };
};

const remove = async (id: string) => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  await prisma.user.delete({ where: { id } });
  return null;
};

export const UserService = { list, get, create, update, remove };
