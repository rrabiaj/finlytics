import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import passport from 'passport';
import routes from './routes';
import webhookRoutes from './routes/webhook.routes';
import { setupPassport } from './config/passport';
import { apiLimiter } from './middleware/rate-limit.middleware';
import { config } from './config';

const app: Application = express();

// Passport setup
setupPassport();

// Middleware
app.use(helmet());
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
}));
app.use(compression());

// Webhooks (must be before body parsers)
app.use('/api/webhooks', express.raw({ type: 'application/json' }), webhookRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use('/api', apiLimiter);

// Routes
app.use('/api', routes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Finlytics API is running' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

export default app;
