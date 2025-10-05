import "./MessagesList.css";

export function MessagesList({ messages, onRefresh }) {
  return (
    <div className="messages">
      <h2>Recent Messages</h2>
      <button onClick={onRefresh} className="refresh-button">
        Refresh
      </button>
      {messages.length === 0 ? (
        <p>No messages yet. Be the first to post!</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <strong>Message #{message.id}:</strong> {message.content}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
