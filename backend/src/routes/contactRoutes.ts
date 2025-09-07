import { Router } from "express"
import { submitContact, getContacts } from "../controllers/contactController"

const router = Router()

// Public: submit a contact form
router.post("/", submitContact)

// Admin: view all contacts
router.get("/", getContacts)

export default router
