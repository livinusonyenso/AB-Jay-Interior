import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle } from "lucide-react"

const Success: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  const goHome = () => {
    navigate("/")
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-brand-blue/10 to-brand-green/10 px-6">
      <div className="bg-white p-10 rounded-2xl shadow-lg max-w-lg w-full text-center animate-fadeIn">
        {/* Success Icon */}
        <CheckCircle className="w-16 h-16 text-brand-green mx-auto mb-4 animate-bounce" />

        {/* Heading */}
        <h1 className="text-3xl font-bold text-brand-green mb-2">Message Sent Successfully!</h1>

        {/* Subtext */}
        <p className="text-gray-600 mb-6">
          Thank you for contacting <span className="font-semibold text-brand-blue">AB Jay Interior LTD</span>.  
          Our team will review your request and get back to you within 24 hours.
        </p>

        {/* Company Branding */}
        <div className="bg-gray-50 p-5 rounded-xl mb-6">
          <h2 className="text-xl font-bold text-brand-blue">AB Jay Interior LTD</h2>
          <p className="text-gray-500 text-sm mt-1">
            Transforming spaces with precision & style across Nigeria and the UK.
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={goHome}
          className="bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 w-full shadow-md"
        >
          Back to Homepage
        </button>
      </div>
    </div>
  )
}

export default Success
