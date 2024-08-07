import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default {
  async login(jwt: string, data: { phoneNumber: string; password: string }) {
    const url = `${BASE_URL}/auth/logout`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data,
    });
    return response.data;
  },

  async logout(jwt: string) {
    const url = `${BASE_URL}/auth/logout`;
    const response = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },
};
