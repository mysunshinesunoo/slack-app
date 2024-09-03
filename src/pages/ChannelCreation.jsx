import { useState } from "react";
import ChannelService from "../services/ChannelService";

export default function ChannelCreation({ user }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name) {
      setError("Channel name is required");
      return;
    }

    try {
      await ChannelService.createChannel(user, { name });
    } catch (error) {
      setError("Failed to create channel. Please try again.");
    }
  }

  return (
    <div>
      <h1>Create a New Channel</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Channel Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <button type="submit">
           Channel
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
