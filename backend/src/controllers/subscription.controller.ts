import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as subscriptionService from '../services/subscription.service';

export const getPlans = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const plans = await subscriptionService.getPlans();
    res.json(plans);
  } catch (error) {
    next(error);
  }
};

export const getMySubscription = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const sub = await subscriptionService.getOrganizationSubscription(req.user!.organizationId);
    res.json(sub);
  } catch (error) {
    next(error);
  }
};
