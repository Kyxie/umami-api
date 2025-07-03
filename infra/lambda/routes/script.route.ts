import { Router } from 'express';
import { serveScript } from '../controllers/script.controller';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send('OK: Lambda API is reachable');
});
router.get('/script.js', serveScript);

export default router;
