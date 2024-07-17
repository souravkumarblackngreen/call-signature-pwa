import axios from "axios";
import { API_END_POINT } from './Constant';

interface Option {
    day: string;
    month: string;
    year: string;
    hour: string;
    minute: string;
    hour12: boolean;
  }

export const getData = async (endpoint: string, headers: any = {}) => {
    try {
      const response = await axios.get(`${API_END_POINT.baseUrl}${endpoint}`, headers );
      return response.data.response || response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  


export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "short",
      year: "numeric",
    };
    const formattedDate = date
      .toLocaleDateString("en-GB", options)
      .replace(/ /g, " ");
  
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12 || 12}:${minutes
      .toString()
      .padStart(2, "0")} ${period}`;
  
    return `${formattedDate}`;
  } 


  // utils/getMobileNumber.js

