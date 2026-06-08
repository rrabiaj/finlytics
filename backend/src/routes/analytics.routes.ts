import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { tenantContext } from '../middleware/tenant.middleware';
import * as analyticsController from '../controllers/analytics.controller';

const router = Router();

router.use(authenticate, tenantContext);

router.get('/stats', analyticsController.getStats);

export default router;
