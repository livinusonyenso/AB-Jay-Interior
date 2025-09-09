import  { useState, useEffect } from "react";
import {
  ArrowRight,
  MapPin,
  Tag,
  X,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { projectsAPI } from "../src/lib/api";

interface Project {
  _id: string;
  title: string;
  location: string;
  category: string;
  images: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsResponse {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Residential":
      return "bg-blue-100 text-blue-800";
    case "Office":
      return "bg-green-100 text-green-800";
    case "Retail":
      return "bg-purple-100 text-purple-800";
    case "Educational":
      return "bg-orange-100 text-orange-800";
    case "Healthcare":
      return "bg-pink-100 text-pink-800";
    case "Hospitality":
      return "bg-indigo-100 text-indigo-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function RecentProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Fetch projects from API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        //@ts-ignore
        const response: ProjectsResponse = await projectsAPI.getAll();
        setProjects(response.projects || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const openLightbox = (project: Project) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
    setIsModalOpen(true);
  };

  const closeLightbox = () => {
    setIsModalOpen(false);
    setActiveImageIndex(0);
    setTimeout(() => setSelectedProject(null), 300);
  };

  const navigateProject = (direction: "prev" | "next") => {
    if (!selectedProject) return;

    const currentIndex = projects.findIndex(
      (p) => p._id === selectedProject._id
    );
    let newIndex;

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : projects.length - 1;
    } else {
      newIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : 0;
    }

    const newProject = projects[newIndex];
    setSelectedProject(newProject);
    setActiveImageIndex(0);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedProject || selectedProject.images.length <= 1) return;

    if (direction === "prev") {
      setActiveImageIndex(
        activeImageIndex > 0
          ? activeImageIndex - 1
          : selectedProject.images.length - 1
      );
    } else {
      setActiveImageIndex(
        activeImageIndex < selectedProject.images.length - 1
          ? activeImageIndex + 1
          : 0
      );
    }
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
          if (e.shiftKey) {
            navigateProject("prev");
          } else {
            navigateImage("prev");
          }
          break;
        case "ArrowRight":
          if (e.shiftKey) {
            navigateProject("next");
          } else {
            navigateImage("next");
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isModalOpen, selectedProject, activeImageIndex]);

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

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-xl text-gray-600">Loading projects...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-xl text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

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
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => openLightbox(project)}
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={
                        project.images[0] ||
                        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600"
                      }
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

                    {/* Images Count Badge */}
                    {project.images.length > 1 && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-black/70 text-white px-2 py-1 rounded-full text-sm font-medium">
                          +{project.images.length - 1}
                        </span>
                      </div>
                    )}

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
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No projects found.</p>
            </div>
          )}

          {/* View All Projects Button */}
          {projects.length > 0 && (
            <div className="text-center mt-16">
              <Link
                to="/gallery"
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
              >
                View All Projects
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Lightbox Modal with Image Gallery */}
      {isModalOpen && selectedProject && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${
            isModalOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeLightbox}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md transition-all duration-500"
            style={{
              backdropFilter: "blur(20px)",
            }}
          />

          {/* Modal Content */}
          <div
            className={`relative max-w-2xl w-full transform transition-all duration-500 ${
              isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Project Navigation Arrows */}
            {projects.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateProject("prev");
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateProject("next");
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Modal Container - Compact Layout */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
              {/* Main Image Section */}
              <div className="relative bg-gray-100">
                {/* Category Badge */}
                <div className="absolute top-6 left-6 z-10">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(
                      selectedProject.category
                    )} backdrop-blur-md bg-opacity-90`}
                  >
                    {selectedProject.category}
                  </span>
                </div>

                {/* Image Navigation Arrows (for image gallery) */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage("prev");
                      }}
                      className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateImage("next");
                      }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Main Active Image */}
                <div className="relative">
                  <div className="w-full aspect-video overflow-hidden rounded-lg">
                    <img
                      src={selectedProject.images[activeImageIndex]}
                      alt={`${selectedProject.title} - Image ${
                        activeImageIndex + 1
                      }`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Image Counter */}
                  {selectedProject.images.length > 1 && (
                    <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {activeImageIndex + 1} / {selectedProject.images.length}
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Gallery - Directly Below Main Image */}
              {selectedProject.images.length > 1 && (
                <div className="px-6 py-4 bg-white">
                  <div className="flex items-center justify-center gap-2 overflow-x-auto">
                    {selectedProject.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImageIndex(index);
                        }}
                        className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                          index === activeImageIndex
                            ? "border-blue-500 ring-1 ring-blue-500/50 scale-105"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Details Section */}
              <div className="px-6 pb-6">
                <div className="max-w-full">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {selectedProject.title}
                  </h3>

                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{selectedProject.location}</span>
                  </div>

                  <p className="text-gray-700 text-sm leading-relaxed mb-6">
                    {selectedProject.description}
                  </p>

                  {/* Project Navigation Indicators */}
                  {projects.length > 1 && (
                    <div className="flex items-center justify-center gap-1">
                      {projects.map((project, index) => (
                        <button
                          key={project._id}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(projects[index]);
                            setActiveImageIndex(0);
                          }}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            project._id === selectedProject._id
                              ? "bg-blue-600 scale-125"
                              : "bg-gray-300 hover:bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
