import RequestQuoteForm from "../../components/RequestQuoteForm";
import { useState } from "react";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Phone, Mail, MessageCircle, } from "lucide-react"


function RequestQuote() {
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      phone: "",
      service: "",
      message: "",
      contactMethod: "email",
    })

  const handleWhatsApp = () => {
    const message = `Hi AB Jay Interior! I'm interested in your services. My name is ${formData.name || "[Name]"} and I'd like to discuss ${formData.service || "your services"}.`
    const whatsappUrl = `https://wa.me/2341234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }
  return (
    <div>
      <main className="min-h-screen">
        <Navbar />

        <RequestQuoteForm />
            <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="bg-brand-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-brand-green" />
                </div>
                <h3 className="text-xl font-semibold text-brand-blue mb-2">Call Us</h3>
                <p className="text-brand-gray mb-4">Speak directly with our team</p>
                <div className="space-y-2">
                  <p className="font-medium">Nigeria: +234 (0) 123 456 7890</p>
                  <p className="font-medium">UK: +44 (0) 20 1234 5678</p>
                </div>
                <Button
                  className="mt-4 bg-brand-green hover:bg-brand-green/90"
                  onClick={() => window.open("tel:+2341234567890")}
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>

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

        <Footer />
      </main>
    </div>
  );
}

export default RequestQuote;
