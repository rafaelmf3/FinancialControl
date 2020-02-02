import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import PeriodController from './app/controllers/PeriodController';

import authMiddleware from './app/middlewares/auth';
import CostCenterController from './app/controllers/CostCenterController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.show);
routes.put('/users', UserController.update);
routes.delete('/users/:id', UserController.delete);

routes.get('/cost_centers', CostCenterController.index);
routes.get('/cost_centers/:name', CostCenterController.show);
routes.post('/cost_centers', CostCenterController.store);

routes.get('/periods', PeriodController.show);
routes.post('/periods', PeriodController.store);
routes.put('/periods', PeriodController.update);
routes.delete('/periods', PeriodController.delete);

routes.get('/appointments', AppointmentController.index);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
