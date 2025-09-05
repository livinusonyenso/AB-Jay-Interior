import jwt from 'jsonwebtoken';

export interface JwtPayload {
  adminId: string;
  email: string;
}

export function generateToken(payload: JwtPayload): string {
  const secret = process.env.JWT_SECRET;
  const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }

  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token: string): JwtPayload {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required');
  }

  return jwt.verify(token, secret) as JwtPayload;
}