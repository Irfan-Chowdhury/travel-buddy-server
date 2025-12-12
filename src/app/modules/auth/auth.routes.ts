
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post('/register', validateRequest(AuthValidation.register), AuthController.register);
router.post('/login', validateRequest(AuthValidation.login), AuthController.login);
router.post('/logout', auth('user','admin'), AuthController.logout);

export const authRoutes = router;
