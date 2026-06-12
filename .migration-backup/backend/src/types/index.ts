import { Request } from 'express';

export interface UserPayload {
  id: string;
  organizationId: string;
  role: 'ADMIN' | 'MANAGER' | 'USER' | 'VIEWER';
}

export interface AuthRequest extends Request {
  user?: UserPayload;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  skip?: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}

export type LeadStatus = 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';

export interface StripeEventMetadata {
  organizationId: string;
}
