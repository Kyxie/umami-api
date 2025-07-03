import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { config } from '../config/config';

export function refererGuard(req: Request, res: Response, next: NextFunction) {
  const referer = req.get('referer') || '';
  const allowed = config.allowedReferers;
  if (!allowed.some(origin => referer.startsWith(origin))) {
    res.status(403).json({ error: 'Forbidden: Invalid referer' });
    return;
  }
  next();
}

export const umamiRateLimit = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: { error: 'Too many requests, please slow down.' }
});
