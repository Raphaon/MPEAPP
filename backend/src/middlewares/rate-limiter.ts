import { NextFunction, Request, Response } from 'express';

type ClientStats = {
  hits: number;
  resetAt: number;
};

const store = new Map<string, ClientStats>();
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 120;

export function rateLimiter(req: Request, res: Response, next: NextFunction) {
  const key = req.ip || req.headers['x-forwarded-for']?.toString() || 'anonymous';
  const now = Date.now();
  const current = store.get(key);

  if (!current || current.resetAt < now) {
    store.set(key, { hits: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  if (current.hits >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((current.resetAt - now) / 1000);
    res.setHeader('Retry-After', retryAfter.toString());
    return res.status(429).json({ message: 'Rate limit exceeded. Please try again later.' });
  }

  current.hits += 1;
  store.set(key, current);
  return next();
}
