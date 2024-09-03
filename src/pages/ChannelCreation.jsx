import { useState } from "react";
import ChannelService from "../services/ChannelService";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ChannelCreation({ user }) {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (!name) {
      setError("Channel name is required");
      return;
    }

    try {
      await ChannelService.createChannel(user, { name });
      navigate("/channels"); // Redirect to the channels list page after creation
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
          <FontAwesomeIcon icon={faPlus} className="icon" /> Create Channel
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
