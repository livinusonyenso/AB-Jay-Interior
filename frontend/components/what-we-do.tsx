import { Card } from "../components/ui/card"

const services = [
  {
    title: "Residential Design",
    description: "Transform your home into a luxurious sanctuary",
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757670896/pexels-curtis-adams-1694007-5008401_im4hux.jpg",
    features: ["Space Planning", "Custom Furniture", "Color Consultation"],
  },
  {
    title: "Commercial Spaces",
    description: "Create inspiring work environments",
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757875042/nick-karvounis-YH7KYtYMET0-unsplash_ktnnyz.jpg",
    features: ["Office Design", "Retail Spaces", "Hospitality"],
  },
  {
    title: "Full Renovations",
    description: "Complete transformation from concept to completion",
    image: "https://res.cloudinary.com/dike9pceb/image/upload/v1757823442/IMG-20230917-WA0003_juweru.jpg",
    features: ["Project Management", "Construction Oversight", "Final Styling"],
  },
]

export function WhatWeDo() {
  return (
    <section id="services" className="py-8 px-6 bg-gradient-to-br from-slate-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="luxury-heading text-4xl md:text-5xl mb-6 text-slate-800 bg-gradient-to-r from-blue-800 to-teal-700 bg-clip-text text-transparent">
            Our Services
          </h2>
          <p className="luxury-text text-xl text-slate-600 max-w-3xl mx-auto text-balance">
            We create bespoke interiors that reflect your unique style and enhance your lifestyle
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group overflow-hidden border border-blue-100/50 shadow-lg hover:shadow-2xl hover:shadow-blue-200/25 transition-all duration-500 bg-white/80 backdrop-blur-sm"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/40 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="luxury-heading text-2xl mb-2 text-white drop-shadow-lg">
                    {service.title}
                  </h3>
                  <p className="luxury-text text-sm opacity-95 text-blue-50">
                    {service.description}
                  </p>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-b from-white to-slate-50/50">
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="luxury-text text-slate-700 flex items-center group-hover:text-slate-800 transition-colors">
                      <div className="w-2.5 h-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full mr-3 shadow-sm" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}