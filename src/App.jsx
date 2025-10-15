import { useState, useEffect } from "react";
import { isConnected, openSTXTransfer } from "@stacks/connect";
import { STACKS_TESTNET } from "@stacks/network";
import { Header } from "./components/Header";
import { CreatorsGrid } from "./components/CreatorsGrid";
import { LandingPage } from "./components/LandingPage";
import { SuccessModal } from "./components/SuccessModal";
import { ShareModal } from "./components/ShareModal";
import { WelcomeNotification } from "./components/WelcomeNotification";
import { TransactionHistory } from "./components/TransactionHistory";
import FeaturedCarousel from "./components/FeaturedCarousel";
import { creatorsData } from "./mockData";
import { parseReferralParams, trackReferral, showReferralNotification } from "./utils/referralSystem";
import "./styles/App.css";

function App() {
  const [connected, setConnected] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [transactionData, setTransactionData] = useState(null);
  const [shareData, setShareData] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentView, setCurrentView] = useState("creators");
  const [pinnedPeers, setPinnedPeers] = useState(() => {
    const saved = localStorage.getItem("pinnedPeers");
    return saved ? JSON.parse(saved) : [];
  });
  const [transactionHistory, setTransactionHistory] = useState(() => {
    const saved = localStorage.getItem("transactionHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [referralData, setReferralData] = useState(null);
  const [showWelcomeNotification, setShowWelcomeNotification] = useState(false);

  useEffect(() => {
    setConnected(isConnected());

    // Check for referral parameters on app load
    const referralParams = parseReferralParams();
    if (referralParams.referralCode) {
      setReferralData(referralParams);
      const notification = showReferralNotification(referralParams);
      if (notification) {
        setShowWelcomeNotification(true);
        // Track the referral
        trackReferral(referralParams);
      }
    }
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

  useEffect(() => {
    localStorage.setItem("pinnedPeers", JSON.stringify(pinnedPeers));
  }, [pinnedPeers]);

  useEffect(() => {
    localStorage.setItem(
      "transactionHistory",
      JSON.stringify(transactionHistory),
    );
  }, [transactionHistory]);

  const handleConnectionChange = (connectionStatus) => {
    setConnected(connectionStatus);
    if (!connectionStatus) {
      setCurrentView("creators");
    }
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleAmountSelect = (creatorId, amount) => {
    setSelectedCard({ creatorId, amount });
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    // Show share modal after success modal closes
    if (shareData) {
      setTimeout(() => {
        setShowShareModal(true);
      }, 300);
    }
  };

  const handleShareModalClose = () => {
    setShowShareModal(false);
    setShareData(null);
  };

  const handleDonate = async (
    recipientAddress,
    amount,
    creatorName,
    creatorId,
  ) => {
    try {
      await openSTXTransfer({
        recipient: recipientAddress,
        amount: (amount * 1000000).toString(),
        memo: `Pinning ${creatorName} on PinPeer`,
        network: STACKS_TESTNET,
        onFinish: (data) => {
          console.log("Transaction submitted:", data.txId);
          const txData = {
            txId: data.txId,
            amount: amount,
            creatorName: creatorName,
            recipient: recipientAddress,
            timestamp: new Date().toISOString(),
          };
          setTransactionData(txData);

          // Add to transaction history
          setTransactionHistory((prev) => [txData, ...prev]);

          // Add to pinned peers if not already pinned
          const creator = creatorsData.find((c) => c.id === creatorId);
          if (creator && !pinnedPeers.find((p) => p.id === creatorId)) {
            setPinnedPeers((prev) => [
              ...prev,
              { ...creator, pinnedAt: new Date().toISOString() },
            ]);
          }

          // Set share data for viral sharing
          setShareData({
            transactionData: txData,
            creatorName: creatorName,
            amount: amount
          });

          setShowSuccessModal(true);
          setSelectedCard(null);
        },
        onCancel: () => {
          console.log("Transaction cancelled");
        },
      });
    } catch (error) {
      console.error("Error sending STX:", error);
      alert(
        "😅 Oops! Something went wrong with your donation.\n\n🔄 No worries, your funds are safe! Please try again.\n\n💬 If this keeps happening, make sure your wallet is unlocked.",
      );
    }
  };

  return (
    <div className="App">
      <Header
        connected={connected}
        onConnectionChange={handleConnectionChange}
        currentView={currentView}
        onViewChange={handleViewChange}
      />

      {!connected ? (
        <LandingPage
          onConnect={() => {
            document.querySelector(".connect-wallet-button")?.click();
          }}
        />
      ) : currentView === "creators" ? (
        <>
          <FeaturedCarousel creators={creatorsData} />
          <CreatorsGrid
            creators={creatorsData}
            onDonate={handleDonate}
          connected={connected}
          selectedCard={selectedCard}
          onAmountSelect={handleAmountSelect}
          pinnedPeers={pinnedPeers}
        />
        </>
      ) : currentView === "peers" ? (
        <CreatorsGrid
          creators={pinnedPeers}
          onDonate={handleDonate}
          connected={connected}
          selectedCard={selectedCard}
          onAmountSelect={handleAmountSelect}
          pinnedPeers={pinnedPeers}
          isPeersView={true}
        />
      ) : (
        <TransactionHistory transactions={transactionHistory} />
      )}

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        transactionData={transactionData}
      />

      <ShareModal
        isOpen={showShareModal}
        onClose={handleShareModalClose}
        transactionData={shareData?.transactionData}
        creatorName={shareData?.creatorName}
        amount={shareData?.amount}
      />

      <WelcomeNotification
        isOpen={showWelcomeNotification}
        onClose={() => setShowWelcomeNotification(false)}
        referralData={referralData}
      />
    </div>
  );
}

export default App;
