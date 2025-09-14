"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import { Button } from "../../components/ui/button"

const categories = ["All", "Residential", "Commercial", "Renovation", "Office"]

const projects = [
  {
    id: 1,
    title: "Modern Living Room",
    category: "Residential",
    location: "Lagos, Nigeria",
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757823534/IMG-20231123-WA0051_rnirq3.jpg",
  },
  {
    id: 2,
    title: "Executive Office",
    category: "Office",
    location: "London, UK",
    image: "https://images.pexels.com/photos/1957477/pexels-photo-1957477.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    title: "Restaurant Interior",
    category: "Commercial",
    location: "Manchester, UK",
    image: "https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    title: "Bedroom Makeover",
    category: "Residential",
    location: "Abuja, Nigeria",
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757823550/IMG-20231124-WA0020_hjgujq.jpg",
  },
  {
    id: 5,
    title: "Kitchen Renovation",
    category: "Renovation",
    location: "Lagos, Nigeria",
    image: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 6,
    title: "Retail Store",
    category: "Commercial",
    location: "Birmingham, UK",
    image: "https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 7,
    title: "Bathroom Renovation",
    category: "Renovation",
    location: "Port Harcourt, Nigeria",
    image: "https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 8,
    title: "Co-working Space",
    category: "Office",
    location: "London, UK",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 9,
    title: "Dining Room",
    category: "Residential",
    location: "Kano, Nigeria",
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757823570/IMG-20240202-WA0062_lcdwgy.jpg",
  },
  {
    id: 10,
    title: "Luxury Retail Space",
    category: "Commercial",
    location: "Birmingham, UK",
    image: "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter((project) => project.category === activeCategory)

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Gallery</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Explore our portfolio of completed projects showcasing our expertise in creating beautiful, functional
              spaces across Nigeria and the UK.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className={
                  activeCategory === category
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "border-gray-300 text-gray-600 hover:border-green-600 hover:text-green-600"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={`${project.id}-${project.category}`} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg bg-white">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center p-4">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      {/* <p className="text-sm opacity-90 mb-2">{project.location}</p> */}
                      <span className="inline-block px-3 py-1 bg-green-600 rounded-full text-xs font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Results Counter */}
      <section className="py-4 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-gray-600">
              Showing {filteredProjects.length} of {projects.length} projects
              {activeCategory !== "All" && ` in ${activeCategory}`}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create something amazing together. Contact us today for a free consultation.
          </p>
          <Link to="/requestQuote">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}