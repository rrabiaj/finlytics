import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
import prisma from '../config/prisma';

export const auditLog = (action: string, entityType: string) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    const originalSend = res.send;

    res.send = function (body: any) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        // Log success actions
        const organizationId = req.user?.organizationId;
        const userId = req.user?.id;

        if (organizationId) {
          prisma.auditLog.create({
            data: {
              action,
              entityType,
              entityId: req.params.id || null,
              userId,
              organizationId,
              details: {
                method: req.method,
                path: req.path,
                params: req.params,
                query: req.query,
                // Avoid logging sensitive body data if needed
              },
            },
          }).catch(err => console.error('Audit log failed:', err));
        }
      }
      return originalSend.call(this, body);
    };

    next();
  };
};
