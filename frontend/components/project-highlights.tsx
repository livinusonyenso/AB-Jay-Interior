import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ArrowRight } from "lucide-react"

const projects = [
  {
    title: "Modern Living Room Makeover",
    location: "Lagos, Nigeria",
    image: "/images/ab-jay-interior1.jpg?height=300&width=400",
    description: "Complete transformation of a family living space with contemporary furniture and smart lighting.",
  },
  {
    title: "Executive Office Design",
    location: "London, UK",
    image: "/images/ab-jay-interior2.jpg?height=300&width=400",
    description: "Professional office setup with ergonomic design and brand-aligned aesthetics.",
  },
  {
    title: "Luxury Bedroom Suite",
    location: "Abuja, Nigeria",
    image: "/images/ab-jay-interior7.jpg?height=300&width=400",
    description: "Elegant bedroom design featuring custom furniture and premium finishes.",
  },
  {
    title: "Restaurant Interior",
    location: "Manchester, UK",
    image: "/images/ab-jay-interior4.jpg?height=300&width=400",
    description: "Stylish restaurant interior designed to enhance dining experience and brand identity.",
  },
]

export default function ProjectHighlights() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-blue mb-4">Project Highlights</h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Explore some of our recent completed projects that showcase our expertise in creating beautiful, functional
            spaces across different sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-video overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-brand-blue">{project.title}</h3>
                  <span className="text-sm text-brand-green font-medium">{project.location}</span>
                </div>
                <p className="text-brand-gray">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white px-8 py-3">
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
