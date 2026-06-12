import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { tenantContext } from '../middleware/tenant.middleware';
import * as projectController from '../controllers/project.controller';
import { validate } from '../middleware/validate.middleware';
import { createProjectSchema } from '../validators/project.validator';

const router = Router();

router.use(authenticate, tenantContext);

router.get('/', projectController.getProjects);
router.post('/', validate(createProjectSchema), projectController.createProject);

export default router;
