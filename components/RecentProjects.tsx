import React from 'react';
import { ArrowRight, MapPin, Tag } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  location: string;
  category: string;
  image: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Modern Executive Office",
    location: "Victoria Island, Lagos",
    category: "Office",
    image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Complete transformation of a corporate workspace featuring contemporary design elements and ergonomic solutions."
  },
  {
    id: 2,
    title: "Luxury Residential Villa",
    location: "Ikoyi, Lagos",
    category: "Residential",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Sophisticated interior renovation combining modern aesthetics with traditional Nigerian architectural elements."
  },
  {
    id: 3,
    title: "Boutique Retail Space",
    location: "Lekki Phase 1, Lagos",
    category: "Retail",
    image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "High-end retail interior design creating an immersive shopping experience with premium finishes."
  },
  {
    id: 4,
    title: "Contemporary Family Home",
    location: "Abuja, FCT",
    category: "Residential",
    image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Open-concept family home renovation featuring smart storage solutions and natural lighting optimization."
  },
  {
    id: 5,
    title: "Tech Startup Hub",
    location: "Ikeja, Lagos",
    category: "Office",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Dynamic workspace design promoting collaboration and creativity with flexible meeting spaces."
  },
  {
    id: 6,
    title: "Upscale Restaurant",
    location: "Victoria Island, Lagos",
    category: "Retail",
    image: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Elegant dining space design creating the perfect ambiance for fine dining experiences."
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Residential':
      return 'bg-blue-100 text-blue-800';
    case 'Office':
      return 'bg-green-100 text-green-800';
    case 'Retail':
      return 'bg-purple-100 text-purple-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function RecentProjects() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Tag className="w-4 h-4" />
            Our Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Recent <span className="text-green-500">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our latest interior design and renovation projects across Nigeria and the UK. 
            Each space tells a unique story of transformation and excellence.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
                    {project.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {project.description}
                    </p>
                    <button className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-200">
                      View Details
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {project.title}
                </h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="text-sm">{project.location}</span>
                </div>
                
                {/* Progress Bar Animation */}
                <div className="w-0 group-hover:w-full h-1 bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-700 delay-300 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
            View All Projects
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}