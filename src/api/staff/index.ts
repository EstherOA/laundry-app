import axios from "axios";
import { BASE_URL } from "../../utils/constants";

export default {
  async getStaff(jwt: string) {
    const url = `${BASE_URL}/staff`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async getStaffById(jwt: string, id: string) {
    const url = `${BASE_URL}/staff/${id}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },

  async addStaff(jwt: string, data: any) {
    const url = `${BASE_URL}/staff`;
    const response = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data,
    });
    return response.data;
  },

  async editStaff(jwt: string, id: string, data: any) {
    const url = `${BASE_URL}/staff/${id}`;
    const response = await axios.put(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      data,
    });
    return response.data;
  },

  async deleteStaff(jwt: string, id: string) {
    const url = `${BASE_URL}/staff/${id}`;
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return response.data;
  },
};
