import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  location: string;
  category: string;
  imageUrl?: string;
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
    imageUrl: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
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

export const Project = mongoose.model<IProject>('Project', projectSchema);