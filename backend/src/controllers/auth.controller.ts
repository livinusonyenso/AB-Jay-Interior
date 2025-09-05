import { Request, Response, NextFunction } from 'express';
import { Admin } from '../models/Admin';
import { comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email }).select('+passwordHash');
    if (!admin) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Verify password
    const isValidPassword = await comparePassword(password, admin.passwordHash);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // Generate JWT token
    const token = generateToken({
      adminId: admin._id.toString(),
      email: admin.email,
    });

    res.json({
      success: true,
      token,
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getProfile(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const admin = await Admin.findById(req.admin?.id).select('-passwordHash');
    
    if (!admin) {
      res.status(404).json({ error: 'Admin not found' });
      return;
    }

    res.json({
      admin: {
        id: admin._id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
        createdAt: admin.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
}