import { API_URL } from "../constants/Constants";
import axios from "axios";

const ChannelService = {
  getChannels: async function (user, setchannels) {
    try {
      const headers = {
        "access-token": user.accessToken,
        expiry: user.expiry,
        client: user.client,
        uid: user.uid,
      };

      const response = await axios.get(`${API_URL}/channels`, { headers });
      const { data } = response;
      // Safely access the data property
      if (data) {
        setchannels(data.data);
      }
    } catch (error) {
      if (error.response.data.error) {
        return alert("Cannot get Channels");
      }
    }
    //   if (response && response.data && Array.isArray(response.data.data)) {
    //     return response.data.data; // Return the array of channels
    //   } else {
    //     console.error("Unexpected response structure:", response);
    //     return []; // Return an empty array if the response structure is unexpected
    //   }
    // } catch (error) {
    //   console.error("Error fetching channels:", error);
    //   return []; // Return an empty array in case of error
    // }
  },
  createChannel: async function (user, channelData) {
    try {
      const headers = {
        "access-token": user.accessToken,
        expiry: user.expiry,
        client: user.client,
        uid: user.uid,
      };

      const response = await axios.post(`${API_URL}/channels`, channelData, {
        headers,
      });

      if (response.data && response.data.data) {
        return response.data.data;
      } else {
        console.error("Unexpected response structure:", response);
        throw new Error("Failed to create channel");
      }
    } catch (error) {
      console.error("Error creating channel:", error);
      throw error;
    }
  },
};

export default ChannelService;
