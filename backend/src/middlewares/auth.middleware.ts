import jwt, { SignOptions } from "jsonwebtoken";

export interface JwtPayload {
  adminId: string;
  email: string;
}

// Generate a JWT
export function generateToken(payload: JwtPayload): string {
  const secret = process.env.JWT_SECRET;
  const expiresIn = (process.env.JWT_EXPIRES_IN || "1d") as SignOptions["expiresIn"];

  if (!secret) {
    throw new Error("JWT_SECRET environment variable is required");
  }

  return jwt.sign(payload, secret, { expiresIn });
}

// Verify a JWT
export function verifyToken(token: string): JwtPayload {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET environment variable is required");
  }

  const decoded = jwt.verify(token, secret);
  return decoded as JwtPayload;
}
