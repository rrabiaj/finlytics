import { Router } from 'express';
import authRoutes from './auth.routes';
import crmRoutes from './crm.routes';
import financeRoutes from './finance.routes';
import cashflowRoutes from './cashflow.routes';
import employeeRoutes from './employees.routes';
import projectRoutes from './projects.routes';
import aiRoutes from './ai.routes';
import analyticsRoutes from './analytics.routes';
import subscriptionRoutes from './subscriptions.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/crm', crmRoutes);
router.use('/finance', financeRoutes);
router.use('/cashflow', cashflowRoutes);
router.use('/employees', employeeRoutes);
router.use('/projects', projectRoutes);
router.use('/ai', aiRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/admin', adminRoutes);

export default router;
