import "../styles/CreatorCard.css";

export function CreatorCard({
  creator,
  onDonate,
  connected,
  selectedAmount,
  onAmountSelect,
  isPinned = false,
}) {
  const handlePinPeer = () => {
    if (selectedAmount && connected) {
      onDonate(creator.stacksAddress, selectedAmount, creator.name, creator.id);
    }
  };

  return (
    <div className={`creator-card ${isPinned ? "pinned" : ""}`}>
      <div className="card-header">
        <img src={creator.avatar} alt={creator.name} className="avatar" />
        <div className="creator-info">
          <h3 className="creator-name">{creator.name}</h3>
          <p className="creator-project">{creator.project}</p>
        </div>
        {isPinned && (
          <div className="pinned-badge">
            <span>⭐</span> Pinned
          </div>
        )}
      </div>
      <p className="creator-description">{creator.description}</p>
      <div className="donation-section">
        <div className="donation-amounts">
          {creator.donations.map((amount) => (
            <button
              key={amount}
              className={`amount-button ${selectedAmount === amount ? "selected" : ""}`}
              onClick={() => onAmountSelect(amount)}
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
          {!connected ? "Connect Wallet" : `Pin for ${selectedAmount || ''} STX`}
        </button>
      </div>
    </div>
  );
}
