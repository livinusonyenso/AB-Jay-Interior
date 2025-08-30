import { Card, CardContent } from "../components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "AB Jay Interior transformed our home beyond our expectations. Their attention to detail and creative vision made our space both beautiful and functional. Highly recommended!",
    project: "Residential Design",
  },
  {
    name: "Michael Chen",
    location: "London, UK",
    rating: 5,
    text: "Professional, reliable, and incredibly talented. They delivered our office renovation on time and within budget. The team was a pleasure to work with throughout the project.",
    project: "Office Setup",
  },
  {
    name: "Adaora Okafor",
    location: "Abuja, Nigeria",
    rating: 5,
    text: "From concept to completion, AB Jay Interior exceeded every expectation. Their local insight and international standards made all the difference in our renovation project.",
    project: "Full Renovation",
  },
  {
    name: "James Wilson",
    location: "Manchester, UK",
    rating: 5,
    text: "Outstanding craftsmanship and design expertise. They understood our vision perfectly and brought it to life with precision and style. Couldn't be happier with the results.",
    project: "Interior Decoration",
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-blue mb-4">What Our Clients Say</h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience
            working with AB Jay Interior.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="border-2 border-gray-100 hover:border-brand-green/30 transition-colors duration-300"
            >
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-brand-green/30 mr-3" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-brand-gray mb-6 italic">"{testimonial.text}"</p>

                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-brand-blue">{testimonial.name}</h4>
                    <p className="text-sm text-brand-gray">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-brand-green font-medium">{testimonial.project}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
