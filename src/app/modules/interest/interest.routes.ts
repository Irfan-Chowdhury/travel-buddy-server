
import express from 'express';
import { InterestController } from './interest.controller';

const router = express.Router();

router.get('/', InterestController.list);

export const interestRoutes = router;
