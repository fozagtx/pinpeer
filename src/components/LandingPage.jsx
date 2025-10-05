import { motion } from "framer-motion";
import { RiDiscordFill, RiTwitterXLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa6";
import "../styles/LandingPage.css";

export function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="hero-section">
          <h1 className="hero-title">Support Amazing Creators</h1>
          <p className="hero-subtitle">
            Pin your favorite peers and support their work with STX
          </p>
        </div>
      </div>

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="footer-container">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-text">PinPeer</span>
              </div>

              <div className="footer-social">
                <a
                  href="https://github.com/pinpeer"
                  className="footer-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="footer-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
