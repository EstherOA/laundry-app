import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default {
  async getLogs(jwt: string) {
    const url = `${BASE_URL}/logs`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async getLogById(jwt: string, id: string) {
    const url = `${BASE_URL}/logs/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async addLog(jwt: string, data: any) {
    const url = `${BASE_URL}/logs`;
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },
};
