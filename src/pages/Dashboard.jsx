import { useEffect, useState } from "react";
import UserService from "../services/UserService";
import ChannelService from "../services/ChannelService";
import SendMessage from "../components/SendMessage";
import { ToastContainer } from "react-toastify";
import logo from "../assests/images/msgLogo.png";
import { FaEnvelope } from "react-icons/fa";
import { FaHashtag } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function Dashboard(props) {
  const { setIsLoggedIn, user } = props;
  const [userList, setUserList] = useState([]);
  const [usersInteractedList, setUsersInteractedList] = useState([]);
  const [channels, setChannels] = useState([]);
  const [channelFlag, setChannelFlag] = useState(true);
  const [messages, setMessages] = useState([]);
  const [selectedReceiver, setSelectedReceiver] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      if (user) {
        try {
          const users = await UserService.getUsers(user);
          setUserList(users);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    }

    fetchUsers();
  }, [user]);

  useEffect(() => {
    async function fetchUsersInteracted() {
      if (user) {
        try {
          const users = await UserService.getUsersInteracted(user);
          setUsersInteractedList(users);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    }

    fetchUsersInteracted();
  }, [user]);

  useEffect(() => {
    async function fetchMessages() {
      if (user && selectedReceiver) {
        try {
          const fetchedMessages = await UserService.getMessages(
            user,
            selectedReceiver.id,
            "User"
          );
          setMessages(fetchedMessages);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      }
    }

    fetchMessages();
  }, [user, selectedReceiver]);

  function logout() {
    localStorage.clear();
    setIsLoggedIn(false);
  }

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

  return (
    <div>
      <body className="h-screen">
        <div className="flex bg-gray-900 dark:bg-gray-900 p-4 h-screen">
          <div className="w-1/4 bg-gray-800 text-white p-6">
            <div className="flex items-center justify-center mb-6">
              <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
              <div>
                <h2 className="text-lg font-semibold">My Dashboard</h2>
              </div>
            </div>
            {/* LOG OUT */}
            <div className="space-y-4">
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded w-full flex items-center justify-center"
              >
                <span className="p-1">Log Out</span>
                <FiLogOut />
              </button>

              {/* CHANNELS */}
              <div className="text-xl flex items-center cursor-pointer"></div>
              <h2 className="flex items-center text-lg font-bold mt-6">
                <FaHashtag />
                <span className="ml-1">Channels</span>
              </h2>
              {/* Display channels list */}
              {channels.length > 0 ? (
                channels.map((channel) => {
                  const { id, name, owner_id } = channel;
                  return (
                    <div className="pl-3" key={id}>
                      <p>Channel ID: {id}</p>
                      <p>Channel Name: {name}</p>
                      <p>Owner ID: {owner_id}</p>
                    </div>
                  );
                })
              ) : (
                <div className="pl-3">
                  {error ? "No Channels Available" : "Loading channels . . ."}
                </div>
              )}
            </div>
            <div className="mt-4 mb-4">
              <h2 className="flex items-center text-xl font-bold mb-4">
                <FaEnvelope className="mr-2" /> DMs
              </h2>
              <div className="overflow-y-auto h-80 scrollbar-thin scrollbar-webkit">
                {userList.length > 0 ? (
                  userList.map((user) => (
                    <div
                      className="pl-3"
                      key={user.id}
                      onClick={() => setSelectedReceiver(user)}
                      style={{ cursor: "pointer" }}
                    >
                      <p>{user.email}</p>
                    </div>
                  ))
                ) : (
                  <div className="pl-3">Loading users...</div>
                )}
              </div>
            </div>
          </div>

          {/* Chat and User List */}
          <div className="w-3/4 p-5">
            <div className="relative">
              <h2 className="text-white text-2xl pt-5 place-items-center text-center">
                Messages
              </h2>
              <div className="text-white mt-5 pl-5">
                {/* Display messages */}
                {selectedReceiver && (
                  <div className="text-center">
                    <p className="text-white text-lg pl text-center mb-5 flex items-center justify-center ">
                      <FaUserCircle />
                      <span className="m-1">{selectedReceiver.email}</span>
                    </p>
                  </div>
                )}
                <div className="flex flex-col items-start text-left scrollbar-thin scrollbar-webkit h-80 overflow-y-auto mb-4">
                  {messages.length > 0 ? (
                    messages.map((message) => (
                      <div key={message.id}>
                        <p className="text-gray-900 flex flex-col justify-end w-auto max-w-[300px] leading-1.5 p-4 border-gray-200 bg-gray-500 rounded-2xl dark:bg-gray-700">
                          {message.body}
                        </p>
                        <p className="text-xs">From: {message.sender.email}</p>
                      </div>
                    ))
                  ) : (
                    <div>No messages available</div>
                  )}
                </div>

                {/* Send a message */}
                {selectedReceiver && (
                  <SendMessage
                    user={user}
                    selectedReceiver={selectedReceiver}
                    onUserInteracted={(receiverId) => {
                      // Handle user interaction (e.g., update user list or state)
                      setSelectedReceiver(
                        userList.find((u) => u.id === receiverId)
                      );
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </body>

      <ToastContainer />
    </div>
  );
}
