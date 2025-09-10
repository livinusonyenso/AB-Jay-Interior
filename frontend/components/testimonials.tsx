import { Card, CardContent } from "../components/ui/card"
import { Star, Quote } from "lucide-react"

export const testimonials = [
  {
    name: "Justice",
    location: "Kennington, UK",
    rating: 5,
    text: "I can't speak more highly of the job on completion and he thoroughly cleaned the area before leaving. I would not hesitate recommending to friends and family. Justice did a fantastic job. He is a quick worker and has finished the job to a high standard. Very happy.",
    project: "Plastering Work",
  },
  {
    name: "Caden",
    location: "Peckham, UK",
    rating: 5,
    text: "Plastering 5 bedrooms, dining room, and living room, as well as removing fireplace. This is the second time I have worked with the guys. Excellent and efficient. Clearly have pride in their work and look to help. Also just good guys.",
    project: "Full House Plastering",
  },
  {
    name: "Emily",
    location: "Stockwell, UK",
    rating: 5,
    text: "He is a very good and experienced builder. Will recommend him for building services. Justice was really great, arrived on time, excellent workmanship, and was very tidy and pleasant. I would recommend Justice to anyone looking for great company to carry out their works. You will not be disappointed.",
    project: "Building Services",
  },
  {
    name: "Mr Jett Carrigen",
    location: "Clapham, UK",
    rating: 5,
    text: "Plastering of two bedrooms and boxing window. Justice has done a fantastic job plastering two bedrooms. Fair price, great quality, and really nice guy. I would definitely use again. Thank you.",
    project: "Bedroom Plastering",
  },
  {
    name: "Jane",
    location: "East Dulwich, UK",
    rating: 5,
    text: "Plastering of partition wall. I also wish to drop another feedback for the painting work after plastering. He is a time keeper and someone you can leave property without being worried.",
    project: "Partition Wall Plastering",
  },
  {
    name: "Octane ES10",
    location: "Unknown",
    rating: 5,
    text: "Justice and his team were fantastic. Our house was in need of total refurb. It's not an exaggeration to say the house had not been touched since 1950s. All the internal wattle and daub walls came down and Justice brought our house up to modern fire regulations and building control standards. The plastering was beautiful. He worked great with our electrician and plumber, and we're delighted. So glad we found Justice and his team. Thank you again Justice, Jeff, and Jennifer.",
    project: "Full House Refurbishment",
  },
];


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
