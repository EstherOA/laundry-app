import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default {
  async login(data: { phoneNumber: string; password: string; otp: string }) {
    const url = `${BASE_URL}/auth/login`;
    const response = await axios.post(url, {
      password: data.password,
      phoneNumber: data.phoneNumber,
      otp: data.otp,
    });
    return response.data;
  },

  async logout(jwt: string) {
    const url = `${BASE_URL}/auth/logout`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },
};
