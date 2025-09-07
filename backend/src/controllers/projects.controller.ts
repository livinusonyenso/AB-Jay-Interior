import type { Request, Response, NextFunction } from "express"
import { Project } from "../models/Project"
import type { AuthenticatedRequest } from "../middlewares/auth.middleware"
import { uploadMultipleImagesToCloudinary } from "../services/cloudinary.service"

// ================== GET PROJECTS ==================
export async function getProjects(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const { category, location } = req.query

    const filter: Record<string, unknown> = {}
    if (category) filter.category = new RegExp(category as string, "i")
    if (location) filter.location = new RegExp(location as string, "i")

    const skip = (page - 1) * limit

    const [projects, total] = await Promise.all([
      Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Project.countDocuments(filter),
    ])

    res.json({
      projects,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    next(error)
  }
}

// ================== GET SINGLE PROJECT ==================
export async function getProject(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params
    const project = await Project.findById(id)
    if (!project) {
      res.status(404).json({ error: "Project not found" })
      return
    }

    res.json({ project })
  } catch (error) {
    next(error)
  }
}

// ================== CREATE PROJECT ==================
function logWithTime(message: string, data?: any) {
  const now = new Date().toISOString();
  if (data !== undefined) {
    console.log(`[${now}] ${message}`, data);
  } else {
    console.log(`[${now}] ${message}`);
  }
}

export async function createProject(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    logWithTime("📥 Incoming createProject request");
    logWithTime("📝 Body:", req.body);
    logWithTime(
      "📎 Files:",
      req.files ? (req.files as Express.Multer.File[]).map(f => f.originalname) : "none"
    );

    const { title, location, category, description } = req.body;
    const files = req.files as Express.Multer.File[] | undefined;

    // --- Validation ---
    if (!title || !location || !category || !description) {
      logWithTime("⚠️ Validation failed: missing required fields");
      res.status(400).json({ error: "Validation failed" });
      return;
    }

    let images: string[] = [];

    // --- Handle file uploads ---
    if (files && files.length > 0) {
      logWithTime("📤 Uploading files to Cloudinary", files.map(f => f.originalname));
      try {
        const uploadResults = await uploadMultipleImagesToCloudinary(files);
        images = uploadResults.map((r) => r.secure_url);
        logWithTime("✅ Cloudinary upload success", images);
      } catch (err) {
        logWithTime("❌ Cloudinary upload failed", err);
        res.status(500).json({ error: "Image upload failed" });
        return;
      }
    } else if (req.body.images) {
      logWithTime("🖼 Using images from request body");
      if (Array.isArray(req.body.images)) images = req.body.images;
      else if (typeof req.body.images === "string") {
        try {
          images = JSON.parse(req.body.images);
        } catch {
          images = [req.body.images];
        }
      }
    }

    // --- Validate images after processing ---
    if (images.length === 0) {
      logWithTime("⚠️ Skipping save: no valid images provided");
      res.status(400).json({ error: "No images provided, project not saved" });
      return;
    }

    // 🚨 Prevent saving if files were uploaded but images ended up empty
    if (files && files.length > 0 && images.length === 0) {
      logWithTime("⚠️ Skipping save: images empty after upload");
      res.status(400).json({ error: "Image upload failed, project not saved" });
      return;
    }

    logWithTime("💾 Preparing to save project with images", images);

    const project = new Project({
      title,
      location,
      category,
      description,
      images,
    });

    logWithTime("📡 Saving project to DB...");
    await project.save();
    logWithTime("✅ Project saved", project._id);

    res.status(201).json({ success: true, project });
  } catch (error) {
    logWithTime("❌ createProject - Unexpected error", error);
    next(error);
  }
}


// ================== UPDATE PROJECT ==================
export async function updateProject(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params
    const updateData: Record<string, unknown> = { ...req.body }
    const files = req.files as Express.Multer.File[] | undefined

    if (req.body.images) {
      if (Array.isArray(req.body.images)) {
        updateData.images = req.body.images
      } else if (typeof req.body.images === "string") {
        try {
          updateData.images = JSON.parse(req.body.images)
        } catch {
          updateData.images = [req.body.images]
        }
      }
    }

    if (files && files.length > 0) {
      const uploadResults = await uploadMultipleImagesToCloudinary(files)
      updateData.images = uploadResults.map((r) => r.secure_url)
    }

    const project = await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    if (!project) {
      res.status(404).json({ error: "Project not found" })
      return
    }

    res.json({ success: true, message: "Project updated successfully", project })
  } catch (error) {
    next(error)
  }
}

// ================== DELETE PROJECT ==================
export async function deleteProject(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    const { id } = req.params
    const project = await Project.findByIdAndDelete(id)
    if (!project) {
      res.status(404).json({ error: "Project not found" })
      return
    }

    res.json({ success: true, message: "Project deleted successfully" })
  } catch (error) {
    next(error)
  }
}
