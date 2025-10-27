import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import { json } from 'body-parser';
import { rateLimiter } from './middlewares/rate-limiter';
import { apiRouter } from './core/router';
import { errorHandler } from './middlewares/error-handler';

const app = express();

app.use(helmet());
app.use(cors());
app.use(json({ limit: '10mb' }));
app.use(morgan('dev'));
app.use(rateLimiter);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'brethren-api', timestamp: new Date().toISOString() });
});

app.use('/api', apiRouter);

app.use(errorHandler);

export default app;
