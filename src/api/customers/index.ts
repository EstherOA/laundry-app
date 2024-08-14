import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default {
  async getCustomers(jwt: string) {
    const url = `${BASE_URL}/customers`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async getCustomerById(jwt: string, id: string) {
    const url = `${BASE_URL}/customers/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async addCustomer(jwt: string, data: any) {
    const url = `${BASE_URL}/customers`;
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async editCustomer(jwt: string, id: string, data: any) {
    const url = `${BASE_URL}/customers/${id}`;
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async deleteCustomer(jwt: string, id: string) {
    const url = `${BASE_URL}/customers/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },
};
