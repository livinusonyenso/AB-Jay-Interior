import multer from "multer";
import { Request } from "express";

// Extend Express Request to include multer's file(s)
export interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?: Express.Multer.File[];
}

// ------------------- Multer Memory Storage -------------------
const storage = multer.memoryStorage();

// ------------------- File Filter -------------------
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

// ------------------- Multer Configuration -------------------
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
  },
});

// ------------------- Export Middlewares -------------------
// Single image upload
export const uploadImage = upload.single("image");

// Multiple images upload (max 10)
export const uploadMultipleImages = upload.array("images", 10);

// ------------------- Optional: Error Handling Middleware -------------------
export const multerErrorHandler = (
  err: any,
  req: Request,
  res: any,
  next: any
) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  } else if (err) {
    return res.status(400).json({ error: err.message || "Upload error" });
  }
  next();
};
