import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiX, FiGift } from 'react-icons/fi';
import '../styles/WelcomeNotification.css';

export function WelcomeNotification({ isOpen, onClose, referralData }) {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      onClose();
    }
  }, [isOpen, countdown, onClose]);

  const notificationVariants = {
    hidden: {
      opacity: 0,
      y: -100,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.95,
      transition: {
        duration: 0.3
      }
    }
  };

  const sparkleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="welcome-notification-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="welcome-notification"
            variants={notificationVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Sparkle Effects */}
            <div className="sparkle-container">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`sparkle sparkle-${i}`}
                  variants={sparkleVariants}
                  initial="hidden"
                  animate="visible"
                  style={{ animationDelay: `${i * 0.3}s` }}
                >
                  ✨
                </motion.div>
              ))}
            </div>

            <button className="close-btn" onClick={onClose}>
              <FiX />
            </button>

            <div className="notification-content">
              <motion.div
                className="welcome-icon"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <FiGift />
              </motion.div>

              <motion.h3
                className="welcome-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Welcome to PinPeer! 🎉
              </motion.h3>

              <motion.p
                className="welcome-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                You've been invited to join the creator economy revolution!
                {referralData?.creator && (
                  <span className="creator-highlight">
                    {' '}Check out {referralData.creator.replace(/-/g, ' ')} and discover amazing creators.
                  </span>
                )}
              </motion.p>

              <motion.div
                className="bonus-section"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="bonus-badge">
                  <span className="bonus-icon">🎁</span>
                  <span className="bonus-text">+5 Rep Points</span>
                </div>
                <p className="bonus-description">Welcome bonus for joining through a friend!</p>
              </motion.div>

              <motion.div
                className="action-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  className="get-started-btn"
                  onClick={onClose}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>

                <div className="countdown">
                  <span className="countdown-text">Auto-close in {countdown}s</span>
                  <div className="countdown-bar">
                    <motion.div
                      className="countdown-progress"
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{ duration: 5, ease: "linear" }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}