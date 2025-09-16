import React, { useState } from 'react';
import { useProjects } from '../../../hooks/useProjects';
import { Button } from '../../../components/Button';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { ProjectForm } from '../../../components/ProjectForm';
import { ProjectCard } from '../../../components/ProjectCard';
import { Modal } from '../../../components/Modal';
import { Project } from '../../types';
import { FolderOpen } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { projects, loading, error, createProject, updateProject, deleteProject } = useProjects();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [viewMode] = useState<'grid' | 'list'>('grid');

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
    key={project._id || index}
    project={project}
    onEdit={() => openEditModal(project)}
    onDelete={() => handleDeleteProject(project._id)}
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
              updateProject(savedProject._id, savedProject); // Update locally if needed
            } else {
              createProject(savedProject); // Add new locally if needed
            }
            setIsModalOpen(false);
          }}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};
