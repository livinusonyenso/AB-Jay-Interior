import { v2 as cloudinary } from "cloudinary";
import type { Express } from "express";

// ------------------- Configure Cloudinary -------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

// ------------------- Upload a single image -------------------
export async function uploadImageToCloudinary(
  buffer: Buffer,
  filename: string,
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          public_id: `portfolio/projects/${filename}`,
          transformation: [
            { width: 1200, height: 800, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        },
        (error, result) => {
          if (error) reject(error);
          else if (result) resolve({ secure_url: result.secure_url, public_id: result.public_id });
          else reject(new Error("Upload failed"));
        },
      )
      .end(buffer);
  });
}

// ------------------- Upload multiple images -------------------
export async function uploadMultipleImagesToCloudinary(
  files: Express.Multer.File[],
): Promise<CloudinaryUploadResult[]> {
  if (!files || files.length === 0) return [];

  const uploadPromises = files.map((file) => {
    const filename = `${Date.now()}-${file.originalname}`;
    return uploadImageToCloudinary(file.buffer, filename);
  });

  return Promise.all(uploadPromises);
}

// ------------------- Delete a single image -------------------
export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}

// ------------------- Delete multiple images -------------------
export async function deleteMultipleImagesFromCloudinary(publicIds: string[]): Promise<void> {
  if (!publicIds || publicIds.length === 0) return;
  const deletePromises = publicIds.map((publicId) => deleteImageFromCloudinary(publicId));
  await Promise.all(deletePromises);
}
