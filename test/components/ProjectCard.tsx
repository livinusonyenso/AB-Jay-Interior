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

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete, viewMode }) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  // Display first image or fallback
  const imageUrl = project?.images?.[0] ?? 'images/ab-jay-interior11.jpg';

  // Optional: show multiple images as small previews
  const imagePreviews = project.images?.length > 1 ? project.images : [imageUrl];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex overflow-x-auto">
        {imagePreviews.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Project ${project.title}`}
            className="w-full h-48 object-cover flex-shrink-0"
          />
        ))}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold">{project.title}</h3>
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">{project.category}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <MapPin className="h-4 w-4 mr-1" /> {project.location}
        </div>
        <div className="flex items-center text-xs text-gray-400 mb-4">
          <Calendar className="h-4 w-4 mr-1" /> Created {formatDate(project.createdAt)}
        </div>
        <div className="flex space-x-2">
          <Button variant="secondary" size="sm" onClick={onEdit}><Edit className="h-4 w-4 mr-1" />Edit</Button>
          <Button variant="danger" size="sm" onClick={onDelete}><Trash2 className="h-4 w-4 mr-1" />Delete</Button>
        </div>
      </div>
    </div>
  );
};
