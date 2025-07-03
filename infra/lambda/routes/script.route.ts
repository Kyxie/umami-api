import { Router } from 'express';
import { serveScript } from '../controllers/script.controller';

const router = Router();
router.get('/script.js', serveScript);
export default router;
