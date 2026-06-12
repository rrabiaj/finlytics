import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { tenantContext } from '../middleware/tenant.middleware';
import * as employeeController from '../controllers/employee.controller';
import { validate } from '../middleware/validate.middleware';
import { createEmployeeSchema } from '../validators/employee.validator';

const router = Router();

router.use(authenticate, tenantContext);

router.get('/', employeeController.getEmployees);
router.post('/', validate(createEmployeeSchema), employeeController.createEmployee);

export default router;
