import { Request, Response } from "express"
import Contact from "../models/Contact"

// @desc   Submit a contact form
// @route  POST /api/contact
// @access Public
export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, service, message, contactMethod } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email and message are required." })
    }

    const contact = await Contact.create({
      name,
      email,
      phone,
      service,
      message,
      contactMethod,
    })

    // Optional: Send notification email here using Nodemailer/Resend/etc.

    return res.status(201).json({
      success: true,
      message: "Contact request submitted successfully",
      data: contact,
    })
  } catch (error: any) {
    console.error("❌ Error submitting contact:", error.message)
    return res.status(500).json({ success: false, message: "Server error" })
  }
}

// @desc   Get all contacts (admin only)
// @route  GET /api/contact
// @access Private/Admin
export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    return res.json({ success: true, data: contacts })
  } catch (error: any) {
    console.error("❌ Error fetching contacts:", error.message)
    return res.status(500).json({ success: false, message: "Server error" })
  }
}
