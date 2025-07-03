import { RequestHandler } from 'express';
import rateLimit from 'express-rate-limit';
import { config } from '../config/config';

export const refererGuard: RequestHandler = (req, res, next) => {
  const referer = req.get('referer') ?? '';
  if (!config.allowedReferers.some((origin) => referer.startsWith(origin))) {
    res.status(403).json({ error: 'Forbidden: Invalid referer' });
    return;
  }
  next();
};

export const umamiRateLimit = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: { error: 'Too many requests, please slow down.' },
});

const allowedOrigins = (process.env.ALLOWED_ORIGIN || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

export const corsHandler: RequestHandler = (req, res, next) => {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

export const preflightHandler: RequestHandler = (req, res) => {
  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).end();
};
