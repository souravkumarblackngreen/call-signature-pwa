import axios from "axios";
import { resetDashboardState } from "../redux/slices/DashboardSlice";
import { resetFilterState } from "../redux/slices/FilterSlice";
import { resetLoadingState } from "../redux/slices/LoaderSlice";
import { resetPrivacyPolicyState } from "../redux/slices/PrivacyPolicySlice";
import { resetProfileState } from "../redux/slices/ProfileSlice";
import { resetSignatureTabsState } from "../redux/slices/SignatureTabsSlice";
import { resetUserState } from "../redux/slices/UserTypeSlice";

export const getData = async (endpoint: string, headers: any = {}) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}${endpoint}`, headers );
      return response.data.response || response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  export const postData = async (endpoint: string, data: any, headers: any = {}) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}${endpoint}`, data, headers);
      return response.data.response || response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      
      throw error;
    }
  };

  export const deleteData = async (endpoint: string, headers: any = {}) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}${endpoint}`, headers);
      return response.data.response || response.data;
    } catch (error) {
      console.error('Error deleting data:', error);
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

  export const logoutfunc = async(navigate:any, dispatch:any) => {
    //Reset the Redux state
    dispatch(resetDashboardState())
    dispatch(resetFilterState())
    dispatch(resetLoadingState())
    dispatch(resetPrivacyPolicyState())
    dispatch(resetProfileState())
    dispatch(resetSignatureTabsState())
    dispatch(resetUserState())
    // Navigate to the home or login page
    navigate("/");
  };