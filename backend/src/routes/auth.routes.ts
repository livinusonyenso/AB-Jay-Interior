import { Router } from 'express';
import { login, getProfile } from '../controllers/auth.controller';
import { validateBody } from '../middlewares/validation.middleware';
import { authenticateAdmin } from '../middlewares/auth.middleware';
import { loginSchema } from '../validators/auth.validator';

const router = Router();

/**
 * @route POST /api/auth/login
 * @desc Admin login
 * @access Public
 */
router.post('/login', validateBody(loginSchema), login);

/**
 * @route GET /api/auth/me
 * @desc Get admin profile
 * @access Private (Admin)
 */
router.get('/me', authenticateAdmin, getProfile);

export default router;