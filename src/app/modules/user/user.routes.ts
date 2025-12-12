
import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

// public list with filters
router.get('/', UserController.list);
router.get('/:id', UserController.get);

// admin CRUD
router.post('/', auth('admin'), validateRequest(UserValidation.create), UserController.create);
router.patch('/:id', auth('admin'), validateRequest(UserValidation.update), UserController.update);
router.delete('/:id', auth('admin'), UserController.remove);

export const userRoutes = router;
