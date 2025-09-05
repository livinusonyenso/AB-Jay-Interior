"use client"

import { useState } from "react"
import { Card, CardContent } from "../components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqs = [
  {
    category: "Services & Pricing",
    questions: [
      {
        question: "What services do you offer?",
        answer:
          "We offer comprehensive interior design services including residential design, office setup, full renovations, interior decoration, plastering & tiling, and custom design solutions. We serve both residential and commercial clients across Nigeria and the UK.",
      },
      {
        question: "How much do your services cost?",
        answer:
          "Our pricing varies based on project scope, location, and requirements. Residential design starts from ₦500,000, office setups from ₦800,000, and full renovations from ₦2,000,000. We provide detailed quotes after an initial consultation to ensure transparency.",
      },
      {
        question: "Do you offer free consultations?",
        answer:
          "Yes! We offer free initial consultations where we discuss your vision, assess your space, and provide preliminary recommendations. This helps us understand your needs and allows you to get to know our team before committing to a project.",
      },
    ],
  },
  {
    category: "Project Process",
    questions: [
      {
        question: "How long does a typical project take?",
        answer:
          "Project timelines vary depending on scope and complexity. Interior decoration projects typically take 2-4 weeks, residential designs 4-8 weeks, and full renovations 8-16 weeks. We provide detailed timelines during the planning phase and keep you updated throughout.",
      },
      {
        question: "What is your design process?",
        answer:
          "Our process includes: 1) Initial consultation and space assessment, 2) Concept development and 3D visualizations, 3) Material selection and procurement, 4) Project execution with regular updates, and 5) Final walkthrough and handover. We involve you at every step.",
      },
      {
        question: "Can I make changes during the project?",
        answer:
          "Yes, we understand that preferences can evolve. Minor changes can usually be accommodated, though they may affect timeline and cost. We discuss any implications before implementing changes to ensure you're fully informed.",
      },
    ],
  },
  {
    category: "Locations & Coverage",
    questions: [
      {
        question: "Which areas do you serve?",
        answer:
          "We serve major cities across Nigeria including Lagos, Abuja, Port Harcourt, and Kano. In the UK, we cover London, Manchester, Birmingham, and surrounding areas. Contact us to confirm coverage for your specific location.",
      },
      {
        question: "Do you work on projects outside these areas?",
        answer:
          "We can consider projects outside our standard coverage areas depending on the project size and scope. Additional travel costs may apply. Contact us to discuss your specific location and requirements.",
      },
    ],
  },
  {
    category: "Quality & Guarantees",
    questions: [
      {
        question: "Do you provide warranties on your work?",
        answer:
          "Yes, we provide a 12-month workmanship warranty on all our projects. This covers any issues related to our installation and craftsmanship. Material warranties are provided by manufacturers and vary by product.",
      },
      {
        question: "What if I'm not satisfied with the work?",
        answer:
          "Client satisfaction is our priority. We conduct regular check-ins during projects and a final walkthrough before completion. If any issues arise, we work quickly to address them. Our goal is 100% client satisfaction.",
      },
      {
        question: "Are you insured and licensed?",
        answer:
          "Yes, we are fully licensed and carry comprehensive liability insurance in both Nigeria and the UK. We maintain all necessary trade certifications and are members of relevant professional bodies.",
      },
    ],
  },
  {
    category: "Getting Started",
    questions: [
      {
        question: "How do I get started with my project?",
        answer:
          "Simply contact us through our website, phone, or WhatsApp to schedule your free consultation. We'll discuss your vision, assess your space, and provide a detailed proposal with timeline and pricing.",
      },
      {
        question: "What should I prepare for the consultation?",
        answer:
          "Come with your ideas, inspiration photos, budget range, and any specific requirements. We'll handle the rest! If you have existing floor plans or measurements, those are helpful but not required.",
      },
      {
        question: "Do you work with existing furniture?",
        answer:
          "We can incorporate your existing furniture into new designs, suggest modifications, or recommend new pieces to complement what you already have. We aim to maximize your investment while achieving your desired aesthetic.",
      },
    ],
  },
]

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-blue mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Find answers to common questions about our services, process, and policies. Can't find what you're looking
            for? Contact us directly.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h3 className="text-2xl font-semibold text-brand-blue mb-6 border-b border-brand-green/20 pb-2">
                {category.category}
              </h3>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const itemId = `${categoryIndex}-${faqIndex}`
                  const isOpen = openItems.includes(itemId)

                  return (
                    <Card
                      key={faqIndex}
                      className="border-2 border-gray-100 hover:border-brand-green/30 transition-colors duration-300"
                    >
                      <CardContent className="p-0">
                        <button
                          className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
                          onClick={() => toggleItem(itemId)}
                        >
                          <h4 className="text-lg font-semibold text-brand-blue pr-4">{faq.question}</h4>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-brand-green flex-shrink-0" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-brand-green flex-shrink-0" />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-6 pb-6">
                            <p className="text-brand-gray leading-relaxed">{faq.answer}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 text-center bg-white rounded-lg p-8 shadow-md">
          <h3 className="text-2xl font-bold text-brand-blue mb-4">Still Have Questions?</h3>
          <p className="text-brand-gray mb-6">
            Our team is here to help! Contact us for personalized answers to your specific questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-300"
            >
              Contact Us
            </a>
            <a
              href="https://wa.me/2341234567890"
              className="bg-brand-blue hover:bg-brand-blue/90 text-white px-6 py-3 rounded-md font-semibold transition-colors duration-300"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
