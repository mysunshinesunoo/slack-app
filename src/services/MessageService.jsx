import { API_URL } from "../constants/Constants";
import axios from "axios";

const MessageUserService = {
  getInteractedUsers: async function (user) {
    try {
      const headers = {
        "access-token": user.accessToken,
        expiry: user.expiry,
        client: user.client,
        uid: user.uid,
      };

      const response = await axios.get(`${API_URL}/users`, { headers });
      return response.data.data; // Assuming the response contains the list of users in the 'data' field
    } catch (error) {
      console.error("Error fetching interacted users:", error);
      throw error;
    }
  },

  getMessages: async function (receiverId, user) {
    try {
      const headers = {
        "access-token": user.accessToken,
        expiry: user.expiry,
        client: user.client,
        uid: user.uid,
      };

      const response = await axios.get(`${API_URL}/messages`, {
        headers,
        params: { receiver_id: receiverId, receiver_class: "User" },
      });
      return response.data.data; // Assuming the message data is returned under the 'data' key
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },

  sendMessage: async function (user, info) {
    try {
      const headers = {
        "access-token": user.accessToken,
        expiry: user.expiry,
        client: user.client,
        uid: user.uid,
      };

      const response = await axios.post(`${API_URL}/messages`, info, {
        headers,
      });
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },
};

export default MessageUserService;
