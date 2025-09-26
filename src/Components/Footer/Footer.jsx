// Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import "./Footer.css";
import logo from '../../assets/logo/logo.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About */}
        <div className="footer-section">
          <h3>
            <span className="footer-logo"><img style={{border:"1px solid white", borderRadius:"12px", padding:"8px 12px"}} src={logo} alt="" />E-Comm</span>
          </h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever. Since the 1500s, when an unknown printer.
          </p>
        </div>

        {/* Social */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <p>
            Since the 1500s, when an unknown printer took a galley of type and
            scrambled.
          </p>
          <div className="social-icons">
            <FaFacebookF />
            <FaTwitter />
          </div>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            E-Comm, 4578 Marmora Road,
            <br />
            Glasgow D04 89GR
          </p>
        </div>
      </div>
    </footer>
  );
}
