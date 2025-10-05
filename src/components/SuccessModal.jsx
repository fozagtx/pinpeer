import { useEffect, useState } from "react";
import "../styles/SuccessModal.css";

export function SuccessModal({ isOpen, onClose, transactionData }) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Auto close after 8 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 8000);
      return () => clearTimeout(timer);
    } else {
      setShowConfetti(false);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {showConfetti && <ConfettiAnimation />}
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="success-header">
            <div className="success-icon">🎉</div>
            <h2 className="success-title">Congratulations!</h2>
            <p className="success-subtitle">
              You've successfully pinned a peer
            </p>
          </div>

          <div className="receipt-container">
            <div className="receipt-row">
              <span className="receipt-label">Creator</span>
              <span className="receipt-value">
                {transactionData.creatorName}
              </span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Amount</span>
              <span className="receipt-value">
                {transactionData.amount} STX
              </span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Transaction ID</span>
              <span className="receipt-value receipt-txid">
                {transactionData.txId.substring(0, 8)}...
                {transactionData.txId.substring(
                  transactionData.txId.length - 8,
                )}
              </span>
            </div>
            <div className="receipt-row">
              <span className="receipt-label">Network</span>
              <span className="receipt-value">Stacks Testnet</span>
            </div>
          </div>

          <button className="close-modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </>
  );
}

function ConfettiAnimation() {
  const emojis = ["🎉", "🎊", "⭐", "✨", "💫", "🌟", "💛", "🏆"];
  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    emoji: emojis[Math.floor(Math.random() * emojis.length)],
    left: Math.random() * 100,
    animationDuration: 2 + Math.random() * 3,
    animationDelay: Math.random() * 2,
  }));

  return (
    <div className="confetti-container">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            animationDuration: `${piece.animationDuration}s`,
            animationDelay: `${piece.animationDelay}s`,
          }}
        >
          {piece.emoji}
        </div>
      ))}
    </div>
  );
}
