import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default {
  async getOrders(jwt: string) {
    const url = `${BASE_URL}/orders`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async getOrderById(jwt: string, id: string) {
    const url = `${BASE_URL}/orders/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async addOrder(jwt: string, data: any) {
    const url = `${BASE_URL}/orders`;
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async editOrder(jwt: string, id: string, data: any) {
    const url = `${BASE_URL}/orders/${id}`;
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async deleteOrder(jwt: string, id: string) {
    const url = `${BASE_URL}/orders/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },
};
