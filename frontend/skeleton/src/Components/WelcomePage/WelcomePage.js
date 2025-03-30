import React from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./WelcomePage.css";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      {/* Background Video */}
      <video autoPlay loop muted className="background-video">
        <source src="/assets/terminal-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Carousel for feature overview */}
      <Carousel
        className="feature-carousel"
        autoPlay
        interval={4000} 
        infiniteLoop={false} 
        stopOnHover={false}
        showThumbs={false}
        showStatus={false}
        showIndicators={true}
        transitionTime={800}
      >
        <div className="carousel-slide">
          <h2>Tailored Project Setup</h2>
          <p>Choose the perfect stack for your project.</p>
        </div>
        <div className="carousel-slide">
          <h2>Optimized Dev Workflow</h2>
          <p>Save time by automating your setup process.</p>
        </div>
        <div className="carousel-slide">
          <h2>Flexible Tech Stack</h2>
          <p>React, Node, MongoDB – whatever you need!</p>
        </div>
        <div className="carousel-slide final-slide">
          <h1>Welcome to Skeleton</h1>
          <p>Start building your projects effortlessly.</p>
          <div className="button-group">
            <Link to="/signin" className="btn primary-btn">Sign Up</Link>
            <Link to="/login" className="btn secondary-btn">Login</Link>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default WelcomePage;