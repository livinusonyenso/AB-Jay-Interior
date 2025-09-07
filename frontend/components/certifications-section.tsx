"use client"

import { Card, CardContent } from "../components/ui/card"
import { Shield, Award, CheckCircle, Star } from "lucide-react"
import { motion } from "framer-motion"

const certifications = [
  {
    icon: Shield,
    title: "Fully Insured & Licensed",
    description: "Comprehensive liability insurance and all required trade licenses in Nigeria and UK",
    badge: "VERIFIED",
  },
  {
    icon: Award,
    title: "Industry Certifications",
    description: "Certified by leading industry bodies including RIBA, FMB, and COREN",
    badge: "CERTIFIED",
  },
  {
    icon: CheckCircle,
    title: "Quality Standards",
    description: "Adherence to international quality standards and building regulations",
    badge: "COMPLIANT",
  },
  {
    icon: Star,
    title: "Professional Recognition",
    description: "Recognized by Checkatrade, TrustMark, and other professional platforms",
    badge: "TRUSTED",
  },
]

const accreditations = [
  {
    name: "RIBA",
    fullName: "Royal Institute of British Architects",
    description: "Professional architectural standards",
    logo: "/images/Certifications4.jpg?height=80&width=80&text=RIBA",
  },
  {
    name: "FMB",
    fullName: "Federation of Master Builders",
    description: "UK construction excellence",
    logo: "/images/Certifications3.jpg?height=80&width=80&text=FMB",
  },
  {
    name: "COREN",
    fullName: "Council for Regulation of Engineering",
    description: "Nigerian engineering standards",
    logo: "/images/Certifications2.jpg?height=80&width=80&text=COREN",
  },
  {
    name: "TrustMark",
    fullName: "Government Endorsed Quality",
    description: "UK government quality scheme",
    logo: "/images/Certifications1.png?height=80&width=80&text=TrustMark",
  },
]

export default function CertificationsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-brand-blue mb-4">
            Certifications & Accreditations
          </h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Our professional certifications and industry memberships demonstrate our commitment
            to excellence, safety, and quality standards.
          </p>
        </motion.div>

        {/* Professional Standards (fade up stagger) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow duration-300 border-2 border-gray-100 hover:border-brand-green/30">
                <CardContent className="p-6">
                  <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <cert.icon className="h-8 w-8 text-brand-green" />
                  </div>
                  <div className="mb-3">
                    <span className="bg-brand-blue text-white text-xs px-2 py-1 rounded-full font-semibold">
                      {cert.badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-brand-blue mb-3">{cert.title}</h3>
                  <p className="text-sm text-brand-gray">{cert.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Accreditation Badges (scale in) */}
       {/* Accreditation Badges (marquee animation) */}
<motion.div
  className="bg-gray-50 rounded-lg p-8 overflow-hidden"
  initial={{ opacity: 0, scale: 0.95 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.7 }}
  viewport={{ once: true }}
>
  <h3 className="text-2xl font-bold text-brand-blue text-center mb-8">
    Professional Memberships
  </h3>

  {/* Marquee container */}
  <div className="relative w-full overflow-hidden">
    <div className="flex gap-12 animate-marquee">
      {accreditations.concat(accreditations).map((accred, index) => (
        <div
          key={index}
          className="text-center group min-w-[180px]"
        >
          <div className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 mb-4">
            <img
              src={accred.logo || "/placeholder.svg"}
              alt={accred.name}
              className="w-16 h-16 mx-auto object-contain"
            />
          </div>
          <h4 className="font-semibold text-brand-blue mb-1">{accred.name}</h4>
          <p className="text-sm text-brand-gray mb-1">{accred.fullName}</p>
          <p className="text-xs text-brand-gray">{accred.description}</p>
        </div>
      ))}
    </div>
  </div>
</motion.div>


        {/* Guarantees (fade in stagger) */}
        <motion.div
          className="mt-16 bg-brand-blue text-white rounded-lg p-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Our Guarantees</h3>
            <p className="text-lg opacity-90">Your peace of mind is our priority</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "12", title: "Month Warranty", desc: "Comprehensive workmanship guarantee" },
              { icon: "💰", title: "Money Back Promise", desc: "100% satisfaction or full refund" },
              { icon: "🛡️", title: "Full Insurance", desc: "Comprehensive liability coverage" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="bg-brand-green w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">{item.icon}</span>
                </div>
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-sm opacity-90">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
