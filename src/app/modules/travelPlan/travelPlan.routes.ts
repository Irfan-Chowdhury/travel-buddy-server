
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { TravelPlanController } from './travelPlan.controller';
import { TravelPlanValidation } from './travelPlan.validation';

const router = express.Router();

// public
router.get('/match', TravelPlanController.match);
router.get('/upcoming-trips', TravelPlanController.upcomingTrips);
router.get('/', TravelPlanController.list);
router.get('/:id', TravelPlanController.get);

// protected
router.post('/', auth('user','admin'), validateRequest(TravelPlanValidation.create), TravelPlanController.create);
router.patch('/:id', auth('user','admin'), validateRequest(TravelPlanValidation.update), TravelPlanController.update);
router.delete('/:id', auth('user','admin'), TravelPlanController.remove);

// join flow (protected)
router.post('/:id/join', auth('user','admin'), validateRequest(TravelPlanValidation.join as any), TravelPlanController.join);

// NOTE: approve/decline use participant id (same as your Laravel controller pattern)
router.post('/:id/approve', auth('user','admin'), TravelPlanController.approve);
router.post('/:id/decline', auth('user','admin'), TravelPlanController.decline);

export const travelPlanRoutes = router;
