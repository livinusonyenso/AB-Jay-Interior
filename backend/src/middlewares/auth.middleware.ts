import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { Admin, IAdmin } from "../models/Admin";

export interface AuthenticatedRequest extends Request {
  admin?: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export async function authenticateAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.log("❌ No Authorization header received");
      res.status(401).json({ error: "Access token required" });
      return;
    }

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.substring(7)
      : authHeader;

    console.log("🔑 Raw token:", token);

    const decoded = verifyToken(token) as { adminId: string };
    console.log("✅ Decoded token:", decoded);

    const admin = await Admin.findById(decoded.adminId)
      .select("-passwordHash")
      .lean<IAdmin | null>();

    console.log("✅ Admin from DB:", admin);

    if (!admin) {
      res.status(401).json({ error: "Invalid token" });
      return;
    }

    req.admin = {
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      role: admin.role,
    };

    next();
  } catch (error) {
    console.error("❌ Token verification failed:", error);
    res.status(401).json({ error: "Invalid token" });
  }
}
