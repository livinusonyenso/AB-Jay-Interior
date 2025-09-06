import { Link } from "react-router-dom"
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-white text-brand-blue p-2 rounded-lg">
                <span className="font-bold text-xl">AJ</span>
              </div>
              <div>
                <h3 className="font-bold text-xl">AB Jay Interior</h3>
                <p className="text-sm opacity-80">LTD</p>
              </div>
            </div>
            <p className="text-sm opacity-80">Transforming spaces with precision & style across Nigeria and the UK.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/" className="block hover:text-brand-green transition-colors">
                Home
              </Link>
              <Link to="/about" className="block hover:text-brand-green transition-colors">
                About Us
              </Link>
              <Link to="/services" className="block hover:text-brand-green transition-colors">
                Services
              </Link>
              <Link to="/gallery" className="block hover:text-brand-green transition-colors">
                Gallery
              </Link>
              <Link to="/faq" className="block hover:text-brand-green transition-colors">
                FAQ
              </Link>
              <Link to="/contact" className="block hover:text-brand-green transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Our Services</h4>
            <div className="space-y-2 text-sm">
              <p>Residential Design</p>
              <p>Office Setup</p>
              <p>Full Renovation</p>
              <p>Plastering & Tiling</p>
              <p>Interior Decoration</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+234 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@abjayinterior.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Lagos, Nigeria & London, UK</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-4">
              <Facebook className="h-5 w-5 hover:text-brand-green cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 hover:text-brand-green cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 hover:text-brand-green cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2024 AB Jay Interior LTD. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
