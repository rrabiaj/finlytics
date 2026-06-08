import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as employeeService from '../services/employee.service';

export const getEmployees = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const employees = await employeeService.getEmployees(req.user!.organizationId);
    res.json(employees);
  } catch (error) {
    next(error);
  }
};

export const createEmployee = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const employee = await employeeService.createEmployee(req.user!.organizationId, req.body);
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};
