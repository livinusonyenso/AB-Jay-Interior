import { Card, CardContent } from "../components/ui/card"
import { Linkedin, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Adebayo Johnson",
    role: "Founder & Lead Designer",
    bio: "With over 10 years of experience in interior design, Adebayo founded AB Jay Interior with a vision to transform spaces across Nigeria and the UK. He specializes in contemporary and luxury residential designs.",
    image: "/images/Team1.jpg?height=300&width=300&text=Adebayo+Johnson",
    email: "adebayo@abjayinterior.com",
    linkedin: "#",
  },
  {
    name: "Sarah Mitchell",
    role: "UK Operations Manager",
    bio: "Sarah leads our UK operations with 8 years of experience in project management and commercial interior design. She ensures seamless delivery of projects across the United Kingdom.",
    image: "/images/Team2.jpg?height=300&width=300&text=Adebayo+Johnson",
    email: "sarah@abjayinterior.com",
    linkedin: "#",
  },
  {
    name: "Chioma Okafor",
    role: "Senior Interior Designer",
    bio: "Chioma brings creativity and technical expertise to residential and commercial projects. With a background in architecture, she excels at space planning and sustainable design solutions.",
    image: "/images/Team3.jpg?height=300&width=300&text=Adebayo+Johnson",
    email: "chioma@abjayinterior.com",
    linkedin: "#",
  },
  {
    name: "James Thompson",
    role: "Project Coordinator",
    bio: "James ensures all projects run smoothly from conception to completion. His attention to detail and client communication skills make him invaluable to our team and clients.",
    image: "/images/Team4.jpg?height=300&width=300&text=Adebayo+Johnson",
    email: "james@abjayinterior.com",
    linkedin: "#",
  },
  {
    name: "Fatima Abdul",
    role: "Design Consultant",
    bio: "Fatima specializes in color theory and space optimization. Her multicultural background helps her create designs that resonate with diverse client preferences and cultural aesthetics.",
    image: "/images/Team5.jpg?height=300&width=300&text=Adebayo+Johnson",
    email: "fatima@abjayinterior.com",
    linkedin: "#",
  },
  {
    name: "Michael Chen",
    role: "Technical Specialist",
    bio: "Michael handles the technical aspects of our projects, from structural assessments to smart home integrations. His engineering background ensures all designs are both beautiful and functional.",
    image: "/images/Team6.jpg?height=300&width=300&text=Adebayo+Johnson",
    email: "michael@abjayinterior.com",
    linkedin: "#",
  },
]

export default function TeamSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-blue mb-4">Meet Our Expert Team</h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Our diverse team of experienced professionals brings together creativity, technical expertise, and cultural
            insight to deliver exceptional results for every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-square overflow-hidden">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-brand-blue mb-1">{member.name}</h3>
                <p className="text-brand-green font-medium mb-3">{member.role}</p>
                <p className="text-brand-gray text-sm mb-4 leading-relaxed">{member.bio}</p>

                <div className="flex space-x-3">
                  <a
                    href={`mailto:${member.email}`}
                    className="bg-brand-blue/10 p-2 rounded-full hover:bg-brand-blue hover:text-white transition-colors duration-300"
                  >
                    <Mail className="h-4 w-4" />
                  </a>
                  <a
                    href={member.linkedin}
                    className="bg-brand-blue/10 p-2 rounded-full hover:bg-brand-blue hover:text-white transition-colors duration-300"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Values */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-brand-blue mb-4">Our Team Values</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-semibold text-brand-blue mb-2">Creativity</h4>
              <p className="text-sm text-brand-gray">Innovative solutions for every space</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h4 className="font-semibold text-brand-blue mb-2">Collaboration</h4>
              <p className="text-sm text-brand-gray">Working together for the best results</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-brand-blue mb-2">Excellence</h4>
              <p className="text-sm text-brand-gray">Commitment to the highest standards</p>
            </div>
            <div className="text-center">
              <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h4 className="font-semibold text-brand-blue mb-2">Diversity</h4>
              <p className="text-sm text-brand-gray">Embracing different perspectives</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
