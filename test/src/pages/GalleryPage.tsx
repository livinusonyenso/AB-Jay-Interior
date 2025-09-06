"use client"

import { useState } from "react"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import { Button } from "../../components/ui/button"
import { Link } from "react-router-dom"

const categories = ["All", "Residential", "Commercial", "Renovation", "Office"]

const projects = [
  {
    id: 1,
    title: "Modern Living Room",
    category: "Residential",
    location: "Lagos, Nigeria",
    image: "images/ab-jay-interior1.jpg?height=400&width=600",
    
  },
  {
    id: 2,
    title: "Executive Office",
    category: "Office",
    location: "London, UK",
    image: "images/ab-jay-interior11.jpg?height=400&width=600",
  },
  {
    id: 3,
    title: "Restaurant Interior",
    category: "Commercial",
    location: "Manchester, UK",
    image: "images/ab-jay-interior3.jpg?height=400&width=600",
  },
  {
    id: 4,
    title: "Bedroom Makeover",
    category: "Residential",
    location: "Abuja, Nigeria",
    image: "images/ab-jay-interior4.jpg?height=400&width=600",
  },
  {
    id: 5,
    title: "Kitchen Renovation",
    category: "Renovation",
    location: "Lagos, Nigeria",
    image: "images/ab-jay-interior5.jpg?height=400&width=600",
  },
  {
    id: 6,
    title: "Retail Store",
    category: "Commercial",
    location: "Birmingham, UK",
    image: "images/ab-jay-interior6.jpg?height=400&width=600",
  },
  {
    id: 7,
    title: "Bathroom Renovation",
    category: "Renovation",
    location: "Port Harcourt, Nigeria",
    image: "images/ab-jay-interior7.jpg?height=400&width=600",
  },
  {
    id: 8,
    title: "Co-working Space",
    category: "Office",
    location: "London, UK",
    image: "images/ab-jay-interior16.jpg?height=400&width=600",
  },
  {
    id: 9,
    title: "Dining Room",
    category: "Residential",
    location: "Kano, Nigeria",
    image: "images/ab-jay-interior9.jpg?height=400&width=600",
  },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects =
    activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory)

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-brand-blue/80 text-white">
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
                    ? "bg-brand-green hover:bg-brand-green/90"
                    : "border-brand-gray text-brand-gray hover:border-brand-green hover:text-brand-green"
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
              <div key={project.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-sm opacity-90">{project.location}</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-brand-green rounded-full text-xs">
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
              <p className="text-xl text-brand-gray">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-blue text-white mb-5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Space?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create something amazing together. Contact us today for a free consultation.
          </p>
          <Button className="bg-brand-green hover:bg-brand-green/90 text-white px-8 py-3 text-lg">
            <Link to={"/requestQuote"}>Get Started Today</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
