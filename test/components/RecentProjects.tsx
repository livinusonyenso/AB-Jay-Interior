import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  MapPin,
  Tag,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

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
    image:
      "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description:
      "Complete transformation of a corporate workspace featuring contemporary design elements and ergonomic solutions.",
  },
  {
    id: 2,
    title: "Luxury Residential Villa",
    location: "Ikoyi, Lagos",
    category: "Residential",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description:
      "Sophisticated interior renovation combining modern aesthetics with traditional Nigerian architectural elements.",
  },
  {
    id: 3,
    title: "Boutique Retail Space",
    location: "Lekki Phase 1, Lagos",
    category: "Retail",
    image:
      "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description:
      "High-end retail interior design creating an immersive shopping experience with premium finishes.",
  },
  {
    id: 4,
    title: "Contemporary Family Home",
    location: "Abuja, FCT",
    category: "Residential",
    image:
      "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description:
      "Open-concept family home renovation featuring smart storage solutions and natural lighting optimization.",
  },
  {
    id: 5,
    title: "Tech Startup Hub",
    location: "Ikeja, Lagos",
    category: "Office",
    image:
      "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description:
      "Dynamic workspace design promoting collaboration and creativity with flexible meeting spaces.",
  },
  {
    id: 6,
    title: "Upscale Restaurant",
    location: "Victoria Island, Lagos",
    category: "Retail",
    image:
      "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=1600",
    description:
      "Elegant dining space design creating the perfect ambiance for fine dining experiences.",
  },
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Residential":
      return "bg-blue-100 text-blue-800";
    case "Office":
      return "bg-green-100 text-green-800";
    case "Retail":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function RecentProjects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLightbox = (projectId: number) => {
    setSelectedProject(projectId);
    setIsModalOpen(true);
  };

  const closeLightbox = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const navigateProject = (direction: "prev" | "next") => {
    if (selectedProject === null) return;

    const currentIndex = projects.findIndex((p) => p.id === selectedProject);
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    } else {
      newIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
    }

    setSelectedProject(projects[newIndex].id);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      switch (e.key) {
        case "Escape":
          closeLightbox();
          break;
        case "ArrowLeft":
          navigateProject("prev");
          break;
        case "ArrowRight":
          navigateProject("next");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen, selectedProject]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  const currentProject = selectedProject
    ? projects.find((p) => p.id === selectedProject)
    : null;

  return (
    <>
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
              Discover our latest interior design and renovation projects across
              Nigeria and the UK. Each space tells a unique story of
              transformation and excellence.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => openLightbox(project.id)}
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
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(
                        project.category
                      )}`}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white text-sm mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                        {project.description}
                      </p>
                      <div className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 delay-200">
                        View Details
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
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
              <Link to={"/gallery"}> View All Projects </Link>

              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isModalOpen && currentProject && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
            isModalOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeLightbox}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/90 backdrop-blur-md transition-all duration-500"
            style={{
              backdropFilter: "blur(20px)",
            }}
          />

          {/* Modal Content */}
          <div
            className={`relative max-w-sm max-h-[60%] w-full transform transition-all duration-500 mb-[210px] ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateProject("prev");
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateProject("next");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Container */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              <div className="relative">
                <img
                  src={currentProject.image}
                  alt={currentProject.title}
                  className="w-full h-auto max-h-[70vh] object-contain bg-gray-100"
                />

                {/* Category Badge on Image */}
                <div className="absolute top-6 left-6">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(
                      currentProject.category
                    )} backdrop-blur-md bg-opacity-90`}
                  >
                    {currentProject.category}
                  </span>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-8 bg-white">
                <div className="max-w-4xl">
                  <h3 className="text-3xl font-bold text-gray-900 mb-3">
                    {currentProject.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-5 h-5 mr-2 flex-shrink-0" />
                    <span className="text-lg">{currentProject.location}</span>
                  </div>

                  <p className="text-gray-700 text-lg leading-relaxed">
                    {currentProject.description}
                  </p>

                  {/* Project Navigation Indicators */}
                  <div className="flex items-center justify-center mt-8 gap-2">
                    {projects.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProject(projects[index].id);
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          projects[index].id === currentProject.id
                            ? "bg-blue-600 scale-125"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
