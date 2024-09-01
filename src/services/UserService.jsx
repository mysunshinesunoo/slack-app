import { API_URL } from "../constants/Constants";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

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
        return toast.error("Cannot get users");
      }
    }
  },

  signUp: async function (user) {
    if (user.password !== user.password_confirmation) {
      return toast.error("Passwords don't match");
    }
    try {
      const response = await axios.post(`${API_URL}/auth/`, user);
      const { data } = response;
      if (data.data) {
        return toast.success("Account created successful");
      }
    } catch (error) {
      if (error.response.data.errors) {
        return toast.error("Account creation failed");
      }
    }
  },
};

export default UserService;
