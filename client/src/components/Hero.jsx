import React from "react";

import "../styles/hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  // Function to handle the button click
  const handleBookAuto = () => {
    navigate("/Drivers"); // Navigate to the login page
  };
  return (
    <>
    <div className="home-container">
    <h1 className="home-title">GOT stuck?</h1>
      <div className="home-content">
       
      
        <div className="loading-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>

        </div>
      
        <button className="book-auto" onClick={handleBookAuto}>Book Now</button>

      </div>
    </div>
   
    
   
  </>
  
  );

};

export default Hero;
