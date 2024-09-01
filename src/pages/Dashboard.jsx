import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import UserService from "../services/UserService";
import ChannelService from "../services/ChannelService";
import { FaEnvelope } from "react-icons/fa";
import { ToastContainer } from "react-toastify";

export default function Dashboard({ setIsLoggedIn, user }) {
  const [userList, setUserList] = useState([]);
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const [channelFlag, setChannelFlag] = useState(true);
  //   const navigate = useNavigate();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await UserService.getUsers(user);
        setUserList(users || []); // Ensure userList is always an array
        setError(null);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError(error.message || "An error occurred while fetching users");
        setUserList([]); // Ensure userList is an empty array on error
      }
    }

    if (user) {
      fetchUsers();
    } else {
      console.error("User object is null or undefined");
      setError("User is not authenticated");
    }
  }, [user]);

  useEffect(() => {
    async function getChannels() {
      try {
        const channelsData = await ChannelService.getChannels(user);
        setChannels(channelsData || []); // Ensure channels is always an array
        setError(null);
      } catch (error) {
        console.error("Error fetching channels:", error);
        setError(error.message || "An error occurred while fetching channels");
        setChannels([]);
      }
    }

    if (channelFlag && user) {
      setChannelFlag(false);
      getChannels();
    }
  }, [user, channelFlag]);

  function logout() {
    console.log("Logging out");
    localStorage.clear();
    setIsLoggedIn(false);
    // navigate("/"); // Redirect to the homepage or login page after logout
  }

  // Navigate to Message Dashboard
  function goToMessageDashboard(channelId) {
    // navigate(`/messages/${channelId}`);
  }

  return (
    <div>
      <h1>This is my Dashboard</h1>
      <button onClick={logout}>Log Out</button>

      {error && <div style={{ color: "red" }}>Error: {error}</div>}

      {/* Message Icon to Navigate to Message Dashboard */}
      <div
        // onClick={() => goToMessageDashboard(channels[0]?.id)}
        style={{ cursor: "pointer", fontSize: "24px", margin: "10px 0" }}
      >
        <FaEnvelope /> DMs
      </div>

      {/* Display channels list first */}
      <h2>Channels</h2>
      {channels.length > 0 ? (
        channels.map((channel) => {
          const { id, name, owner_id } = channel;
          return (
            <div
              key={id}
              //   onClick={() => goToMessageDashboard(id)}
              style={{
                cursor: "pointer",
                padding: "10px",
                border: "1px solid #ccc",
                marginBottom: "5px",
              }}
            >
              <p>Channel ID: {id}</p>
              <p>Channel Name: {name}</p>
              <p>Owner ID: {owner_id}</p>
            </div>
          );
        })
      ) : (
        <div>{error ? "No Channels Available" : "Loading channels . . ."}</div>
      )}

      {/* Display user list after channels */}
      <h2>User List</h2>
      {userList.length > 0 ? (
        userList.map((student) => {
          const { id, email } = student;
          return (
            <div key={id}>
              <p>ID: {id}</p>
              <p>Email: {email}</p>
            </div>
          );
        })
      ) : (
        <div>{error ? "No Users Available" : "Loading users . . ."}</div>
      )}
      <ToastContainer />
    </div>
  );
}
