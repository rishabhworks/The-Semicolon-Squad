import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>&copy; {new Date().getFullYear()} Skeleton App. All rights reserved.</p>
      <div className="footer-links">
      </div>
    </footer>
  );
};

export default Footer;
