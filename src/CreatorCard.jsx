import { useState } from "react";
import "./CreatorCard.css";

export function CreatorCard({ creator, onDonate, connected }) {
  const [selectedAmount, setSelectedAmount] = useState(null);

  const handlePinPeer = () => {
    if (selectedAmount && connected) {
      onDonate(creator.stacksAddress, selectedAmount, creator.name);
    }
  };

  return (
    <div className="creator-card">
      <div className="creator-avatar">
        <img src={creator.avatar} alt={creator.name} />
      </div>

      <div className="creator-info">
        <h3 className="creator-name">{creator.name}</h3>
        <h4 className="creator-project">{creator.project}</h4>
        <p className="creator-description">{creator.description}</p>
      </div>

      <div className="donation-section">
        <p className="donation-label">Choose amount (STX)</p>
        <div className="donation-amounts">
          {creator.donations.map((amount) => (
            <button
              key={amount}
              className={`amount-button ${selectedAmount === amount ? 'selected' : ''}`}
              onClick={() => setSelectedAmount(amount)}
            >
              {amount} STX
            </button>
          ))}
        </div>

        <button
          className="pin-peer-button"
          onClick={handlePinPeer}
          disabled={!selectedAmount || !connected}
        >
          {!connected ? 'Connect Wallet First' : 'Pin This Peer'}
        </button>
      </div>
    </div>
  );
}
