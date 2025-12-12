
import express from 'express';
import { DestinationController } from './destination.controller';

const router = express.Router();

router.get('/popular', DestinationController.popular);

export const destinationRoutes = router;
