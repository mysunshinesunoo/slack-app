import { API_URL } from "../constants/Constants";
import axios from "axios";

const UserService = {
  getUsers: async function (user) {
    try {
      const headers = {
        "access-token": user.accessToken,
        expiry: user.expiry,
        client: user.client,
        uid: user.uid,
      };
      const response = await axios.get(`${API_URL}/users`, { headers });
      const users = response.data.data;
      return users.filter((user) => user.id >= 5100);
    } catch (error) {
      if (error.response.data.errors) {
        return alert("Cannot get users");
      }
    }
  },
  getUsersInteracted: async function (user) {
    try {
      const headers = {
        "access-token": user.accessToken,
        expiry: user.expiry,
        client: user.client,
        uid: user.uid,
      };
      const response = await axios.get(`${API_URL}/users`, { headers });
      const users = response.data.data;
      return users.filter((user) => user.sender.email === user.email);
    } catch (error) {
      if (error.response.data.errors) {
        return alert("Cannot get users");
      }
    }
  },

  signUp: async function (info) {
    if (info.password !== info.password_confirmation) {
      return alert("Passwords don't match");
    }

    // Check if the email already exists
    const emailExists = await this.checkEmailExists(info.email);
    if (emailExists) {
      return alert("Email already exists");
    }

    try {
      const response = await axios.post(`${API_URL}/auth/`, info);
      const { data } = response;
      if (data.data) {
        return alert("Account created successfully");
      }
    } catch (error) {
      if (error.response.data.errors) {
        return alert("Account creation failed");
      }
    }
  },

  checkEmailExists: async function (email) {
    try {
      const response = await axios.get(`${API_URL}/users`);
      const users = response.data.data;
      return users.some((user) => user.email === email);
    } catch (error) {
      console.error("Error checking email:", error);
      return false; // Default to false if there's an error
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
      const { data } = response;
      if (data.data) {
        return alert("Successfully sent a message");
      } else {
        return alert("Cannot send message");
      }
    } catch (error) {
      console.log(error);
    }
  },
  getMessages: async function (user, receiverId, receiverClass) {
    try {
      const headers = {
        "access-token": user.accessToken,
        expiry: user.expiry,
        client: user.client,
        uid: user.uid,
      };
      const response = await axios.get(
        `${API_URL}/messages?receiver_id=${receiverId}&receiver_class=${receiverClass}`,
        { headers }
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },
  getSentMessages: async function (user) {
    try {
      const headers = {
        "access-token": user.accessToken,
        client: user.client,
        expiry: user.expiry,
        uid: user.uid,
      };
      const response = await axios.get(`${API_URL}/messages`, {
        headers,
      });
      return response.data.data; // Adjust based on actual response structure
    } catch (error) {
      console.error("Error fetching sent messages:", error);
      throw error;
    }
  },
};

export default UserService;
