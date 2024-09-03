import React, { useState } from "react";
import UserService from "../services/UserService";
import { toast } from "react-toastify";
import { IoMdSend } from "react-icons/io";

function SendMessage(props) {
  const { user, selectedReceiver, onUserInteracted } = props;
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (!selectedReceiver || !message) {
      toast.error("Both receiver and message body are required.");
      return;
    }

    const info = {
      receiver_id: selectedReceiver.id,
      receiver_class: "User",
      body: message,
    };

    try {
      await UserService.sendMessage(user, info);

      setMessage("");
      onUserInteracted(selectedReceiver.id); // Notify parent about the interaction
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }

  return (
    <footer>
      <form onSubmit={handleSubmit} className="absolute bottom--10 left-0">
        <div>
          <p className="text-gray-900">
            {selectedReceiver ? `` : "No receiver selected"}
          </p>
        </div>
        <div className="flex">
          <label className="p-3"></label>
          <input
            type="text"
            className="text-gray-900 p-2.5 w-auto min-w-[140vmin]"
            placeholder="Enter your message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
          <button className="m-2 flex items-center text-2xl" type="submit">
            <IoMdSend />
          </button>
        </div>
      </form>
    </footer>
  );
}

export default SendMessage;
