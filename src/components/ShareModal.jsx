import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiCopy, FiTwitter, FiShare2, FiX } from 'react-icons/fi';
import '../styles/ShareModal.css';

export function ShareModal({
  isOpen,
  onClose,
  transactionData,
  creatorName,
  amount
}) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    if (isOpen && transactionData) {
      // Generate shareable URL with UTM parameters for tracking
      const baseUrl = window.location.origin;
      const params = new URLSearchParams({
        ref: transactionData.txId.slice(-8), // Use last 8 chars of txId as ref
        creator: creatorName.replace(/\s+/g, '-').toLowerCase(),
        amount: amount,
        utm_source: 'pin_share',
        utm_medium: 'social',
        utm_campaign: 'peer_sharing'
      });
      setShareUrl(`${baseUrl}?${params.toString()}`);
    }
  }, [isOpen, transactionData, creatorName, amount]);

  const shareText = `🚀 Just pinned ${creatorName} with ${amount} STX on PinPeer!

Join me in supporting amazing creators in the Stacks ecosystem.

#STX #PinPeer #Web3 #CreatorEconomy`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `I just pinned ${creatorName} on PinPeer!`,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2
      }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const confettiVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const confettiItemVariants = {
    hidden: { opacity: 0, y: -20, rotate: 0 },
    visible: {
      opacity: [0, 1, 1, 0],
      y: [0, -30, 60],
      rotate: [0, 180, 360],
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="share-modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="share-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Confetti Animation */}
            <motion.div
              className="confetti-container"
              variants={confettiVariants}
              initial="hidden"
              animate="visible"
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`confetti confetti-${i}`}
                  variants={confettiItemVariants}
                >
                  🎉
                </motion.div>
              ))}
            </motion.div>

            <button className="close-button" onClick={onClose}>
              <FiX />
            </button>

            <div className="share-content">
              <motion.div
                className="success-badge"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                ⭐
              </motion.div>

              <motion.h2
                className="share-title"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                You're Awesome! 🚀
              </motion.h2>

              <motion.p
                className="share-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                You just pinned <strong>{creatorName}</strong> with <strong>{amount} STX</strong>!
                <br />Share your support and invite friends to join PinPeer.
              </motion.p>

              <motion.div
                className="gamification-stats"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="stat-item">
                  <span className="stat-emoji">🎯</span>
                  <span className="stat-text">Pin Streak: 1</span>
                </div>
                <div className="stat-item">
                  <span className="stat-emoji">🏆</span>
                  <span className="stat-text">Supporter Level</span>
                </div>
                <div className="stat-item">
                  <span className="stat-emoji">💎</span>
                  <span className="stat-text">+10 Rep Points</span>
                </div>
              </motion.div>

              <motion.div
                className="share-buttons"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  className="share-btn copy-btn"
                  onClick={handleCopyLink}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiCopy />
                  {copied ? 'Copied!' : 'Copy Link'}
                </motion.button>

                <motion.button
                  className="share-btn twitter-btn"
                  onClick={handleTwitterShare}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiTwitter />
                  Share on X
                </motion.button>

                {navigator.share && (
                  <motion.button
                    className="share-btn native-btn"
                    onClick={handleNativeShare}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiShare2 />
                    Share
                  </motion.button>
                )}
              </motion.div>

              <motion.div
                className="share-preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <div className="preview-card">
                  <div className="preview-image">
                    <div className="preview-logo">📌</div>
                    <div className="preview-text">PinPeer</div>
                  </div>
                  <div className="preview-content">
                    <h4>Join {creatorName.split(' ')[0]} and me on PinPeer!</h4>
                    <p>Supporting the next generation of creators with STX</p>
                  </div>
                </div>
              </motion.div>

              <motion.p
                className="viral-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                💡 <strong>Pro tip:</strong> Friends who join through your link get bonus rep points!
              </motion.p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}