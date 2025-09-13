import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import TeamSection from "../../components/team-section"
import CertificationsSection from "../../components/certifications-section"
import { Card, CardContent } from "../../components/ui/card"
import { Users, Target, Heart, Award } from "lucide-react"

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To transform spaces into beautiful, functional environments that enhance the lives of our clients through innovative design and exceptional craftsmanship.",
  },
  {
    icon: Heart,
    title: "Our Vision",
    description:
      "To be the leading interior design company across Nigeria and the UK, known for creativity, quality, and customer satisfaction.",
  },
  {
    icon: Award,
    title: "Our Values",
    description:
      "Excellence, integrity, creativity, and customer-centricity guide everything we do. We believe in building lasting relationships through quality work.",
  },
  {
    icon: Users,
    title: "Our Team",
    description:
      "A diverse team of experienced designers, craftsmen, and project managers dedicated to bringing your vision to life with precision and style.",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section - keep existing */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-brand-blue/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About AB Jay Interior</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Crafting exceptional spaces with passion, precision, and professional excellence across Nigeria and the
              United Kingdom.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story - keep existing */}
    <section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
      {/* Text Side */}
      <div className="flex flex-col justify-center">
        <h2 className="text-4xl font-bold text-brand-blue mb-6">Our Story</h2>
        <div className="space-y-4 text-brand-gray">
          <p>
            Founded with a vision to transform spaces and enhance lives, AB Jay Interior LTD has grown from a
            small local business to a trusted name in interior design and renovation across two continents.
          </p>
          <p>
            Our journey began with a simple belief: every space has the potential to be extraordinary. Whether
            it's a cozy family home in Lagos or a modern office in London, we approach each project with the same
            level of dedication and creativity.
          </p>
          <p>
            Over the years, we've completed hundreds of projects, built lasting relationships with clients, and
            established ourselves as leaders in the industry. Our success is built on a foundation of quality
            craftsmanship, innovative design, and unwavering commitment to customer satisfaction.
          </p>
          <p>
            Today, AB Jay Interior continues to push boundaries, embrace new technologies, and create spaces that
            not only look beautiful but also enhance the way people live and work.
          </p>
        </div>
      </div>

      {/* Image Side */}
     <div className="relative h-[500px] w-full">
  <img
    src="/images/ABja_ceo2.jpg?height=500&width=600"
    alt="AB Jay Interior team at work"
    className="h-full w-full object-cover rounded-lg shadow-xl"
  />
</div>

    </div>
  </div>
</section>


      {/* Add Team Section */}
      {/* <TeamSection /> */}

      {/* Mission, Vision, Values - keep existing */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-blue mb-4">Our Foundation</h2>
            <p className="text-xl text-brand-gray max-w-3xl mx-auto">
              Built on strong values and guided by a clear mission, we're committed to excellence in every project we
              undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="border-2 border-gray-100 hover:border-brand-green/30 transition-colors duration-300"
              >
                <CardContent className="p-8">
                  <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                    <value.icon className="h-8 w-8 text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-blue mb-4">{value.title}</h3>
                  <p className="text-brand-gray">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add Certifications Section */}
      <CertificationsSection />

      {/* Stats Section - keep existing */}
      <section className="py-20 bg-brand-blue text-white mb-5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl opacity-90">
              Numbers that reflect our commitment to excellence and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-green mb-2">500+</div>
              <div className="text-lg">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-green mb-2">2</div>
              <div className="text-lg">Countries Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-green mb-2">98%</div>
              <div className="text-lg">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-green mb-2">5+</div>
              <div className="text-lg">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
