import React, { useState } from 'react';
import { useProjects } from '../../../hooks/useProjects';
import { Button } from '../../../components/Button';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { ProjectForm } from '../../../components/ProjectForm';
import { ProjectCard } from '../../../components/ProjectCard';
import { Modal } from '../../../components/Modal';
import { Project } from '../../types';
import { Plus, Grid, List, FolderOpen } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects, loading, error, createProject, updateProject, deleteProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Open the create modal
  const openCreateModal = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  // Open the edit modal
  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  // Delete project
  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Error loading projects: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage your project portfolio</p>
        </div>

        {/* View toggle + New Project */}
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          <Button onClick={openCreateModal}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">No projects yet</h3>
          <p className="mt-2 text-gray-500">Get started by creating your first project.</p>
          <Button onClick={openCreateModal} className="mt-4">
            Create Project
          </Button>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id || index}
              project={project}
              onEdit={() => openEditModal(project)}
              onDelete={() => handleDeleteProject(project.id)}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}

      {/* Modal for Create/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Edit Project' : 'Create New Project'}
      >
        <ProjectForm
          project={editingProject}
          onSuccess={(savedProject) => {
            // Refresh projects list automatically (assumes useProjects refetches)
            if (editingProject) {
              updateProject(savedProject.id, savedProject); // Update locally if needed
            } else {
              createProject(savedProject); // Add new locally if needed
            }
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
};
