import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as analyticsService from '../services/analytics.service';

export const getStats = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const stats = await analyticsService.getDashboardStats(req.user!.organizationId);
    res.json(stats);
  } catch (error) {
    next(error);
  }
};
