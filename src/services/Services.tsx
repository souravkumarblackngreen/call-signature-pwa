import axios from "axios";
import { API_END_POINT } from './Constant';

export const getData = async (endpoint: string, headers: any = {}) => {
    try {
      const response = await axios.get(`${API_END_POINT.baseUrl}${endpoint}`, headers );
      return response.data.response;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };