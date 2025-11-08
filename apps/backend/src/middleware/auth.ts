import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  userId?: string;
  tenantId?: string;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  // In a real app, verify JWT token here
  // For now, we'll extract userId from a simple token format
  try {
    // Simplified auth - in production, use proper JWT verification
    const decoded = Buffer.from(token, 'base64').toString('utf-8');
    const [userId, tenantId] = decoded.split(':');
    req.userId = userId;
    req.tenantId = tenantId;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};

export const tenantMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const tenantId = req.headers['x-tenant-id'] as string;
  if (tenantId) {
    req.tenantId = tenantId;
  }
  next();
};
