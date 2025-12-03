import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Splash() {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowText(true), 1000);  
    setTimeout(() => navigate("/auth/login"), 2000); 
  }, [navigate]);

  return (
    <div className="w-full h-screen bg-[#0A84FF] flex items-center justify-center">
      <h1
        className={`text-white text-[28px] font-bold transition-opacity duration-700 ${
          showText ? "opacity-100" : "opacity-0"
        }`}
      >
        ChileExperience
      </h1>
    </div>
  );
}
