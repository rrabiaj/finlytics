import { Response, NextFunction } from 'express';
import { AuthRequest } from '../types';
import * as crmService from '../services/crm.service';

export const getCustomers = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const customers = await crmService.getCustomers(req.user!.organizationId, { skip, take: limit });
    // Note: crmService needs to be updated to accept skip/take
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

export const createCustomer = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const customer = await crmService.createCustomer(req.user!.organizationId, req.body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

export const getCustomerById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const customer = await crmService.getCustomerById(req.user!.organizationId, req.params.id);
    if (!customer) return res.status(404).json({ message: 'Customer not found' });
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const updateCustomer = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await crmService.updateCustomer(req.user!.organizationId, req.params.id, req.body);
    res.json({ message: 'Customer updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteCustomer = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await crmService.deleteCustomer(req.user!.organizationId, req.params.id);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const getLeads = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const leads = await crmService.getLeads(req.user!.organizationId, { skip, take: limit });
    res.json(leads);
  } catch (error) {
    next(error);
  }
};

export const createLead = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const lead = await crmService.createLead(req.user!.organizationId, req.body);
    res.status(201).json(lead);
  } catch (error) {
    next(error);
  }
};
