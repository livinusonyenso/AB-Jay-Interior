"use client"

import { useState } from "react"
import { Card } from "../components/ui/card"
import { X } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    title: "Modern Penthouse",
    category: "Residential",
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757670818/3d-rendering-wood-classic-living-room-with-marble-tile-bookshelf-sofa_j2fzgg.jpg",
    description: "A sophisticated urban retreat with panoramic city views",
  },
  {
    id: 2,
    title: "Boutique Hotel Lobby",
    category: "Commercial",
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757670848/cesar-cid-OqFaAWXQKTE-unsplash_bfadg1.jpg",
    description: "Welcoming guests with timeless elegance and comfort",
  },
  {
    id: 3,
    title: "Family Villa",
    category: "Residential",
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757670813/karina-danilyants-RqiOhVzdTy8-unsplash_vxfykr.jpg",
    description: "Harmonious blend of luxury and family-friendly functionality",
  },
  {
    id: 4,
    title: "Executive Office",
    category: "Commercial",
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757670832/denish-smith-DNTpZVQjzg8-unsplash_v0qwic.jpg",
    description: "Inspiring workspace that reflects success and sophistication",
  },
  {
    id: 5,
    title: "Coastal Retreat",
    category: "Residential",
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757497481/portfolio/projects/1757497633386-1-ab-jay-interior3.jpg.jpg",
    description: "Serene beachside sanctuary with natural materials",
  },
  {
    id: 6,
    title: "Fine Dining Restaurant",
    category: "Commercial",
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757497648/portfolio/projects/1757497796857-0-1698817350662.jpg.jpg",
    description: "Intimate dining experience with sophisticated ambiance",
  },
]

export function PortfolioGrid() {
  const [selectedItem, setSelectedItem] = useState<(typeof portfolioItems)[0] | null>(null)
  const [filter, setFilter] = useState("All")

  const categories = ["All", "Residential", "Commercial"]
  const filteredItems = filter === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === filter)

  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="luxury-heading text-4xl md:text-5xl mb-6 text-foreground">Our Portfolio</h2>
          <p className="luxury-text text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
            Discover our collection of thoughtfully designed spaces
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-4 p-2 bg-muted rounded-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-md transition-all luxury-text ${
                  filter === category
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Card
              key={item.id}
              className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center">
                    <h3 className="luxury-heading text-2xl mb-2">{item.title}</h3>
                    <p className="luxury-text text-sm">{item.category}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
            <div className="bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
              <div className="relative">
                <img
                  src={selectedItem.image || "/placeholder.svg"}
                  alt={selectedItem.title}
                  className="w-full h-96 object-cover"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
                >
                  <X size={32} />
                </button>
              </div>
              <div className="p-8">
                <h3 className="luxury-heading text-3xl mb-2 text-foreground">{selectedItem.title}</h3>
                <p className="luxury-text text-accent mb-4">{selectedItem.category}</p>
                <p className="luxury-text text-muted-foreground text-lg">{selectedItem.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
