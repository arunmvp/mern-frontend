import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import {
  FaFacebookF,
  FaPinterestP,
  FaInstagram,
  FaTwitter,
  FaDribbble,
  FaShippingFast,
  FaHeadset,
  FaUndoAlt,
  FaLock,
} from "react-icons/fa"; // ✅ Added feature icons here
import "./Footer.css";

const Footer = () => {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_jie76dg",   // replace with EmailJS service ID
        "template_qmcr86s",  // replace with EmailJS template ID
        form.current,
        "DmrHis-fpWPHvsWr_"    // replace with EmailJS public key
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("Subscription successful!");
          e.target.reset();
          setTimeout(() => setStatus(""), 3000);
        },
        (error) => {
          console.log(error.text);
          setStatus("Something went wrong. Try again.");
        }
      );
  };

  return (
    <footer className="footer">
      {/* ============ TOP FEATURES SECTION ============ */}
      <div className="footer-top">
        <div className="feature">
          <FaShippingFast className="feature-icon" />
          <h4>FREE SHIPPING</h4>
          <p>Free shipping on all US orders or orders above $99</p>
        </div>
        <div className="feature">
          <FaHeadset className="feature-icon" />
          <h4>ONLINE SUPPORT 24/7</h4>
          <p>We’re here to help anytime, anywhere</p>
        </div>
        <div className="feature">
          <FaUndoAlt className="feature-icon" />
          <h4>7 DAYS RETURN</h4>
          <p>Easy returns within 7 days of purchase</p>
        </div>
        <div className="feature">
          <FaLock className="feature-icon" />
          <h4>PAYMENT SECURE</h4>
          <p>100% secure payment processing</p>
        </div>
      </div>

      {/* ============ MAIN FOOTER SECTION ============ */}
      <div className="footer-main">
        {/* Support Links */}
        <div className="footer-column">
          <h3>SUPPORT</h3>
          <ul>
            <li>Contact</li>
            <li>Store locator</li>
            <li>Account</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="footer-column center">
          <h3>JOIN OUR COMMUNITY</h3>
          <p>
            Subscribe to receive updates, access to exclusive deals, and more
          </p>

          <form ref={form} onSubmit={sendEmail} className="subscribe-form">
            <input
              type="email"
              name="user_email"
              placeholder="Enter your email"
              required
            />
            <button type="submit">SUBSCRIBE</button>
          </form>

          {status && <p className="status-msg">{status}</p>}

          <div className="social-icons">
            <FaFacebookF />
            <FaPinterestP />
            <FaInstagram />
            <FaTwitter />
            <FaDribbble />
          </div>
        </div>

        {/* About Links */}
        <div className="footer-column">
          <h3>ABOUT</h3>
          <ul>
            <li>Our story</li>
            <li>Our mission</li>
            <li>Jobs</li>
            <li>Blog</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 E-Comm</p>
      </div>
    </footer>
  );
};

export default Footer;
