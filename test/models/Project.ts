import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  location: string;
  category: string;
  images: string[]; // ✅ multiple image URLs
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    images: {
      type: [String], // ✅ clean & explicit way to define an array of strings
      default: [],    // ✅ ensures it won’t be undefined
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,   // ✅ ensures at least 20 characters as per your rule
      maxlength: 2000,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for filtering and sorting
projectSchema.index({ category: 1 });
projectSchema.index({ location: 1 });
projectSchema.index({ createdAt: -1 });

export const Project = mongoose.model<IProject>("Project", projectSchema);
