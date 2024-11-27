import running from "../images/running.png";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/loading.css";

const LoadingAnimation = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 3000); // Adjust as needed
    return () => clearTimeout(timer);
  }, []);

  if (isLoaded) {
    return null; // Don't render once loading is complete
  }

  return (
    <div className="loading-container">
      <motion.div
        className="moving-car"
        initial={{ x: "100%", y: 0 }}
        animate={{ x: "-100%", y: [0, -10, 0] }}
        transition={{
          duration: 4, // Increase duration for smoother motion
          repeat: Infinity,
          ease: "easeInOut", // Smooth easing function
        }}
      
      >
        <img
          src={running} // Replace with actual path
          alt="Car"
          className="car-image"
        />
      </motion.div>
      {/* Animated Dots */}
      <div className="loading-dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>  
        
      </div>
    </div>
  );
};

export default LoadingAnimation;
