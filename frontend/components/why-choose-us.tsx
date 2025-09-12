import { Card, CardContent } from "../components/ui/card"

const features = [
  {
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757497481/portfolio/projects/1757497633386-1-ab-jay-interior3.jpg.jpg",
    title: "Timely Delivery",
    description: "We respect your time and always deliver projects on schedule without compromising quality.",
  },
  {
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757670818/3d-rendering-wood-classic-living-room-with-marble-tile-bookshelf-sofa_j2fzgg.jpg",
    title: "Creative Design",
    description: "Innovative and unique design solutions that reflect your personality and lifestyle.",
  },
  {
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757670832/denish-smith-DNTpZVQjzg8-unsplash_v0qwic.jpg",
    title: "Local Insight",
    description: "Deep understanding of design preferences and building standards in Nigeria and the UK.",
  },
  {
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757670832/denish-smith-DNTpZVQjzg8-unsplash_v0qwic.jpg",
    title: "Quality Assurance",
    description: "Premium materials and skilled craftsmanship ensure lasting beauty and durability.",
  },
  {
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757670818/3d-rendering-wood-classic-living-room-with-marble-tile-bookshelf-sofa_j2fzgg.jpg",
    title: "Expert Team",
    description: "Experienced designers and craftsmen dedicated to bringing your vision to life.",
  },
  {
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757670965/vinicius-araujo-uBbpXj1fTao-unsplash_g0hry0.jpg",
    title: "Trusted Service",
    description: "Fully licensed and insured with a proven track record of satisfied clients.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-blue-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-balance bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
            Why Choose AB Jay Interior
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            With years of experience and hundreds of successful projects, we've built our reputation on quality,
            reliability, and exceptional customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group overflow-hidden border border-blue-100/50 shadow-lg hover:shadow-2xl hover:shadow-blue-200/25 transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-0 relative">
                {/* Background image with overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                  {/* Content overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <h3 className="text-xl font-serif font-semibold mb-3 text-balance drop-shadow-lg">{feature.title}</h3>
                    <p className="text-sm leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity duration-300 text-blue-50">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-blue-100/50">
            <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse shadow-sm" />
            <span className="text-slate-700 font-medium">Ready to transform your space?</span>
            <button className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}