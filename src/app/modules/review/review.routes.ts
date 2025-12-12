
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';

const router = express.Router();

router.get('/user/:userId', ReviewController.reviewsForUser);

router.post('/', auth('user','admin'), validateRequest(ReviewValidation.create), ReviewController.create);
router.patch('/:id', auth('user','admin'), validateRequest(ReviewValidation.update), ReviewController.update);
router.delete('/:id', auth('user','admin'), ReviewController.remove);

export const reviewRoutes = router;
