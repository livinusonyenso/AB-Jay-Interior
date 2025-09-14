"use client"

import { useState } from "react"
import { Card } from "./ui/card"
import { X } from "lucide-react"

const portfolioItems = [
  {
    id: 1,
    title: "Modern Penthouse",
    category: "Residential",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "A sophisticated urban retreat with panoramic city views, featuring floor-to-ceiling windows, marble accents, and contemporary furnishings that create an atmosphere of refined luxury.",
  },
  {
    id: 2,
    title: "Boutique Hotel Lobby",
    category: "Commercial",
    image: "https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Welcoming guests with timeless elegance and comfort, this lobby combines rich textures, warm lighting, and carefully curated artwork to create an unforgettable first impression.",
  },
  {
    id: 3,
    title: "Family Villa",
    category: "Residential",
    image: "https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Harmonious blend of luxury and family-friendly functionality, featuring open-plan living spaces, natural materials, and thoughtful storage solutions that grow with your family.",
  },
  {
    id: 4,
    title: "Executive Office",
    category: "Commercial",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Inspiring workspace that reflects success and sophistication, designed with ergonomic furniture, premium finishes, and strategic lighting to enhance productivity and well-being.",
  },
  {
    id: 5,
    title: "Coastal Retreat",
    category: "Residential",
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Serene beachside sanctuary with natural materials, featuring weathered wood, stone accents, and expansive windows that blur the boundaries between indoor and outdoor living.",
  },
  {
    id: 6,
    title: "Fine Dining Restaurant",
    category: "Commercial",
    image: "https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Intimate dining experience with sophisticated ambiance, carefully crafted with warm lighting, rich fabrics, and architectural details that elevate every culinary moment.",
  },
  {
    id: 7,
    title: "Minimalist Apartment",
    category: "Residential",
    image: "https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Clean lines and purposeful design create a tranquil urban oasis, where every element serves both form and function in perfect harmony.",
  },
  {
    id: 8,
    title: "Creative Agency Office",
    category: "Commercial",
    image: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Dynamic workspace that fosters creativity and collaboration, featuring flexible layouts, vibrant colors, and innovative meeting spaces that inspire breakthrough thinking.",
  },
  {
    id: 9,
    title: "Luxury Master Suite",
    category: "Residential",
    image: "https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    description: "Personal sanctuary designed for rest and rejuvenation, featuring sumptuous textiles, carefully controlled lighting, and a spa-like en-suite bathroom.",
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
            Discover our collection of thoughtfully designed spaces that reflect our commitment to excellence and attention to detail
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
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center p-4">
                    <h3 className="luxury-heading text-2xl mb-2">{item.title}</h3>
                    <p className="luxury-text text-sm opacity-90">{item.category}</p>
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
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-96 object-cover"
                />
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 text-white hover:text-accent transition-colors bg-black/20 hover:bg-black/40 rounded-full p-2"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <h3 className="luxury-heading text-3xl text-foreground">{selectedItem.title}</h3>
                  <span className="luxury-text text-accent bg-accent/10 px-3 py-1 rounded-full text-sm">
                    {selectedItem.category}
                  </span>
                </div>
                <p className="luxury-text text-muted-foreground text-lg leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}