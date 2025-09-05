import { Card, CardContent } from "../components/ui/card"
import { Home, Building2, Wrench, Palette, Hammer, Sparkles } from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Residential Design",
    description: "Complete home interior design and decoration services for modern living spaces.",
  },
  {
    icon: Building2,
    title: "Office Setup",
    description: "Professional office design and setup to enhance productivity and brand image.",
  },
  {
    icon: Wrench,
    title: "Full Renovation",
    description: "Complete property renovation from concept to completion with quality finishes.",
  },
  {
    icon: Palette,
    title: "Interior Decoration",
    description: "Expert color schemes, furniture selection, and decorative elements.",
  },
  {
    icon: Hammer,
    title: "Plastering & Tiling",
    description: "Professional plastering and tiling services with attention to detail.",
  },
  {
    icon: Sparkles,
    title: "Custom Solutions",
    description: "Bespoke design solutions tailored to your unique requirements and style.",
  },
]

export default function WhatWeDo() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-blue mb-4">What We Do</h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            We offer comprehensive interior design and renovation services to transform your spaces into beautiful,
            functional environments that reflect your style and needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 shadow-md">
              <CardContent className="p-8 text-center">
                <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <service.icon className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold text-brand-blue mb-4">{service.title}</h3>
                <p className="text-brand-gray">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
