import { Card, CardContent } from "../components/ui/card"
import { Clock, Lightbulb, Globe, Award, Users, Shield } from "lucide-react"

const features = [
  {
    icon: Clock,
    title: "Timely Delivery",
    description: "We respect your time and always deliver projects on schedule without compromising quality.",
  },
  {
    icon: Lightbulb,
    title: "Creative Design",
    description: "Innovative and unique design solutions that reflect your personality and lifestyle.",
  },
  {
    icon: Globe,
    title: "Local Insight",
    description: "Deep understanding of design preferences and building standards in Nigeria and the UK.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Premium materials and skilled craftsmanship ensure lasting beauty and durability.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Experienced designers and craftsmen dedicated to bringing your vision to life.",
  },
  {
    icon: Shield,
    title: "Trusted Service",
    description: "Fully licensed and insured with a proven track record of satisfied clients.",
  },
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-blue mb-4">Why Choose AB Jay Interior</h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            With years of experience and hundreds of successful projects, we've built our reputation on quality,
            reliability, and exceptional customer service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-2 border-gray-100 hover:border-brand-green/30 transition-colors duration-300"
            >
              <CardContent className="p-8">
                <div className="bg-brand-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold text-brand-blue mb-4">{feature.title}</h3>
                <p className="text-brand-gray">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
