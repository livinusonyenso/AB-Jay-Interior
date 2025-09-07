
const partners = [
  {
    name: "Checkatrade",
    description: "Verified Trade Professional",
    logo: "https://res.cloudinary.com/dike9pceb/image/upload/v1757272580/Certifications1_uux6cb.png",
  },
  {
    name: "IGBOSERVICE",
    description: "Trusted Service Provider",
    logo: "https://res.cloudinary.com/dike9pceb/image/upload/v1757272578/Certifications2_jps0u2.jpg",
  },
  {
    name: "Federation of Master Builders",
    description: "UK Construction Standards",
    logo: "https://res.cloudinary.com/dike9pceb/image/upload/v1757272579/Certifications3_tehhkg.jpg",
  },
  {
    name: "COREN",
    description: "Council for Regulation of Engineering",
    logo: "https://res.cloudinary.com/dike9pceb/image/upload/v1757272579/Certifications4_kqds26.jpg",
  },
  {
    name: "RIBA",
    description: "Royal Institute of British Architects",
    logo: "https://res.cloudinary.com/dike9pceb/image/upload/v1757272578/Certifications5_tpgeuo.jpg",
  },
  {
    name: "TrustMark",
    description: "Government Endorsed Quality",
    logo: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=160&h=80&fit=crop",
  },
  // {
  //   name: "NIOB",
  //   description: "Nigerian Institute of Building",
  //   logo: "https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg?auto=compress&cs=tinysrgb&w=160&h=80&fit=crop",
  // },
  // {
  //   name: "ARCON",
  //   description: "Architects Registration Council",
  //   logo: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=160&h=80&fit=crop",
  // },
];

export default function OurPartners() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            Trusted By
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our <span className="text-blue-600">Partners</span> & <span className="text-green-500">Certifications</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We collaborate with industry-leading organizations and maintain professional certifications to deliver exceptional quality and service standards.
          </p>
        </div>

        {/* Infinite Partner Carousel */}
        <div className="relative overflow-hidden bg-gray-50 rounded-2xl py-8">
          {/* Fade Gradients */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
          
          {/* Carousel Track */}
          <div className="flex animate-marquee">
            {/* First set of logos */}
            {partners.map((partner, index) => (
              <div key={`first-${index}`} className="flex-shrink-0 mx-12">
                <div className="w-40 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-32 max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div key={`second-${index}`} className="flex-shrink-0 mx-12">
                <div className="w-40 h-20 flex items-center justify-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-32 max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators Grid */}
        <div className="mt-16 pt-12 border-t border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-green-200 transition-colors duration-300">
                <span className="text-2xl font-bold text-green-600">✓</span>
              </div>
              <h4 className="font-semibold text-blue-600 mb-2">
                Fully Insured
              </h4>
              <p className="text-sm text-gray-500">
                Comprehensive liability coverage
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-green-200 transition-colors duration-300">
                <span className="text-2xl font-bold text-green-600">★</span>
              </div>
              <h4 className="font-semibold text-blue-600 mb-2">
                5-Star Rated
              </h4>
              <p className="text-sm text-gray-500">
                Consistently excellent customer reviews
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-green-200 transition-colors duration-300">
                <span className="text-2xl font-bold text-green-600">🛡</span>
              </div>
              <h4 className="font-semibold text-blue-600 mb-2">
                Quality Guarantee
              </h4>
              <p className="text-sm text-gray-500">
                12-month workmanship warranty included
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-green-200 transition-colors duration-300">
                <span className="text-2xl font-bold text-green-600">📋</span>
              </div>
              <h4 className="font-semibold text-blue-600 mb-2">
                Licensed & Certified
              </h4>
              <p className="text-sm text-gray-500">
                All relevant trade certifications maintained
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}