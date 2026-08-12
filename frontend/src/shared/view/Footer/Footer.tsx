import { Link } from "react-router";
import "./Footer.css"
import "./Responsive.css"
import { Trans } from "@lingui/react/macro";

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
        <h4><Trans>For the Users</Trans></h4>
        <Link to="/for-us"><Trans>For Us</Trans></Link>
        <Link to="/contacts"><Trans>Contacts</Trans></Link>
        <Link to="/for-employers"><Trans>For Employers</Trans></Link>
      </div>
      <div>
        <h4><Trans>Legal Information</Trans></h4>
        <Link to="/terms-and-conditions"><Trans>Terms and Conditions</Trans></Link>
        <Link to="/privacy"><Trans>Privacy</Trans></Link>
        <Link to="/cookies"><Trans>Cookies</Trans></Link>
      </div>
      <div>
        <h4><Trans>Career Advice</Trans></h4>
        <Link to="/career-advice/cv-tips"><Trans>CV Tips</Trans></Link>
        <Link to="/career-advice/interview-preparation"><Trans>Interview Preparation</Trans></Link>
        <Link to="/career-advice/salary-negotiation"><Trans>Salary Negotiation</Trans></Link>
      </div>
    </div>
    <div className="footer-socials">
      <h4><Trans>Follow Us</Trans></h4>
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
    <p>&copy; {new Date().getFullYear()} <Trans>JobBoard. All rights reserved.</Trans></p>
  </div>
</footer>
  );
}
