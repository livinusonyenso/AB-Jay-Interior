import { useState, useEffect } from "react"
import { Button } from "./Button"

const heroImages = [
  {
    url: "https://res.cloudinary.com/dike9pceb/image/upload/v1757667353/neon-wang-NyyQu7YxOv0-unsplash_m8vkgr.jpg",
    title: "Sophisticated Living",
    subtitle: "Luxury residential interiors where elegance meets comfort",
    category: "Residential",
  },
  {
    url: "https://res.cloudinary.com/dike9pceb/image/upload/v1757670902/pexels-essentia-media-2154502099-33342702_edt6s7.jpg",
    title: "Serene Office Spaces",
    subtitle: "Premium workspaces designed for focus and style",
    category: "Luxury Office",
  },
  {
    url: "https://res.cloudinary.com/dike9pceb/image/upload/v1757670904/pexels-falling4utah-2724749_lsezrs.jpg",
    title: "Culinary Excellence",
    subtitle: "Kitchens that inspire creativity and luxury",
    category: "Kitchen",
  },
  {
    url: "https://res.cloudinary.com/dike9pceb/image/upload/v1757670977/pexels-heyho-6207943_xhyos2.jpg", // replace with actual image
    title: "Spa-Inspired Bathrooms",
    subtitle: "Bathrooms designed for relaxation and elegance",
    category: "Bathroom",
  },
  {
    url: "https://res.cloudinary.com/dike9pceb/image/upload/v1757670965/vinicius-araujo-uBbpXj1fTao-unsplash_g0hry0.jpg", // replace with actual image
    title: "Elegant Dining & Entertainment",
    subtitle: "Spaces crafted for unforgettable gatherings",
    category: "Dining & Entertainment",
  },
];


export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative h-screen overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={image.url || "/placeholder.svg"} alt={image.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6 max-w-4xl animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl mb-6 font-bold bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent drop-shadow-2xl">
            {heroImages[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 font-medium leading-relaxed drop-shadow-lg">
            {heroImages[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              variant="primary"
              className="min-w-[200px] shadow-2xl"
            >
              View Our Portfolio
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[200px] shadow-2xl"
            >
              Schedule Consultation
            </Button>
          </div>
        </div>
      </div>

      {/* Enhanced slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? "bg-gradient-to-r from-blue-400 to-green-400 shadow-lg scale-125" 
                : "bg-white/40 hover:bg-white/60 backdrop-blur-sm"
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 right-8 text-white/80 animate-bounce">
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-medium">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-blue-400 to-green-400"></div>
        </div>
      </div>
    </section>
  )
}