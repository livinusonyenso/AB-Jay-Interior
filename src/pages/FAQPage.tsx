import Navbar from "../../components/navbar"
import Footer from "../../components/footer"
import FAQSection from "../../components/faq-section"

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-brand-blue to-brand-blue/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
            <p className="text-xl md:text-2xl opacity-90">
              Everything you need to know about our interior design services, process, and policies. Get instant answers
              to common questions.
            </p>
          </div>
        </div>
      </section>

      <FAQSection />
      <Footer />
    </main>
  )
}
