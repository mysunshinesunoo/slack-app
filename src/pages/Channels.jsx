import { useEffect, useState } from "react";
import ChannelService from "../services/ChannelService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Channels({ user }) {
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChannels() {
      try {
        const channelsData = await ChannelService.getChannels(user);
        setChannels(channelsData);
      } catch (error) {
        setError("Failed to load channels");
      }
    }

    fetchChannels();
  }, [user]);

  return (
    <div>
      <h1>Channels</h1>
      <button>
        Create New Channel
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {channels.length > 0 ? (
        channels.map((channel) => (
          <div key={channel.id}>
            <p>Channel ID: {channel.id}</p>
            <p>Channel Name: {channel.name}</p>
            <p>Owner ID: {channel.owner_id}</p>
            <button >
              Go to Channel
            </button>
          </div>
        ))
      ) : (
        <div>No channels available</div>
      )}
    </div>
  );
}
