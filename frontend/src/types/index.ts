export interface Admin {
  id: string;
  email: string;
  name: string;
  role: string; 
}

export interface AuthContextType {
  user: Admin | null;   // ✅ always called user in context
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FormSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  projectId?: string;
  type: 'contact' | 'quote';
  reviewed: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalProjects: number;
  totalSubmissions: number;
  unreviewed: number;
  recentProjects: number;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  category: string;
  location: string;
  images: string[];
}

// Backend responses
export interface LoginResponse {
  token: string;
  admin: Admin;   // 👈 backend sends "admin"
}

export interface MeResponse {
  admin: Admin;   // 👈 backend sends "admin"
}
