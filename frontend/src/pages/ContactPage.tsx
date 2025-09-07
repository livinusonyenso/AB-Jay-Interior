"use client"

import type React from "react"
import { useState } from "react"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Phone, Mail, MessageCircle, Send } from "lucide-react"
import { toast } from "sonner"
import Success from "../../components/success" // ✅ import your Success component

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    contactMethod: "email",
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const API_URL = "http://localhost:5000/api/contact"

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to send message")
      }

      toast.success("✅ Message sent successfully!")
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        contactMethod: "email",
      })
      setSubmitted(true) // ✅ show Success component
    } catch (error: any) {
      console.error("❌ Error:", error)
      toast.error("Failed to send message. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsApp = () => {
    const message = `Hi AB Jay Interior! I'm interested in your services. My name is ${formData.name || "[Name]"} and I'd like to discuss ${formData.service || "your services"}.`
    const whatsappUrl = `https://wa.me/23480984499?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  if (submitted) {
    return <Success /> // ✅ render success page instead of form
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-brand-blue/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Ready to transform your space? Get in touch with our team for a free consultation and let's bring your
              vision to life.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info (unchanged) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Call */}
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold text-brand-blue mb-2">Call Us</h3>
                <p className="text-brand-gray mb-4">Speak directly with our team</p>
                <div className="space-y-2">
                  <p className="font-medium">Nigeria: +234 (0) 123 456 7890</p>
                  <p className="font-medium">UK: +44 7830 761529</p>
                </div>
                <Button
                  className="mt-4 bg-brand-green hover:bg-brand-green/90"
                  onClick={() => window.open("tel:+2341234567890")}
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>

            {/* WhatsApp */}
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="bg-brand-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-brand-blue" />
                </div>
                <h3 className="text-xl font-semibold text-brand-blue mb-2">WhatsApp</h3>
                <p className="text-brand-gray mb-4">Quick chat for instant response</p>
                <p className="font-medium mb-4">+234 (0) 123 456 7890</p>
                <Button className="bg-brand-green hover:bg-brand-green/90" onClick={handleWhatsApp}>
                  Chat on WhatsApp
                </Button>
              </CardContent>
            </Card>

            {/* Email */}
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="bg-brand-red/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-brand-red" />
                </div>
                <h3 className="text-xl font-semibold text-brand-blue mb-2">Email Us</h3>
                <p className="text-brand-gray mb-4">Send us a detailed message</p>
                <p className="font-medium mb-4">info@abjayinterior.com</p>
                <Button
                  variant="outline"
                  className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white bg-transparent"
                  onClick={() => window.open("mailto:info@abjayinterior.com")}
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-brand-blue mb-6">Get a Free Quote</h2>
              <p className="text-brand-gray mb-8">
                Fill out the form below and we'll get back to you within 24 hours with a personalized quote for your
                project.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name + Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-gray mb-2">Full Name *</label>
                    <Input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-gray mb-2">Email Address *</label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                {/* Phone + Service */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-gray mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 (0) 123 456 7890"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-gray mb-2">Service Needed</label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) => setFormData({ ...formData, service: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="residential">Residential Design</SelectItem>
                        <SelectItem value="office">Office Setup</SelectItem>
                        <SelectItem value="renovation">Full Renovation</SelectItem>
                        <SelectItem value="decoration">Interior Decoration</SelectItem>
                        <SelectItem value="plastering">Plastering & Tiling</SelectItem>
                        <SelectItem value="custom">Custom Solutions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-brand-gray mb-2">Project Details *</label>
                  <Textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your project, timeline, budget, and any specific requirements..."
                  />
                </div>

                {/* Contact Method */}
                <div>
                  <label className="block text-sm font-medium text-brand-gray mb-2">Preferred Contact Method</label>
                  <Select
                    value={formData.contactMethod}
                    onValueChange={(value) => setFormData({ ...formData, contactMethod: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-green hover:bg-brand-green/90 text-white py-3 flex items-center justify-center"
                >
                  {loading ? "Sending..." : (<><Send className="mr-2 h-5 w-5" /> Send Message</>)}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
