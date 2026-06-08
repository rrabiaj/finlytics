import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { tenantContext } from '../middleware/tenant.middleware';
import * as subscriptionController from '../controllers/subscription.controller';

const router = Router();

router.get('/plans', subscriptionController.getPlans);

router.use(authenticate, tenantContext);
router.get('/my', subscriptionController.getMySubscription);

export default router;
