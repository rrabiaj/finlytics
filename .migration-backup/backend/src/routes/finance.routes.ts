import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { tenantContext } from '../middleware/tenant.middleware';
import { auditLog } from '../middleware/audit.middleware';
import * as financeController from '../controllers/finance.controller';
import { validate } from '../middleware/validate.middleware';
import { createInvoiceSchema, createExpenseSchema } from '../validators/finance.validator';

const router = Router();

router.use(authenticate, tenantContext);

// Invoice routes
router.get('/invoices', financeController.getInvoices);
router.post('/invoices', validate(createInvoiceSchema), auditLog('CREATE_INVOICE', 'Invoice'), financeController.createInvoice);

// Expense routes
router.get('/expenses', financeController.getExpenses);
router.post('/expenses', validate(createExpenseSchema), auditLog('CREATE_EXPENSE', 'Expense'), financeController.createExpense);

export default router;
