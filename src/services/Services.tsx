import axios from "axios";

export const getData = async (endpoint: string, headers: any = {}) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_}${endpoint}`, headers );
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
  
  
    return `${formattedDate}`;
  } 