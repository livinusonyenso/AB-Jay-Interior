import React, { useState } from "react";
import { useProjects } from "../../../hooks/useProjects";
import { LoadingSpinner } from "../../../components/LoadingSpinner";
import { ProjectForm } from "../../../components/ProjectForm";
import { Project } from "../../types";

export const CreateProject: React.FC = () => {
  const {loading, error, createProject, updateProject } = useProjects();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(true);



 

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
       
      </div>

      {/* Inline Project Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <ProjectForm
            project={editingProject}
            onSuccess={(savedProject) => {
              if (editingProject) {
                updateProject(savedProject.id, savedProject);
              } else {
                createProject(savedProject);
              }
              setEditingProject(null);
              setShowForm(false);
            }}
            onCancel={() => {
              setEditingProject(null);
              setShowForm(false);
            }}
          />
        </div>
      )}


    </div>
  );
};
