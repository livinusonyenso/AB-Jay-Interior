import React from 'react';
import { Project } from '../src/types';
import { Button } from './Button';
import { Edit, Trash2, MapPin, Calendar } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
  viewMode: 'grid' | 'list';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onEdit,
  onDelete,
  viewMode,
}) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {project.images[0] && (
                  <img
                     src={project.images?.[0] || "/placeholder.png"}
                    alt={project.title}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 truncate">{project.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {project.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(project.createdAt)}
                  </div>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="danger" size="sm" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {project?.images?.[0] ? (
  <img
    src={project.images?.[0] || "/placeholder.png"}
    alt={project.title || "Project"}
    className="w-full h-48 object-cover"
  />
) : (
  <img
    src="/placeholder.png"
    alt="No project image"
    className="w-full h-48 object-cover"
  />
)}

      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {project.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin className="h-4 w-4 mr-1" />
          {project.location}
        </div>
        
        <div className="flex items-center text-xs text-gray-400 mb-4">
          <Calendar className="h-4 w-4 mr-1" />
          Created {formatDate(project.createdAt)}
        </div>
        
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm" onClick={onEdit} className="flex-1">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="danger" size="sm" onClick={onDelete} className="flex-1">
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};