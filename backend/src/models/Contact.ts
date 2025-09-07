import mongoose, { Schema, Document } from "mongoose"

export interface IContact extends Document {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
  contactMethod: string
  createdAt: Date
}

const ContactSchema: Schema = new Schema<IContact>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    service: { type: String },
    message: { type: String, required: true },
    contactMethod: { type: String, enum: ["email", "phone", "whatsapp"], default: "email" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

export default mongoose.model<IContact>("Contact", ContactSchema)
