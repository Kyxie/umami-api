import express from 'express';
import umamiRouter from './routes/umami.route';
import scriptRouter from './routes/script.route';
import { refererGuard, umamiRateLimit, corsHandler, preflightHandler } from './middleware';

const app = express();

app.use(corsHandler);
app.options('/', preflightHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(refererGuard);
}

app.use('/umami', umamiRateLimit, umamiRouter);
app.use('/', scriptRouter);

export default app;
