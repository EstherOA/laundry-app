import axios from "axios";

const baseUrl = process.env.BASE_URL;

export default {
  async getCustomers(jwt: string) {
    const url = `${baseUrl}/customers`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async getCustomerById(jwt: string, id: string) {
    const url = `${baseUrl}/customers/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async addCustomer(jwt: string, data: any) {
    const url = `${baseUrl}/customers`;
    const response = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data,
    });
    return response.data;
  },

  async editCustomer(jwt: string, id: string, data: any) {
    const url = `${baseUrl}/customers/${id}`;
    const response = await axios.put(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data,
    });
    return response.data;
  },

  async deleteCustomer(jwt: string, id: string) {
    const url = `${baseUrl}/customers/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },
};
