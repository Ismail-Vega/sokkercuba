// authService.js
import axios from "axios";

export const getNewAccessToken = async () => {
  try {
    const response = await axios.post(
      "/api/auth/refresh-token",
      {},
      { withCredentials: true }
    );

    if (response.status === 200) {
      return response.data?.result?.accessToken;
    }
  } catch (error) {
    console.error("Failed to refresh access token", error);
  }
  return null;
};
