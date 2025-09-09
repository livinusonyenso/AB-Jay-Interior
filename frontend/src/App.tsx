import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import FAQPage from "./pages/FAQPage";
import GalleryPage from "./pages/GalleryPage";
import ServicesPage from "./pages/ServicesPage";
import ScrollToTop from "../components/ScrollToTop.tsx";
import RequestQuote from "./pages/RequestQuote.tsx";
import "./index.css";
import AdminPanel from "./pages/AdminPanel.tsx";
import Success from "../components/Success.tsx";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
       <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/about" element={<AboutPage />} />
  <Route path="/contact" element={<ContactPage />} />
  <Route path="/faq" element={<FAQPage />} />
  <Route path="/gallery" element={<GalleryPage />} />
  <Route path="/services" element={<ServicesPage />} />
  <Route path="/requestQuote" element={<RequestQuote />} />
  <Route path="/success" element={<Success />} />

  {/* Auth / Admin routes */}
  <Route path="/login" element={<AdminPanel />} />
  <Route path="/admin/*" element={<AdminPanel />} />
</Routes>

      </div>
    </Router>
  );
}

export default App;
