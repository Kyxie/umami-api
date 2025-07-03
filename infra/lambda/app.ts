import express from 'express';
import umamiRouter from './routes/umami.route';
import { refererGuard, umamiRateLimit } from './middleware';

const app = express();
if (process.env.NODE_ENV === 'production') {
    app.use(refererGuard);
}
app.use('/umami', umamiRateLimit);
app.use('/umami', umamiRouter);

export default app;