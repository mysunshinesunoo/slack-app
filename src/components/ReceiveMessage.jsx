import React from "react";

function ReceiveMessage({ messages }) {
  return (
    <div className="message-list">
      {messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id} className="message-item">
            <p>{message.body}</p>
            <small>{message.sender_name}</small>
          </div>
        ))
      ) : (
        <p>No messages yet...</p>
      )}
    </div>
  );
}

export default ReceiveMessage;
