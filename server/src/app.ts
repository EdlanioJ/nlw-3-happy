import dotenv from 'dotenv';
import createConnection from './database/connection';

import express from 'express';
import cors from 'cors';
import path from 'path';

import 'express-async-errors';

import routes from './routes';
import errorHander from './errors/handler';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

createConnection();

const app = express();
const uploadsLocal = path.join(__dirname, '..', 'uploads');

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHander);

app.use('/uploads', express.static(uploadsLocal));

export default app;
