import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import '../styles/FeaturedCarousel.css';

const FeaturedCarousel = ({ creators }) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(titleRef, { once: true, margin: "-100px" });
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  // Get the top creator for "Creator of the Week"
  const creatorOfTheWeek = creators.sort((a, b) => b.totalDonations - a.totalDonations)[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="featured-carousel"
      style={{ y, opacity }}
    >
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="carousel-header"
      >
        <h2 className="carousel-title">Creator of the Week</h2>
        <p className="carousel-subtitle">Celebrating our most supported creator this week</p>
      </motion.div>

      {creatorOfTheWeek && (
        <motion.div
          className="featured-creator-card"
          variants={cardVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          whileHover={{
            scale: 1.02,
            y: -5,
            transition: { type: "spring", stiffness: 400, damping: 25 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="featured-background" />
          <div className="featured-content">
            <div className="featured-badge">
              <span className="crown-icon">👑</span>
              <span className="badge-text">Creator of the Week</span>
            </div>

            <div className="featured-main-content">
              <div className="featured-avatar-section">
                <div className="avatar-wrapper">
                  <img
                    src={creatorOfTheWeek.avatar}
                    alt={creatorOfTheWeek.name}
                    className="featured-avatar"
                  />
                  <div className="avatar-ring" />
                  <div className="avatar-glow" />
                </div>
              </div>

              <div className="featured-info">
                <h3 className="featured-name">{creatorOfTheWeek.name}</h3>
                <p className="featured-project">{creatorOfTheWeek.project}</p>
                <p className="featured-description">{creatorOfTheWeek.description}</p>

                <div className="featured-stats">
                  <div className="stat-item">
                    <span className="stat-icon">💎</span>
                    <span className="stat-value">{creatorOfTheWeek.totalDonations} STX</span>
                    <span className="stat-label">Total Received</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">⭐</span>
                    <span className="stat-value">{(Math.random() * 2 + 3).toFixed(1)}</span>
                    <span className="stat-label">Rating</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-icon">🏆</span>
                    <span className="stat-value">#{Math.floor(Math.random() * 5) + 1}</span>
                    <span className="stat-label">Rank</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="featured-actions">
              <motion.button
                className="support-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Scroll to the creators grid
                  document.querySelector('.creators-grid')?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                <span className="btn-icon">📌</span>
                Support This Creator
              </motion.button>
            </div>
          </div>
          <div className="featured-highlight" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default FeaturedCarousel;