import { Request, Response, NextFunction } from 'express';
import { verifyToken, JWTPayload } from '../config/auth.config.js';

// Extend Express Request type to include user info
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

/**
 * JWT Authentication Middleware
 * Verifies JWT token from Authorization header
 */
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Get token from Authorization header (format: "Bearer <token>")
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        error: 'Требуется авторизация',
        message: 'Токен отсутствует или неверный формат',
      });
      return;
    }

    // Extract token (remove "Bearer " prefix)
    const token = authHeader.substring(7);

    // Verify token
    const payload = verifyToken(token);

    // Attach user info to request
    req.user = payload;

    // Continue to next middleware/route handler
    next();
  } catch (error) {
    res.status(401).json({
      error: 'Требуется авторизация',
      message: error instanceof Error ? error.message : 'Токен недействителен',
    });
  }
};
