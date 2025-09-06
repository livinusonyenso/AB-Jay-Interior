// Run with: npx tsx src/scripts/testApiFlow.ts

async function runTests() {
  const BASE_URL = "http://localhost:5000/api/projects"; // adjust if needed
  let createdId: string | null = null;
  const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjhiNzVlM2JmYzRmNWY0NjEyYzJlY2FjIiwiZW1haWwiOiJhZG1pbkBhYmpheWludGVyaW9yLmNvbSIsImlhdCI6MTc1NzE4NjI2NiwiZXhwIjoxNzU3MjcyNjY2fQ.qpMTBVTGMYYFLS-0bcoFky82QHvmDhkUOONjC6FsioU"; // put a valid token here if auth is required


  function logWithTime(step: string, data?: any) {
    const now = new Date().toISOString();
    console.log(`[${now}] ${step}`, data ?? "");
  }

  try {
    // 1️⃣ Create Project
    logWithTime("🚀 Creating project...");
    let res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbklkIjoiNjhiNzVlM2JmYzRmNWY0NjEyYzJlY2FjIiwiZW1haWwiOiJhZG1pbkBhYmpheWludGVyaW9yLmNvbSIsImlhdCI6MTc1NzE4NjI2NiwiZXhwIjoxNzU3MjcyNjY2fQ.qpMTBVTGMYYFLS-0bcoFky82QHvmDhkUOONjC6FsioU", // replace if your backend requires JWT
      },
      body: JSON.stringify({
        title: "Integration Test Project",
        location: "Lagos",
        category: "Commercial",
        description: "Testing controller + route + model",
        images: ["https://via.placeholder.com/150"], // fake image
      }),
    });

    let json = await res.json();
    logWithTime(`✅ Create response [${res.status}]`, json);
    if (!json.project || !json.project._id) throw new Error("Project creation failed");
    createdId = json.project._id;

    // 2️⃣ Get All Projects
    logWithTime("📡 Fetching all projects...");
    res = await fetch(`${BASE_URL}?limit=5&page=1`);
    json = await res.json();
    logWithTime(`✅ GetProjects [${res.status}]`, json);

    // 3️⃣ Get Single Project
    logWithTime("🔎 Fetching single project...");
    res = await fetch(`${BASE_URL}/${createdId}`);
    json = await res.json();
    logWithTime(`✅ GetProject [${res.status}]`, json);

    // 4️⃣ Update Project
    logWithTime("✏️ Updating project...");
    res = await fetch(`${BASE_URL}/${createdId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer testtoken",
      },
      body: JSON.stringify({
        title: "Updated Test Project",
        location: "Abuja",
      }),
    });
    json = await res.json();
    logWithTime(`✅ UpdateProject [${res.status}]`, json);

    // 5️⃣ Delete Project
    logWithTime("🗑 Deleting project...");
    res = await fetch(`${BASE_URL}/${createdId}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer testtoken" },
    });
    json = await res.json();
    logWithTime(`✅ DeleteProject [${res.status}]`, json);

    // 6️⃣ Confirm Deletion
    logWithTime("🔄 Confirming deletion...");
    res = await fetch(`${BASE_URL}/${createdId}`);
    json = await res.json();
    logWithTime(`✅ Confirm Get After Delete [${res.status}]`, json);
  } catch (err) {
    logWithTime("❌ Test script error", err);
  }
}

runTests();
