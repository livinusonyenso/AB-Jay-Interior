import Navbar from "../../components/navbar"
import {HeroSection} from "../../components/hero-section"
import {WhatWeDo} from "../../components/what-we-do"
import WhyChooseUs from "../../components/why-choose-us"
import {PortfolioGrid} from "../../components/PortfolioGrid"
import ProjectHighlights from "../../components/project-highlights"
import OurPartners from "../../components/our-partners"
import Testimonials from "../../components/testimonials"
import Footer from "../../components/footer"
import FAQSection from "../../components/faq-section"
import RecentProjects from "../../components/RecentProjects"
import YouTubeShowcase from "../../components/YouTubeShowcase"

export default function HomePage() {
  const youtubeVideos = [
    'https://youtu.be/keCnmX8wK0c?si=rpNToHB3waSeHUC4',
    'https://youtu.be/5LCNhMPNKxY?si=V3AkEq6tsvgy9HDN',
    'https://youtu.be/eBGrSOWSjHk?si=YIrNTPORhjNEsOTa',
    'https://youtu.be/YVd9ldO0y5s?si=_GFrpAjYX3OXzf06',
    'https://youtu.be/7j2fhqRJe1E?si=OtPIfN2hRfWoed12'
  ];
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhatWeDo />
      <PortfolioGrid />
      <WhyChooseUs />
      <ProjectHighlights />
      <RecentProjects/>
      <OurPartners />
      <Testimonials />
       <YouTubeShowcase 
        videos={youtubeVideos} 
        title="Our Project Stories" 
      />
      <FAQSection />
      <Footer />
    </main>
  )
}
