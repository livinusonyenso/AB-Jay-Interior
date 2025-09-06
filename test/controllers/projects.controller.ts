import type { Request, Response, NextFunction } from "express";
import { Project } from "../models/Project";
import type { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { uploadMultipleImagesToCloudinary } from "../services/cloudinary.service";

// ================== GET PROJECTS ==================
export async function getProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { category, location } = req.query;

    const filter: any = {};
    if (category) filter.category = new RegExp(category as string, "i");
    if (location) filter.location = new RegExp(location as string, "i");

    const skip = (page - 1) * limit;

    const [projects, total] = await Promise.all([
      Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Project.countDocuments(filter),
    ]);

    res.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
}

// ================== GET SINGLE PROJECT ==================
export async function getProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);
     //@ts-ignore
    if (!project) return res.status(404).json({ error: "Project not found" });

    res.json({ project });
  } catch (error) {
    next(error);
  }
}

// ================== CREATE PROJECT ==================
export async function createProject(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const { title, location, category, description } = req.body;

    let images: string[] = [];

    // If files are uploaded, send to Cloudinary
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const uploadResults = await uploadMultipleImagesToCloudinary(req.files);
      images = uploadResults.map((r) => r.secure_url);
    } else if (req.body.images) {
      // Fallback to images from body
      if (Array.isArray(req.body.images)) images = req.body.images;
      else if (typeof req.body.images === "string") {
        try { images = JSON.parse(req.body.images); } catch { images = [req.body.images]; }
      }
    }

    const project = new Project({
      title,
      location,
      category,
      description,
      images,
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    next(error);
  }
}

// ================== UPDATE PROJECT ==================
export async function updateProject(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const updateData: any = { ...req.body };

    // Parse images from body
    if (req.body.images) {
      if (Array.isArray(req.body.images)) updateData.images = req.body.images;
      else if (typeof req.body.images === "string") {
        try { updateData.images = JSON.parse(req.body.images); }
        catch { updateData.images = [req.body.images]; }
      }
    }

    // Upload new files to Cloudinary if present
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const uploadResults = await uploadMultipleImagesToCloudinary(req.files);
      const newImages = uploadResults.map((r) => r.secure_url);
      updateData.images = newImages; // Replace all existing images
    }

    const project = await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    //@ts-ignore
    if (!project) return res.status(404).json({ error: "Project not found" });

    res.json({ success: true, message: "Project updated successfully", project });
  } catch (error) {
    next(error);
  }
}

// ================== DELETE PROJECT ==================
export async function deleteProject(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);
     //@ts-ignore
    if (!project) return res.status(404).json({ error: "Project not found" });

    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    next(error);
  }
}
