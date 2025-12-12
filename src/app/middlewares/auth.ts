
import { NextFunction, Request, Response } from 'express';
import { jwtHelper } from '../helper/jwtHelper';
import ApiError from '../errors/ApiError';
import httpStatus from 'http-status';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

/**
 * Auth middleware (JWT)
 * - accepts Bearer token in Authorization header
 * - falls back to cookie `accessToken`
 */
const auth = (...roles: string[]) => {
  return async (req: Request & { user?: any }, _res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization;
      const bearerToken = header?.startsWith('Bearer ') ? header.slice(7) : undefined;
      const token = bearerToken || (req as any).cookies?.accessToken;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      const verified = jwtHelper.verifyToken(token, config.jwt.access_token_secret as Secret);

      req.user = verified;

      if (roles.length && !roles.includes(verified.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
