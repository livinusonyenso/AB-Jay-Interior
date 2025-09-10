// WhatsAppSupport.tsx
import React from "react";

interface WhatsAppSupportProps {
  phoneNumber: string; // WhatsApp number in international format, e.g., "2348012345678"
  message?: string;    // Optional pre-filled message
}

const WhatsAppSupport: React.FC<WhatsAppSupportProps> = ({
  phoneNumber,
  message = "Hello! I need support.",
}) => {
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#25D366",
        color: "#fff",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        textDecoration: "none",
        zIndex: 1000,
      }}
      title="Chat with us on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M20.52 3.48A11.923 11.923 0 0012 0C5.373 0 0 5.373 0 12c0 2.116.554 4.088 1.52 5.845L0 24l6.565-1.526A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12 0-3.204-1.25-6.206-3.48-8.52zM12 22c-1.99 0-3.847-.613-5.39-1.65l-.38-.24-3.9.907.836-3.814-.248-.387A9.958 9.958 0 012 12c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10zm5.084-7.587c-.273-.137-1.616-.797-1.866-.888-.25-.092-.432-.137-.614.137-.182.273-.703.888-.862 1.07-.159.182-.318.205-.591.069-.273-.137-1.152-.425-2.195-1.35-.813-.723-1.36-1.616-1.519-1.889-.159-.273-.017-.42.12-.556.123-.123.273-.318.409-.477.136-.159.182-.273.273-.455.091-.182.046-.341-.023-.477-.069-.137-.614-1.481-.841-2.03-.222-.531-.448-.459-.614-.468l-.523-.009c-.159 0-.416.059-.635.273s-.832.811-.832 1.977.853 2.29.971 2.448c.118.159 1.677 2.561 4.07 3.588 2.393 1.027 2.393.684 2.823.639.431-.045 1.398-.569 1.595-1.119.182-.523.182-.97.136-1.119-.046-.148-.168-.227-.273-.318z" />
      </svg>
    </a>
  );
};

export default WhatsAppSupport;
