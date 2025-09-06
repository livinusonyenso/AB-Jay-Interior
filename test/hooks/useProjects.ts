import { useState, useEffect } from "react";
import { Project, ProjectFormData } from "../src/types";
import { projectsAPI } from "../src/lib/api";

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await projectsAPI.getAll();
      setProjects(res.projects);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (data: ProjectFormData, files?: File[]) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("location", data.location);
    files?.forEach((file) => formData.append("images", file));
//@ts-ignore
    const res = await projectsAPI.create(formData);
    setProjects((prev) => [res.project, ...prev]);
    return res;
  };

  const updateProject = async (id: string, data: ProjectFormData, files?: File[]) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("location", data.location);
    files?.forEach((file) => formData.append("images", file));
//@ts-ignore
    const res = await projectsAPI.update(id, formData);
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? res.project : p))
    );
    return res;
  };

  const deleteProject = async (id: string) => {
    await projectsAPI.delete(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return { projects, loading, error, fetchProjects, createProject, updateProject, deleteProject };
};
