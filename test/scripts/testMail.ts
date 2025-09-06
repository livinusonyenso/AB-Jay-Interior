import mongoose from "mongoose";

// 1. Connect to MongoDB
const MONGO_URI =
  "mongodb+srv://ugwujalivinusekene:b5S10pK85Yj21Ruu@cluster0.vufex2m.mongodb.net/ab-jay-interior?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI);
console.log("✅ Connected to MongoDB");

// 2. Define Schema
const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    location: { type: String, required: true, trim: true, maxlength: 100 },
    category: { type: String, required: true, trim: true, maxlength: 50 },
    images: { type: [String], default: [] },
    description: { type: String, required: true, trim: true, minlength: 20, maxlength: 2000 },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

// 3. Mock Cloudinary Upload Function (optional)
async function uploadMultipleImagesToCloudinary(files: string[]) {
  console.log("🌩️ Mock uploading files to Cloudinary:", files);
  // Simulate Cloudinary response
  return files.map((url) => ({ secure_url: url }));
}

// 4. Debug function
async function runDebug() {
  try {
    // Simulate incoming request body with images
    const reqBody = {
      title: "Debug Kitchen Full",
      location: "Debug City",
      category: "Test Category",
      description: "This is a debug description that has more than 20 characters.",
      images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
    };

    console.log("📩 Incoming body:", reqBody);

    // Optionally simulate file upload
    const fileUrlsFromCloudinary = await uploadMultipleImagesToCloudinary([
      "mock_file1.jpg",
      "mock_file2.jpg",
    ]);

    console.log("🌐 Cloudinary uploaded URLs:", fileUrlsFromCloudinary);

    // Combine images from body + Cloudinary upload
    const allImages = [...reqBody.images, ...fileUrlsFromCloudinary.map((f) => f.secure_url)];

    // 5. Create project
    const newProject = new Project({
      title: reqBody.title,
      location: reqBody.location,
      category: reqBody.category,
      description: reqBody.description,
      images: allImages,
    });

    await newProject.save();
    console.log("✅ Project saved:", newProject);

    // 6. Fetch from DB
    const saved = await Project.findById(newProject._id).lean();
    console.log("📦 Project fetched from DB:", saved);

    // 7. Extra check
    //@ts-ignore
    if (!saved.images || saved.images.length === 0) {
      console.warn("⚠️ Images array is empty!");
    } else {
      //@ts-ignore
      console.log("🎉 Images saved correctly:", saved.images);
    }
  } catch (error) {
    console.error("❌ Error during debug:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
  }
}

// Run the debug function
runDebug();
