import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

/**
 * Middleware to ensure the request is scoped to a specific tenant (organization).
 * It extracts the organizationId from the authenticated user and attaches it to the request.
 */
export const tenantContext = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.organizationId) {
    return res.status(401).json({ message: 'Organization context missing' });
  }

  // Tenant ID is already in req.user from auth middleware
  // This middleware can be used to perform additional checks if needed
  
  next();
};

/**
 * Utility to filter Prisma queries by organizationId automatically.
 * This can be used in services.
 */
export const withTenant = (organizationId: string, query: any = {}) => {
  return {
    ...query,
    where: {
      ...query.where,
      organizationId,
    },
  };
};
