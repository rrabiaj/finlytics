import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import * as financeService from '../services/finance.service';

export const getInvoices = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const invoices = await financeService.getInvoices(req.user!.organizationId, { skip, take: limit });
    res.json(invoices);
  } catch (error) {
    next(error);
  }
};

export const createInvoice = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const invoice = await financeService.createInvoice(
      req.user!.organizationId,
      req.user!.id,
      req.body
    );
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
};

export const getExpenses = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const expenses = await financeService.getExpenses(req.user!.organizationId, { skip, take: limit });
    res.json(expenses);
  } catch (error) {
    next(error);
  }
};

export const createExpense = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const expense = await financeService.createExpense(req.user!.organizationId, req.body);
    res.status(201).json(expense);
  } catch (error) {
    next(error);
  }
};
