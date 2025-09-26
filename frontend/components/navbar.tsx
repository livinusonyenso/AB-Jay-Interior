"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "FAQ", href: "/faq" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      {/* <div className="bg-brand-blue text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>+234 (0) 123 456 7890</span>
            </div>
            <div className="flex items-center space-x-1">
              <Mail className="h-4 w-4" />
              <span>info@abjayinterior.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Serving Nigeria & UK</span>
          </div>
        </div>
      </div> */}

      {/* Main navbar */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
           <div className=" text-white p-2 rounded-lg">
  <img 
    src="https://res.cloudinary.com/dike9pceb/image/upload/v1757272579/slazzer_img_1744622557797_abhqep.png" 
    alt="Company Logo" 
    className="h-8 w-12 object-contain scale-250"
    
  />
</div>

            {/* <div>
              <h1 className="font-bold text-xl text-brand-blue">
                AB Jay Interior
              </h1>
              <p className="text-sm text-brand-gray">LTD</p>
            </div> */}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-brand-gray hover:text-brand-blue transition-colors font-medium"
              >
                {item.name}
              </Link>
            ))}
            <Button className="bg-brand-green hover:bg-brand-green/90 w-fit">
              <Link to={"/requestQuote"}>Request Quote</Link>
            </Button>{" "}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-brand-gray hover:text-brand-blue transition-colors font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
               <Button className="bg-brand-green hover:bg-brand-green/90 w-fit">
              <Link to={"/requestQuote"}>Request Quote</Link>
            </Button>{" "}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
