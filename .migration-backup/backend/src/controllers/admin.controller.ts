import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as organizationService from '../services/organization.service';

export const getMyOrganization = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const org = await organizationService.getOrganization(req.user!.organizationId);
    res.json(org);
  } catch (error) {
    next(error);
  }
};

export const updateMyOrganization = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const org = await organizationService.updateOrganization(req.user!.organizationId, req.body);
    res.json(org);
  } catch (error) {
    next(error);
  }
};
