import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import { xss } from 'express-xss-sanitizer';
import helmet from 'helmet';
import hpp from 'hpp';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './middleware/logger.mjs';
// import { connectDb } from './db/database.mjs';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
global.__appdir = dirname;

dotenv.config({ path: './config/config.env' });

// await connectDb();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Rate limit exeeded',
});

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,POST',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use('/api/', limiter);

app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

if (process.env.NODE_ENV === 'development') {
  app.use(logger);
}

export { app };
