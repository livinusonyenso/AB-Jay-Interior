import { Button } from "../components/ui/button"
import { ArrowRight, Star } from "lucide-react"
import { useTypewriter } from '../hooks/useTypewriter';
import { Link } from "react-router-dom";
import {AnimatedCounter} from "./AnimatedCounter"
export default function HeroSection() {
   const typewriterText = useTypewriter({
    words: [
      'Precision',
      'Style', 
      'Luxury Interiors',
      'Quality Redefined',
      'Timeless Design',
      'Innovation'
    ],
    delay: 3000,
    deleteDelay: 1000,
    typeSpeed: 120
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-blue to-brand-blue/80">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('/images/ab-jay-interior3.jpg?height=800&width=1200')`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-brand-green/20 backdrop-blur-sm border border-brand-green/30 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Star className="h-4 w-4 text-brand-green" />
            <span className="text-sm font-medium">Trusted by 500+ Clients</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            Transforming Spaces with <span className="text-brand-green">
              {typewriterText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto animate-slide-up animation-delay-200">
            Professional interior design and renovation services across Nigeria and the UK. We bring your vision to life
            with creativity, quality, and timely delivery.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up animation-delay-400">
            <Button
              size="lg"
              className="bg-brand-green hover:bg-brand-green/90 text-white px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all duration-200"
            >
              <Link to={"/requestQuote"}>
               Request a Quote
              </Link>
             
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-brand-blue px-8 py-4 text-lg font-semibold bg-transparent transform hover:scale-105 transition-all duration-200"
            >
              <Link to={"/gallery"}>View Our Work</Link>
            </Button>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 pt-8 border-t border-white/20">
            <AnimatedCounter
              end={500}
              suffix="+"
              label="Projects Completed"
              duration={2500}
              className="hover:scale-110 transition-transform duration-300"
            />
            <AnimatedCounter
              end={2}
              label="Countries Served"
              duration={2000}
              className="hover:scale-110 transition-transform duration-300"
            />
            <AnimatedCounter
              end={98}
              suffix="%"
              label="Client Satisfaction"
              duration={2800}
              className="hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  )
}