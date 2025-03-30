import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const WelcomePage = () => {
  return (
    <div className="homepage-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src="/assets/terminal-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="overlay">
        {/* Optional: Slider for key features */}
        <Carousel 
          className="feature-carousel" 
          autoPlay 
          interval={2000} 
          infiniteLoop={false} // Stop the carousel from looping
          showArrows={false}    // Hide the default arrows
          showStatus={false}    // Hide the status indicator (like slide number)
        >
          <div>
            <h2>Tailored Project Setup</h2>
            <p>Choose the perfect stack for your project.</p>
          </div>
          <div>
            <h2>Optimized Dev Workflow</h2>
            <p>Save time by automating your setup process.</p>
          </div>
          <div>
            <h2>Flexible Tech Stack</h2>
            <p>React, Node, MongoDB – whatever you need!</p>
          </div>
          <div>
            <h2>Welcome to Our Project Setup</h2>
            <p>Get started with configuring your project to your tailored tech stack!</p>
            <div className="button-container">
              <Link to="/login" className="button-link">
                <button className="button">Login</button>
              </Link>
              <Link to="/signin" className="button-link">
                <button className="button">Sign Up</button>
              </Link>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default WelcomePage;