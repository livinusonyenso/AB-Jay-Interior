import { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';
import { uploadImageToCloudinary } from '../services/cloudinary.service';

export async function getProjects(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { page = 1, limit = 10, category, location } = req.query as any;
    
    const filter: any = {};
    if (category) filter.category = new RegExp(category, 'i');
    if (location) filter.location = new RegExp(location, 'i');

    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      Project.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Project.countDocuments(filter),
    ]);

    res.json({
      projects,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function getProject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    
    const project = await Project.findById(id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json({ project });
  } catch (error) {
    next(error);
  }
}

export async function createProject(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    let { title, location, category, imageUrl, description } = req.body;

    // Handle image upload if file is provided
    if (req.file && process.env.CLOUDINARY_CLOUD_NAME) {
      try {
        const uploadResult = await uploadImageToCloudinary(
          req.file.buffer,
          `${Date.now()}-${req.file.originalname}`
        );
        imageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
        // Continue without image if upload fails
      }
    }

    const project = new Project({
      title,
      location,
      category,
      imageUrl,
      description,
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProject(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    let updateData = { ...req.body };

    // Handle image upload if file is provided
    if (req.file && process.env.CLOUDINARY_CLOUD_NAME) {
      try {
        const uploadResult = await uploadImageToCloudinary(
          req.file.buffer,
          `${Date.now()}-${req.file.originalname}`
        );
        updateData.imageUrl = uploadResult.secure_url;
      } catch (uploadError) {
        console.error('Image upload failed:', uploadError);
      }
    }

    const project = await Project.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      project,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteProject(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
}