import { useState, useEffect } from "react";
import { isConnected, openSTXTransfer } from "@stacks/connect";
import { STACKS_TESTNET } from "@stacks/network";
import { Header } from "./Header";
import { CreatorsGrid } from "./CreatorsGrid";
import { SuccessModal } from "./SuccessModal";
import { creatorsData } from "./mockData";
import "./App.css";

function App() {
  const [connected, setConnected] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionData, setTransactionData] = useState(null);

  useEffect(() => {
    setConnected(isConnected());
  }, []);

  useEffect(() => {
    const checkConnection = () => {
      const connectionStatus = isConnected();
      if (connectionStatus !== connected) {
        setConnected(connectionStatus);
      }
    };
    const intervalId = setInterval(checkConnection, 500);
    return () => clearInterval(intervalId);
  }, [connected]);

  const handleConnectionChange = (isConnected) => {
    setConnected(isConnected);
  };

  const handleDonate = async (recipientAddress, amount, creatorName) => {
    try {
      await openSTXTransfer({
        recipient: recipientAddress,
        amount: (amount * 1000000).toString(),
        memo: `Pinning ${creatorName} on PinPeer`,
        network: STACKS_TESTNET,
        onFinish: (data) => {
          console.log("Transaction submitted:", data.txId);
          setTransactionData({
            txId: data.txId,
            amount: amount,
            creatorName: creatorName,
            recipient: recipientAddress,
          });
          setShowSuccessModal(true);
        },
        onCancel: () => {
          console.log("Transaction cancelled");
        },
      });
    } catch (error) {
      console.error("Error sending STX:", error);
      alert("Failed to process donation. Please try again.");
    }
  };

  return (
    <div className="App">
      <Header
        connected={connected}
        onConnectionChange={handleConnectionChange}
      />
      <CreatorsGrid
        creators={creatorsData}
        onDonate={handleDonate}
        connected={connected}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        transactionData={transactionData}
      />
    </div>
  );
}

export default App;
