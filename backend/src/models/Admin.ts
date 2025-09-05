import mongoose, { Document, Schema, Types } from "mongoose";
export interface IAdmin extends Document {
  _id: Types.ObjectId;   // 👈 explicitly typed
  email: string;
  passwordHash: string;
  name: string;
  role: "admin" | "super-admin";
  createdAt: Date;
  updatedAt: Date;
}
const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin', 'super-admin'],
      default: 'admin',
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster lookups
adminSchema.index({ email: 1 });

export const Admin = mongoose.model<IAdmin>('Admin', adminSchema);