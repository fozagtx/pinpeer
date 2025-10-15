import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import "../styles/CreatorCard.css";

export function CreatorCard({
  creator,
  onDonate,
  connected,
  selectedAmount,
  onAmountSelect,
  isPinned = false,
}) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  const handlePinPeer = () => {
    if (selectedAmount && connected) {
      onDonate(creator.stacksAddress, selectedAmount, creator.name, creator.id);
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.6
      }
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`creator-card ${isPinned ? "pinned" : ""}`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{
        y: -5,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="card-glass-bg" />
      <div className="card-content-wrapper">
        <div className="card-header">
          <div className="avatar-wrapper">
            <img src={creator.avatar} alt={creator.name} className="avatar" />
            <div className="avatar-ring" />
          </div>
          <div className="creator-info">
            <h3 className="creator-name">{creator.name}</h3>
            <p className="creator-project">{creator.project}</p>
          </div>
          {isPinned && (
            <motion.div
              className="pinned-badge"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <span>⭐</span> Pinned
            </motion.div>
          )}
        </div>

        <p className="creator-description">{creator.description}</p>

        <div className="donation-section">
          <div className="donation-amounts">
            {creator.donations.map((amount) => (
              <motion.button
                key={amount}
                className={`amount-button ${selectedAmount === amount ? "selected" : ""}`}
                onClick={() => onAmountSelect(amount)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {amount} STX
              </motion.button>
            ))}
          </div>

          <motion.button
            className="pin-peer-button"
            onClick={handlePinPeer}
            disabled={!selectedAmount || !connected}
            whileHover={!selectedAmount || !connected ? {} : { scale: 1.02 }}
            whileTap={!selectedAmount || !connected ? {} : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            {!connected ? "Connect Wallet" : `Pin for ${selectedAmount || ''} STX`}
          </motion.button>
        </div>
      </div>
      <div className="card-highlight" />
    </motion.div>
  );
}
