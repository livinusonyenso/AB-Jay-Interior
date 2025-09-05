import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export async function uploadImageToCloudinary(
  buffer: Buffer,
  filename: string
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        resource_type: 'image',
        public_id: `portfolio/projects/${filename}`,
        transformation: [
          { width: 1200, height: 800, crop: 'limit' },
          { quality: 'auto' },
          { format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        } else {
          reject(new Error('Upload failed'));
        }
      }
    ).end(buffer);
  });
}

export async function deleteImageFromCloudinary(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}