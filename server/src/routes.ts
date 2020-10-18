import { Router } from 'express';
import multer from 'multer';

import orphanageController from './controllers/orphanageController';
import uploadConfig from './config/upload';
import authMiddleware from './middleware/auth';
import authController from './controllers/authController';
import registerController from './controllers/registerController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', orphanageController.index);
routes.get('/orphanages/:id', orphanageController.show);
routes.post(
  '/orphanages',
  authMiddleware,
  upload.array('images'),
  orphanageController.create
);

routes.post('/auth', authController.create);
routes.post('/register', registerController.create);

export default routes;
