import { connect, disconnect } from "@stacks/connect";
import "./Header.css";

export function Header({ connected, onConnectionChange }) {
  const handleConnectWallet = async () => {
    try {
      await connect({
        appDetails: {
          name: "pinpeer",
          icon: window.location.origin + "/nemo-g.png",
        },
        onFinish: () => {
          onConnectionChange(true);
        },
      });
    } catch (error) {
      console.error("Connection failed:", error);
    }
  };

  const handleDisconnectWallet = () => {
    disconnect();
    onConnectionChange(false);
  };

  return (
    <div className="header-container">
      <div className="header-wrapper">
        <div className="header-left">
          <div className="logo-container">
            <span className="logo-text">pinpeer</span>
          </div>
        </div>

        <nav className="header-nav">
          {!connected ? (
            <button
              className="connect-wallet-button"
              onClick={handleConnectWallet}
            >
              Connect Wallet
            </button>
          ) : (
            <button
              className="disconnect-wallet-button"
              onClick={handleDisconnectWallet}
            >
              Disconnect
            </button>
          )}
        </nav>
      </div>
    </div>
  );
}
