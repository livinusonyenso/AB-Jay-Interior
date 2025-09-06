import fetch from "node-fetch"
import FormData from "form-data"
import fs from "fs"

async function runTest() {
  try {
    const form = new FormData()
    form.append("title", "Cloudinary Debug Test")
    form.append("location", "Lagos")
    form.append("category", "Commercial")
    form.append("description", "Testing Cloudinary timing issue")

    // Replace with a real local image path
    form.append("images", fs.createReadStream("src/assets/test.jpg"))

    console.log("🚀 Sending request...")

    const response = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      headers: {
        Authorization: `Bearer YOUR_TOKEN_HERE`,
        // ⚠️ do NOT spread form.getHeaders() here – fetch handles it
        ...form.getHeaders(),
      },
      body: form,
    })

    console.log("✅ Status:", response.status)

    const data = await response.json().catch(() => null)
    console.log("✅ Response JSON:", data)
  } catch (error: any) {
    console.error("❌ Request error:", error.message)
  }
}

runTest()
