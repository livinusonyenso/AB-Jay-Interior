import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Home, Building2, Wrench, Palette, Hammer, Sparkles, ArrowRight, Check } from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Residential Design",
    description: "Complete home interior design and decoration services for modern living spaces.",
    features: [
      "Living room design and decoration",
      "Bedroom and bathroom makeovers",
      "Kitchen design and renovation",
      "Custom furniture selection",
      "Color scheme consultation",
      "Space planning and optimization",
    ],
    price: "From ₦500,000",
  },
  {
    icon: Building2,
    title: "Office Setup",
    description: "Professional office design and setup to enhance productivity and brand image.",
    features: [
      "Workspace planning and design",
      "Ergonomic furniture selection",
      "Brand-aligned aesthetics",
      "Meeting room setup",
      "Reception area design",
      "Lighting and acoustics",
    ],
    price: "From ₦800,000",
  },
  {
    icon: Wrench,
    title: "Full Renovation",
    description: "Complete property renovation from concept to completion with quality finishes.",
    features: [
      "Structural modifications",
      "Electrical and plumbing updates",
      "Flooring and wall finishes",
      "Custom built-ins",
      "Project management",
      "Quality assurance",
    ],
    price: "From ₦2,000,000",
  },
  {
    icon: Palette,
    title: "Interior Decoration",
    description: "Expert color schemes, furniture selection, and decorative elements.",
    features: [
      "Color consultation",
      "Furniture and accessory selection",
      "Art and decor placement",
      "Window treatments",
      "Styling and staging",
      "Final touches and details",
    ],
    price: "From ₦300,000",
  },
  {
    icon: Hammer,
    title: "Plastering & Tiling",
    description: "Professional plastering and tiling services with attention to detail.",
    features: [
      "Wall and ceiling plastering",
      "Floor and wall tiling",
      "Waterproofing services",
      "Surface preparation",
      "Quality materials",
      "Precision installation",
    ],
    price: "From ₦150,000",
  },
  {
    icon: Sparkles,
    title: "Custom Solutions",
    description: "Bespoke design solutions tailored to your unique requirements and style.",
    features: [
      "Personalized design consultation",
      "Custom furniture design",
      "Unique space solutions",
      "Specialty installations",
      "Luxury finishes",
      "Exclusive materials",
    ],
    price: "Quote on request",
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-brand-blue/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Services</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Comprehensive interior design and renovation services tailored to transform your spaces with precision,
              style, and professional excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-8 w-8 text-brand-green" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-brand-blue mb-2">{service.title}</h3>
                      <p className="text-brand-gray">{service.description}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <Check className="h-5 w-5 text-brand-green flex-shrink-0" />
                        <span className="text-brand-gray">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                    <div>
                      <span className="text-2xl font-bold text-brand-blue">{service.price}</span>
                    </div>
                    <Button className="bg-brand-green hover:bg-brand-green/90">
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-blue mb-4">Our Process</h2>
            <p className="text-xl text-brand-gray max-w-3xl mx-auto">
              We follow a structured approach to ensure every project is completed to the highest standards, on time,
              and within budget.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "Initial meeting to understand your vision and requirements",
              },
              {
                step: "02",
                title: "Design",
                description: "Create detailed plans and 3D visualizations for your approval",
              },
              {
                step: "03",
                title: "Execution",
                description: "Professional implementation with regular progress updates",
              },
              {
                step: "04",
                title: "Completion",
                description: "Final walkthrough and handover of your transformed space",
              },
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="bg-brand-green text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {process.step}
                </div>
                <h3 className="text-xl font-semibold text-brand-blue mb-3">{process.title}</h3>
                <p className="text-brand-gray">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
