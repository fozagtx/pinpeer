import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { CreatorCard } from "./CreatorCard";
import "../styles/CreatorsGrid.css";

export function CreatorsGrid({
  creators,
  onDonate,
  connected,
  selectedCard,
  onAmountSelect,
  pinnedPeers,
  isPeersView = false,
}) {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(headerRef, { once: true, margin: "-100px" });
  const y = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1, 1, 0.8, 0.6]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="creators-container"
      style={{ y, opacity }}
    >
      <motion.div
        ref={headerRef}
        className="creators-header"
        variants={headerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <h1 className="creators-title">
          {isPeersView ? "My Pinned Peers" : "Support Amazing Creators"}
        </h1>
        <p className="creators-subtitle">
          {isPeersView
            ? "Creators you have supported with STX donations"
            : "Pin your favorite peers and support their work with STX"}
        </p>
      </motion.div>

      <motion.div
        className="creators-grid"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {creators.length === 0 && isPeersView ? (
          <motion.div
            className="empty-peers"
            variants={emptyStateVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="empty-icon">📌</div>
            <p>You haven't pinned any peers yet!</p>
            <p className="empty-peers-subtitle">
              Support creators to see them here
            </p>
          </motion.div>
        ) : (
          creators.map((creator, index) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.1
              }}
            >
              <CreatorCard
                creator={creator}
                onDonate={onDonate}
                connected={connected}
                selectedAmount={
                  selectedCard?.creatorId === creator.id
                    ? selectedCard.amount
                    : null
                }
                onAmountSelect={(amount) => onAmountSelect(creator.id, amount)}
                isPinned={pinnedPeers?.some((p) => p.id === creator.id)}
              />
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}
