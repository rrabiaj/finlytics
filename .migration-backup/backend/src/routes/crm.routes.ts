import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { tenantContext } from '../middleware/tenant.middleware';
import { auditLog } from '../middleware/audit.middleware';
import * as crmController from '../controllers/crm.controller';
import { validate } from '../middleware/validate.middleware';
import { createCustomerSchema, createLeadSchema } from '../validators/crm.validator';

const router = Router();

router.use(authenticate, tenantContext);

// Customer routes
router.get('/customers', crmController.getCustomers);
router.post('/customers', validate(createCustomerSchema), auditLog('CREATE_CUSTOMER', 'Customer'), crmController.createCustomer);
router.get('/customers/:id', crmController.getCustomerById);
router.put('/customers/:id', validate(createCustomerSchema), auditLog('UPDATE_CUSTOMER', 'Customer'), crmController.updateCustomer);
router.delete('/customers/:id', auditLog('DELETE_CUSTOMER', 'Customer'), crmController.deleteCustomer);

// Lead routes
router.get('/leads', crmController.getLeads);
router.post('/leads', validate(createLeadSchema), auditLog('CREATE_LEAD', 'Lead'), crmController.createLead);

export default router;
