import axios from "axios";
import { resetDashboardState } from "../redux/slices/DashboardSlice";
import { resetFilterState } from "../redux/slices/FilterSlice";
import { resetLoadingState } from "../redux/slices/LoaderSlice";
import { resetPrivacyPolicyState } from "../redux/slices/PrivacyPolicySlice";
import { resetProfileState } from "../redux/slices/ProfileSlice";
import { resetSignatureTabsState } from "../redux/slices/SignatureTabsSlice";
import { resetUserState } from "../redux/slices/UserTypeSlice";


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

  export const loadConfig = async () => {
    const response = await fetch('../config.json');
    const config = await response.json();
    return config;
  };