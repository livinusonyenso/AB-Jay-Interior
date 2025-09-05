import { Router } from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projects.controller';
import { validateBody, validateQuery } from '../middlewares/validation.middleware';
import { authenticateAdmin } from '../middlewares/auth.middleware';
import { uploadImage } from '../middlewares/upload.middleware';
import {
  createProjectSchema,
  updateProjectSchema,
  projectQuerySchema,
} from '../validators/project.validator';

const router = Router();

/**
 * @route GET /api/projects
 * @desc Get all projects with optional filtering and pagination
 * @access Public
 */
router.get('/', validateQuery(projectQuerySchema), getProjects);

/**
 * @route GET /api/projects/:id
 * @desc Get project by ID
 * @access Public
 */
router.get('/:id', getProject);

/**
 * @route POST /api/projects
 * @desc Create new project
 * @access Private (Admin)
 */
router.post(
  '/',
  authenticateAdmin,
  uploadImage.single('image'),
  validateBody(createProjectSchema),
  createProject
);

/**
 * @route PUT /api/projects/:id
 * @desc Update project
 * @access Private (Admin)
 */
router.put(
  '/:id',
  authenticateAdmin,
  uploadImage.single('image'),
  validateBody(updateProjectSchema),
  updateProject
);

/**
 * @route DELETE /api/projects/:id
 * @desc Delete project
 * @access Private (Admin)
 */
router.delete('/:id', authenticateAdmin, deleteProject);

export default router;