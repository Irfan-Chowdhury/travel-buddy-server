
import express from 'express';
import { TravelerController } from './traveler.controller';

const router = express.Router();

router.get('/top-rated', TravelerController.topRated);

export const travelerRoutes = router;
