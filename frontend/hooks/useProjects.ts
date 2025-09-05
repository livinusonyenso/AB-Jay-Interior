import { useState, useEffect } from 'react';
import { Project } from '../src/types';
import { projectsAPI } from '../src/lib/api';
export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await projectsAPI.getAll();
      setProjects(response.projects);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async (data: any) => {
    try {
      const response = await projectsAPI.create(data);
      setProjects(prev => [...prev, response.project]);
      return response.project;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to create project');
    }
  };

  const updateProject = async (id: string, data: any) => {
    try {
      const response = await projectsAPI.update(id, data);
      setProjects(prev => prev.map(p => p.id === id ? response.project : p));
      return response.project;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to update project');
    }
  };

  const deleteProject = async (id: string) => {
    try {
      await projectsAPI.delete(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to delete project');
    }
  };

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetch: fetchProjects,
  };
};