import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default {
  async getInventory(jwt: string) {
    const url = `${BASE_URL}/inventory`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async getItemById(jwt: string, id: string) {
    const url = `${BASE_URL}/inventory/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async addItem(jwt: string, data: any) {
    const url = `${BASE_URL}/inventory`;
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async editItem(jwt: string, id: string, data: any) {
    const url = `${BASE_URL}/inventory/${id}`;
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async deleteItem(jwt: string, id: string) {
    const url = `${BASE_URL}/inventory/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },
};
