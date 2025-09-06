// test-backend.ts
import http from "http";
import https from "https";
import { parse } from "url";

// ✅ Change this to your backend endpoint
const API_URL = "http://localhost:5000/api/projects";

// ✅ Add your real JWT token here
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjhiNzVlM2JmYzRmNWY0NjEyYzJlY2FjIiwiZW1haWwiOiJhZG1pbkBhYmpheWludGVyaW9yLmNvbSIsImlhdCI6MTc1NzE4NjI2NiwiZXhwIjoxNzU3MjcyNjY2fQ.qpMTBVTGMYYFLS-0bcoFky82QHvmDhkUOONjC6FsioU";

// The project payload you want to test
const payload = {
  title: "Backend Debug Test",
  location: "Lagos",
  category: "Commercial",
  description: "Testing if backend duplicates",
  images: ["https://res.cloudinary.com/demo/image/upload/sample.jpg"],
};

const data = JSON.stringify(payload);

const parsedUrl = parse(API_URL);
const isHttps = parsedUrl.protocol === "https:";

const options: http.RequestOptions = {
  hostname: parsedUrl.hostname || "localhost",
  port: parsedUrl.port ? parseInt(parsedUrl.port) : (isHttps ? 443 : 80),
  path: parsedUrl.path,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(data),
    "Authorization": `Bearer ${TOKEN}`, // ✅ send token
  },
};

const client = isHttps ? https : http;

const req = client.request(options, (res) => {
  let body = "";
  res.on("data", (chunk: Buffer) => (body += chunk.toString()));
  res.on("end", () => {
    console.log("✅ Status:", res.statusCode);
    try {
      const parsed = JSON.parse(body);
      console.log("✅ Response JSON:", parsed);
    } catch {
      console.log("Raw response:", body);
    }
  });
});

req.on("error", (err: NodeJS.ErrnoException) => {
  console.error("❌ Request error:", err.message);
  console.error("👉 Full error:", err);
});

req.write(data);
req.end();
