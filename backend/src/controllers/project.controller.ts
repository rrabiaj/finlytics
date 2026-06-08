import { Response, NextFunction } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import * as projectService from '../services/project.service';

export const getProjects = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const projects = await projectService.getProjects(req.user!.organizationId);
    res.json(projects);
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const project = await projectService.createProject(req.user!.organizationId, req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};
