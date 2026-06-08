import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { authorize } from '../middleware/rbac.middleware';
import * as adminController from '../controllers/admin.controller';
import { validate } from '../middleware/validate.middleware';
import { updateOrganizationSchema } from '../validators/admin.validator';

const router = Router();

router.use(authenticate, authorize(['ADMIN']));

router.get('/organization', adminController.getMyOrganization);
router.put('/organization', validate(updateOrganizationSchema), adminController.updateMyOrganization);

export default router;
