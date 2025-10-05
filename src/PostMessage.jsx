import { useState } from "react";
import { request } from "@stacks/connect";
import { stringUtf8CV } from "@stacks/transactions";
import "./PostMessage.css";

export function PostMessage({ network, contractAddress, contractName, onMessagePosted }) {
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const postMessage = async () => {
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      const result = await request("stx_callContract", {
        contract: `${contractAddress}.${contractName}`,
        functionName: "add-message",
        functionArgs: [stringUtf8CV(newMessage)],
        network,
      });
      console.log("Transaction submitted:", result.txid);
      setNewMessage("");
      setTimeout(() => {
        onMessagePosted();
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error posting message:", error);
      setLoading(false);
    }
  };

  return (
    <div className="post-message">
      <h2>Post a Message</h2>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="What's on your mind?"
          maxLength={280}
          disabled={loading}
        />
        <button
          onClick={postMessage}
          disabled={loading || !newMessage.trim()}
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}
