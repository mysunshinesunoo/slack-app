import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import MessageUserService from "../services/MessageUserService";
import SendMessage from "../components/SendMessage";
import ReceiveMessage from "../components/ReceiveMessage";

export default function MessageDashboard({ user }) {
  const { channelId } = useParams();
  const [interactedUsers, setInteractedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [filteredUsers, setFilteredUsers] = useState([]); // State to store the filtered users
  const [selectedUser, setSelectedUser] = useState(channelId || "");
  const [messages, setMessages] = useState([]);

  // Fetch interacted users from the API
  const fetchInteractedUsers = useCallback(async () => {
    try {
      const users = await MessageUserService.getInteractedUsers(user);
      setInteractedUsers(users || []);
      setFilteredUsers([]); // Initially hide the filtered list
      console.log("Fetched users:", users); // Debugging line to check the fetched data
    } catch (error) {
      console.error("Error fetching interacted users:", error);
    }
  }, [user]);

  // Fetch messages between the current user and the selected user
  const fetchMessages = useCallback(async () => {
    if (!selectedUser) return;

    try {
      const messagesData = await MessageUserService.getMessages(
        selectedUser,
        user
      );
      setMessages(messagesData || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }, [selectedUser, user]);

  useEffect(() => {
    fetchInteractedUsers();
  }, [fetchInteractedUsers]);

  useEffect(() => {
    fetchMessages();
  }, [selectedUser, fetchMessages]);

  // Update filtered users based on search query
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredUsers([]); // Hide the user list when search query is empty
    } else {
      const filtered = interactedUsers.filter((user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredUsers(filtered);
      console.log("Filtered users:", filtered); // Debugging line to check the filtering
    }
  }, [searchQuery, interactedUsers]);

  return (
    <div className="message-dashboard">
      <main className="message-content">
        <header className="message-header">
          <h1>Messages</h1>
          <div className="message-to">
            <span>To: </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a user..."
            />
            {filteredUsers.length > 0 && (
              <ul className="user-list">
                {filteredUsers.map((user) => (
                  <li
                    key={user.id}
                    onClick={() => {
                      setSelectedUser(user.id);
                      setSearchQuery(user.email); // Fill the search bar with selected email
                      setFilteredUsers([]); // Hide the dropdown after selection
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    {user.email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </header>

        {/* ReceiveMessage Component */}
        <ReceiveMessage messages={messages} />

        {/* SendMessage Component */}
        <SendMessage
          user={user}
          selectedUser={selectedUser}
          onMessageSent={fetchMessages}
        />
      </main>
    </div>
  );
}
