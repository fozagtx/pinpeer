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

  // Sort creators by total donations in descending order and take the top 6 for gallery layout
  const topCreators = creators.sort((a, b) => b.totalDonations - a.totalDonations).slice(0, 6);

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
        <h2 className="carousel-title">Featured Creators</h2>
        <p className="carousel-subtitle">Discover top-rated creators in our community</p>
      </motion.div>

      <motion.div
        className="carousel-gallery"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {topCreators.map((creator, index) => (
          <motion.div
            key={creator.id}
            className={`gallery-card ${index === 0 ? 'featured-main' : ''}`}
            variants={cardVariants}
            whileHover={{
              scale: 1.05,
              y: -10,
              transition: { type: "spring", stiffness: 400, damping: 25 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="card-background" />
            <div className="card-content">
              <div className="avatar-container">
                <img src={creator.avatar} alt={creator.name} className="gallery-avatar" />
                <div className="avatar-glow" />
              </div>
              <div className="creator-details">
                <h3 className="gallery-name">{creator.name}</h3>
                <p className="gallery-project">{creator.project}</p>
                <div className="stats-container">
                  <span className="donation-count">{creator.totalDonations} STX</span>
                  <span className="rating">⭐ {(Math.random() * 2 + 3).toFixed(1)}</span>
                </div>
              </div>
            </div>
            <div className="card-overlay" />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FeaturedCarousel;