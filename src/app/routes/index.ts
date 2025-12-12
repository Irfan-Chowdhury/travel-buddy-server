
import express from 'express';
import { authRoutes } from '../modules/auth/auth.routes';
import { userRoutes } from '../modules/user/user.routes';
import { interestRoutes } from '../modules/interest/interest.routes';
import { travelPlanRoutes } from '../modules/travelPlan/travelPlan.routes';
import { reviewRoutes } from '../modules/review/review.routes';
import { destinationRoutes } from '../modules/destination/destination.routes';
import { travelerRoutes } from '../modules/traveler/traveler.routes';
import { joinRequestRoutes } from '../modules/joinRequest/joinRequest.routes';

const router = express.Router();

const moduleRoutes = [
  { path: '/auth', route: authRoutes },
  { path: '/users', route: userRoutes },
  { path: '/interests', route: interestRoutes },
  { path: '/travel-plans', route: travelPlanRoutes },
  { path: '/reviews', route: reviewRoutes },
  { path: '/client/destinations', route: destinationRoutes },
  { path: '/client/travelers', route: travelerRoutes },
  { path: '/join-requests', route: joinRequestRoutes },
];

moduleRoutes.forEach(r => router.use(r.path, r.route));

export default router;
