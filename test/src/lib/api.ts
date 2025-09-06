import { LoginResponse, MeResponse, ProjectFormData } from "../types";

// ✅ Base URL for backend
const API_BASE_URL = "http://localhost:5000/api";

// Token management
export const tokenStorage = {
  get: () => {
    const token = localStorage.getItem("adminToken");
    console.log(" tokenStorage.get:", token);
    return token;
  },
  set: (token: string) => {
    console.log(" tokenStorage.set →", token);
    localStorage.setItem("adminToken", token);
  },
  remove: () => {
    console.log(" tokenStorage.remove");
    localStorage.removeItem("adminToken");
  },
};

// Generic request wrapper
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = tokenStorage.get();

  console.log("==============================");
  console.log(" API Request →", {
    url: `${API_BASE_URL}${endpoint}`,
    options,
    token,
  });
  console.log("==============================");

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  console.log(" API Response status:", response.status);

  if (!response.ok) {
    if (response.status === 401) {
      console.warn(
        " 401 Unauthorized → clearing token & redirecting to /login"
      );
      tokenStorage.remove();
      window.location.href = "/login";
    }
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();
  console.log(" API Response JSON:", json);

  return json;
}

// Auth API
export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    console.log(" authAPI.login →", { email, password });

    return apiRequest<LoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  },

  me: async (): Promise<MeResponse> => {
    console.log(" authAPI.me");
    return apiRequest<MeResponse>("/auth/me");
  },
};

// Projects API
export const projectsAPI = {
  getAll: async () => apiRequest<{ projects: any[] }>("/projects"),
  getById: async (id: string) =>
    apiRequest<{ project: any }>(`/projects/${id}`),

  // ✅ Create project with FormData (supports multiple images)
  create: async (data: ProjectFormData, files?: File[]) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      // @ts-ignore
      formData.append(key, value);
    });
    files?.forEach((file) => formData.append("images", file));

    const token = tokenStorage.get();
    const res = await fetch(`${API_BASE_URL}/projects`, {
      method: "POST",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        // DO NOT set Content-Type; browser sets automatically for FormData
      },
      body: formData,
    });

    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json();
  },

  // ✅ Update project with FormData support
  update: async (id: string, data: ProjectFormData, files?: File[]) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      // @ts-ignore
      formData.append(key, value);
    });
    files?.forEach((file) => formData.append("images", file));

    const token = tokenStorage.get();
    const res = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "PUT",
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`);
    return res.json();
  },

  delete: async (id: string) =>
    apiRequest<void>(`/projects/${id}`, {
      method: "DELETE",
    }),
};

// Form Submissions API
export const submissionsAPI = {
  getAll: async () => apiRequest<{ submissions: any[] }>("/submissions"),
  markReviewed: async (id: string) =>
    apiRequest<{ submission: any }>(`/submissions/${id}/review`, {
      method: "PATCH",
    }),
};

// Quotes API
export const quotesAPI = {
  submit: async (data: any) =>
    apiRequest<{ quote: any }>("/quotes", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  getAll: async () => apiRequest<{ quotes: any[] }>("/quotes"),
  getById: async (id: string) =>
    apiRequest<{ quote: any }>(`/quotes/${id}`),
  delete: async (id: string) =>
    apiRequest<void>(`/quotes/${id}`, {
      method: "DELETE",
    }),
};
