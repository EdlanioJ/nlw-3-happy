import { Router } from 'express';
import multer from 'multer';

import orphanageController from './controllers/orphanageController';
import uploadConfig from './config/upload';
import authMiddleware from './middleware/auth';
import authController from './controllers/authController';
import registerController from './controllers/registerController';
import dashboardController from './controllers/dashboardController';
import imageController from './controllers/imageController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/auth', authController.create);
routes.post('/register', registerController.create);

routes.get('/orphanages', orphanageController.index);
routes.get('/orphanages/:id', orphanageController.show);

routes.get('/dashboard/orphanages', authMiddleware, dashboardController.index);

routes.post(
  '/dashboard/orphanages/image',
  authMiddleware,
  upload.single('image'),
  imageController.create
);

routes.post(
  '/dashboard/orphanages',
  authMiddleware,
  upload.array('images'),
  dashboardController.create
);

routes.delete(
  '/dashboard/orphanages/:orphanageId',
  authMiddleware,
  dashboardController.delete
);

routes.delete(
  '/dashboard/orphanages/image/:orphanageId/:imageId',
  authMiddleware,
  imageController.delete
);

routes.put(
  '/dashboard/orphanages/:orphanageId',
  authMiddleware,
  dashboardController.update
);

export default routes;
