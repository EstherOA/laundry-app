import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default {
  async getServices(jwt: string) {
    const url = `${BASE_URL}/services`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async getServiceById(jwt: string, id: string) {
    const url = `${BASE_URL}/services/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async addService(jwt: string, data: any) {
    const url = `${BASE_URL}/services`;
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async editService(jwt: string, id: string, data: any) {
    const url = `${BASE_URL}/services/${id}`;
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async deleteService(jwt: string, id: string) {
    const url = `${BASE_URL}/services/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },
};
