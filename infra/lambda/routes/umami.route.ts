import { Router } from 'express';
import { getUmamiStats } from '../controllers/umami.controller';

const umamiRouter = Router();

umamiRouter.get('/', getUmamiStats);

export default umamiRouter;
