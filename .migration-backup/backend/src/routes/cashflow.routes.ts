import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { tenantContext } from '../middleware/tenant.middleware';
import * as cashflowController from '../controllers/cashflow.controller';

const router = Router();

router.use(authenticate, tenantContext);

router.get('/forecast', cashflowController.getForecast);
router.get('/health', cashflowController.getHealthScore);

export default router;
