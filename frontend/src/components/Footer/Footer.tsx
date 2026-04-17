import { Link } from "react-router";
import "./Footer.css"
import "./Responsive.css"

export function Footer() {
  return (
 <footer className="footer">
  <div className="footer-top">
<div className="footer-logo-desc">
  <div className="footer-brand">
    <span className="logo">JB</span>
    <span className="footer-brand-text">JobBoard</span>
  </div>
</div>
    <div className="footer-links">
      <div>
        <h4>For the Users</h4>
        <a href="#">For us</a>
        <a href="#">Contacts</a>
        <a href="#">For Employers</a>
      </div>
      <div>
        <h4>Legal Information</h4>
        <a href="#">Terms and Conditions</a>
        <a href="#">Privacy</a>
        <a href="#">Cookies</a>
      </div>
      <div>
        <h4>General</h4>
        <a href="#">Events</a>
        <a href="#">Partners</a>
        <a href="#">Podcast</a>
      </div>
    </div>
    <div className="footer-socials">
      <h4>Follow Us</h4>
      <div className="social-icons">
        {/* You can use Font Awesome or SVG icons */}
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <i className="fab fa-tiktok"></i>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <i className="fab fa-youtube"></i>
        </a>
      </div>
    </div>
  </div>
  <div className="footer-bottom">
    <p>&copy; {new Date().getFullYear()} JobBoard. All rights reserved.</p>
    <span className="referenced">Referenced on Jobboardfinder</span>
  </div>
</footer>
  );
}
