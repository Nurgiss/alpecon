import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

// Admin role enum
export enum UserRole {
  ADMIN = 'admin',
}

// Validate required environment variables
function validateEnv(): void {
  const requiredVars = ['JWT_SECRET', 'ADMIN_USERNAME', 'ADMIN_PASSWORD'];
  const missing = requiredVars.filter((varName) => !process.env[varName]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please set these variables in your .env file before starting the server.'
    );
  }

  // Warn about default values in production
  if (process.env.NODE_ENV === 'production') {
    if (process.env.JWT_SECRET === 'your-secret-key-change-in-production') {
      throw new Error('JWT_SECRET must be changed in production!');
    }
    if (process.env.ADMIN_PASSWORD === 'admin') {
      throw new Error('ADMIN_PASSWORD must be changed in production!');
    }
  }
}

// Validate on module load
validateEnv();

export const AUTH_CONFIG = {
  // JWT configuration (no fallbacks - must be set in .env)
  jwtSecret: process.env.JWT_SECRET as Secret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',

  // Admin credentials (no fallbacks - must be set in .env)
  adminUsername: process.env.ADMIN_USERNAME as string,
  adminPassword: process.env.ADMIN_PASSWORD as string,
};

export interface JWTPayload {
  username: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}

export const generateToken = (username: string): string => {
  const payload: JWTPayload = {
    username,
    role: UserRole.ADMIN,
  };

  return jwt.sign(payload, AUTH_CONFIG.jwtSecret, {
    expiresIn: AUTH_CONFIG.jwtExpiresIn,
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): JWTPayload => {
  try {
    return jwt.verify(token, AUTH_CONFIG.jwtSecret) as JWTPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};

/**
 * Verify password against stored password (supports both plain text and bcrypt hash)
 * In development, plain text passwords are supported for convenience
 * In production, only bcrypt hashes should be used
 */
export const verifyPassword = async (
  inputPassword: string,
  storedPassword: string
): Promise<boolean> => {
  // Check if stored password is a bcrypt hash (starts with $2a$, $2b$, or $2y$)
    console.log('Is stored password a bcrypt hash?', storedPassword);
  const isBcryptHash = /^\$2[aby]\$/.test(storedPassword);
  console.warn('Is stored password a bcrypt hash?', isBcryptHash);

  if (isBcryptHash) {
    // Use bcrypt comparison for hashed passwords
    return bcrypt.compare(inputPassword, storedPassword);
  } else {
    // Plain text comparison (only for development)
    if (process.env.NODE_ENV === 'production') {
      console.warn('⚠️  WARNING: Plain text password detected in production! Use bcrypt hashed passwords.');
    }
    return inputPassword === storedPassword;
  }
};
