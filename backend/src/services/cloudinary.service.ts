import { v2 as cloudinary } from "cloudinary"
import type { Express } from "express"
import dotenv from "dotenv"

dotenv.config() // Load .env variables

// ------------------- Configure Cloudinary -------------------
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

console.log(" Cloudinary config check:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: !!process.env.CLOUDINARY_API_SECRET,
})

// ------------------- Types -------------------
export interface CloudinaryUploadResult {
  secure_url: string
  public_id: string
}

// ------------------- Upload a single image -------------------
export async function uploadImageToCloudinary(buffer: Buffer, filename: string): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          public_id: `portfolio/projects/${filename}`,
          transformation: [{ width: 1200, height: 800, crop: "limit" }, { quality: "auto" }, { fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) {
            console.error(" Cloudinary upload error:", {
              message: error.message,
              http_code: error.http_code,
              error: error,
            })
            return reject(error)
          }
          if (!result) return reject(new Error("Upload failed: no result returned"))
          resolve({ secure_url: result.secure_url, public_id: result.public_id })
        },
      )
      .end(buffer)
  })
}

// ------------------- Upload multiple images -------------------
export async function uploadMultipleImagesToCloudinary(
  files: Express.Multer.File[],
): Promise<CloudinaryUploadResult[]> {
  if (!files || files.length === 0) return []

  console.log(" uploadMultipleImagesToCloudinary - Processing files:", files.length)
  console.log(
    " Files details:",
    files.map((f) => ({
      name: f.originalname,
      size: f.size,
      mimetype: f.mimetype,
      hasBuffer: !!f.buffer,
    })),
  )

  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error(
      "Missing Cloudinary configuration. Please check CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET environment variables.",
    )
  }

  const results: CloudinaryUploadResult[] = []
  const errors: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (!file) {
      console.log(` Skipping undefined file at index ${i}`)
      continue
    }

    if (!file.buffer) {
      const errorMsg = `File ${file.originalname} has no buffer`
      console.error(` ${errorMsg}`)
      errors.push(errorMsg)
      continue
    }

    if (file.size > 5 * 1024 * 1024) {
      const errorMsg = `File ${file.originalname} exceeds 5MB limit (${Math.round(file.size / 1024 / 1024)}MB)`
      console.error(` ${errorMsg}`)
      errors.push(errorMsg)
      continue
    }

    try {
      console.log(
        ` Uploading file ${i + 1}/${files.length}: ${file.originalname} (${Math.round(file.size / 1024)}KB)`,
      )
      const filename = `${Date.now()}-${i}-${file.originalname.replace(/[^a-zA-Z0-9.-]/g, "_")}`
      const result = await uploadImageToCloudinary(file.buffer!, filename)
      results.push(result)
      console.log(` File ${i + 1} uploaded successfully:`, result.secure_url)

      if (i < files.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    } catch (error) {
      let errorMsg = `Failed to upload ${file.originalname}`
      if (error instanceof Error) {
        errorMsg += `: ${error.message}`
        console.error(` File ${i + 1} upload failed - Full error:`, error)
      } else {
        errorMsg += `: Unknown error`
        console.error(` File ${i + 1} upload failed - Unknown error:`, error)
      }
      errors.push(errorMsg)
    }
  }

  console.log(` Upload summary: ${results.length} successful, ${errors.length} failed`)

  if (errors.length > 0) {
    if (results.length > 0) {
      console.warn(` Partial upload success: ${results.length} files uploaded, ${errors.length} failed`)
      console.warn(` Failed files: ${errors.join(", ")}`)
    } else {
      throw new Error(`All image uploads failed: ${errors.join(", ")}`)
    }
  }

  return results
}

// ------------------- Delete a single image -------------------
export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  if (!publicId) return
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" })
    console.log(` Deleted image: ${publicId}`)
  } catch (error) {
    console.error(` Failed to delete image ${publicId}:`, error)
  }
}

// ------------------- Delete multiple images -------------------
export async function deleteMultipleImagesFromCloudinary(publicIds: string[]): Promise<void> {
  if (!publicIds || publicIds.length === 0) return
  await Promise.all(publicIds.map((id) => deleteImageFromCloudinary(id)))
}
