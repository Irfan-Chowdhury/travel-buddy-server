
import express from 'express';
import auth from '../../middlewares/auth';
import { JoinRequestController } from './joinRequest.controller';

const router = express.Router();

router.get('/', auth('user','admin'), JoinRequestController.list);

export const joinRequestRoutes = router;
