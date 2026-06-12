import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as cashflowService from '../services/cashflow.service';

export const getForecast = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const forecast = await cashflowService.getForecasts(req.user!.organizationId);
    res.json(forecast);
  } catch (error) {
    next(error);
  }
};

export const getHealthScore = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const health = await cashflowService.getHealthScore(req.user!.organizationId);
    res.json(health);
  } catch (error) {
    next(error);
  }
};
