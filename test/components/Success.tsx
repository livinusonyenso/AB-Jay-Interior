import React from "react";
import { useNavigate } from "react-router-dom";

const Success: React.FC = () => {
  const navigate = useNavigate();

  const goHome = (): void => {
    navigate("/"); // Redirect to homepage
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f3f4f6", // light gray background
        color: "#1e3a8a", // blue text
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ color: "rgb(16 185 129)", marginBottom: "20px" }}>
          Success!
        </h1>
        <p style={{ color: "#6b7280", marginBottom: "30px" }}>
          Your action was completed successfully.
        </p>
        <button
          onClick={goHome}
          style={{
            backgroundColor: "rgb(16 185 129)",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
          onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) =>
            (e.currentTarget.style.backgroundColor = "#059669")
          }
          onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) =>
            (e.currentTarget.style.backgroundColor = "rgb(16 185 129)")
          }
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default Success;
