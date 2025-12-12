
import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { prisma } from '../../shared/prisma';
import { jwtHelper } from '../../helper/jwtHelper';
import config from '../../../config';

type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
  imageUrl?: string;
  location?: string;
  age?: number;
  bio?: string;
};

type LoginPayload = { email: string; password: string };

const register = async (payload: RegisterPayload) => {
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
    },
    select: {
      id: true, name: true, email: true, role: true, imageUrl: true, location: true, age: true, bio: true,
      ratingAvg: true, ratingCount: true, createdAt: true, updatedAt: true,
    },
  });

  const accessToken = jwtHelper.generateToken(
    { userId: user.id, role: user.role, email: user.email },
    config.jwt.access_token_secret,
    config.jwt.access_token_expires_in,
  );

  return { user, accessToken };
};

const login = async (payload: LoginPayload) => {
  const user = await prisma.user.findUnique({ where: { email: payload.email } });
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');

  const ok = await bcrypt.compare(payload.password, user.password);
  if (!ok) throw new ApiError(httpStatus.UNAUTHORIZED, 'Invalid credentials');

  const accessToken = jwtHelper.generateToken(
    { userId: user.id, role: user.role, email: user.email },
    config.jwt.access_token_secret,
    config.jwt.access_token_expires_in,
  );

  const safeUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: {
      id: true, name: true, email: true, role: true, imageUrl: true, location: true, age: true, bio: true,
      ratingAvg: true, ratingCount: true, createdAt: true, updatedAt: true,
    },
  });

  return { user: safeUser!, accessToken };
};

export const AuthService = { register, login };
