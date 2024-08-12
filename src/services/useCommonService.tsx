import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface CommonServicesResponse {
  isLoading: boolean;
  error: any;
  getData: (endpoint: string, token?: string) => Promise<any>;
  postData: (
    endpoint: string,
    data: any,
    token?: string,
    header?: string
  ) => Promise<any>;
  deleteData: (endpoint: string, data: any, token?: string) => Promise<any>;
  showModalApi: boolean;
 
  patchData: (
    endpoint: string,
    data?: any,
    token?: string,
    header?: string
  ) => Promise<any>;
}

function useCommonServices(): CommonServicesResponse {
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null); 
  const [showModalApi, setShowModal] = useState<boolean>(false);
  const [retryFn, setRetryFn] = useState<() => void>(() => {});
  const { lang } = useSelector((state: RootState) => state.lang);
  const { baseUrl } = useSelector((state: RootState) => state.mediaContent);
  const [retryCount, setRetryCount] = useState<number>(0);
  const timeout = process.env.REACT_APP_TIMEOUT;
  const retryLimit = process.env.VITE_API_RETRY_LIMIT;
  const retryTimeout = process.env.VITE_API_RETRY_TIMEOUT;


  const handleApiError = async (apiError: any, retry: () => void) => {
    setIsLoading(false);
    setError(apiError);
    if (apiError.code === "ERR_NETWORK") {
      setRetryFn(() => retry);
      setShowModal(true);
    }
  };

//   const retryApiCall = () => {
//     if (retryCount < retryLimit) {
//       setShowModal(false);
//       setIsLoading(true);
//       setRetryCount(retryCount + 1);
//       setTimeout(() => {
//         setIsLoading(false);
//         retryFn();
//       }, retryTimeout); // Retry after a 1-second delay
//     } else {
//       setShowModal(false);
//       setRetryCount(0);
//       // Handle max retry limit reached case
//     }
//   };
  async function getData(endpoint: string, token?: string): Promise<any> {
    const callApi = async () => {
      try {
        setIsLoading(true);
        const config: any = {
          baseURL: baseUrl,
          headers: {
            langCode: lang,
          },
          timeout: timeout, // 10 seconds timeout
        };
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        const response = await axios.get(endpoint, config);
        setIsLoading(false);
        return response.data.response || response.data;
      } catch (apiError: any) {
        handleApiError(apiError, callApi);
        throw apiError;
      }
    };
    return callApi();
  }

  async function postData(
    endpoint: string,
    data: any,
    token?: string,
    header?: string
  ): Promise<any> {
    const callApi = async () => {
      try {
        setIsLoading(true);
        const config: any = {
          baseURL: baseUrl,
          headers: {
            langCode: lang,
            param: header,
          },
          timeout: timeout, // 10 seconds timeout
        };
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        const response = await axios.post(endpoint, data, config);
        setIsLoading(false);
        return response.data;
      } catch (apiError: any) {
        handleApiError(apiError, callApi);
        throw apiError;
      }
    };
    return callApi();
  }

  async function patchData(
    endpoint: string,
    data: any,
    token?: string,
    header?: string
  ): Promise<any> {
    const callApi = async () => {
      try {
        setIsLoading(true); // Assuming setIsLoading is defined elsewhere
        const config: any = {
          baseURL: baseUrl, // Define your baseURL
          headers: {
            langCode: lang, // Assuming langCode and lang.value are defined
            param: header,
          },
          timeout: timeout, // 10 seconds timeout
        };
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        const response = await axios.patch(endpoint, data, config); // Using axios.patch for PATCH request
        setIsLoading(false); // Assuming setIsLoading is defined elsewhere
        return response.data;
      } catch (apiError: any) {
        handleApiError(apiError, callApi); // Assuming handleApiError is defined elsewhere
        throw apiError;
      }
    };

    return callApi();
  }
  async function deleteData(
    endpoint: string,
    data: any,
    token?: string
  ): Promise<any> {
    const callApi = async () => {
      try {
        setIsLoading(true);
        const config: any = {
          baseURL: baseUrl,
          headers: {
            langCode: lang,
          },
          timeout: timeout, // 10 seconds timeout
          data: data, // Include data as payload in the config object
        };
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        const response = await axios.delete(endpoint, config);
        setIsLoading(false);
        return response.data;
      } catch (apiError: any) {
        handleApiError(apiError, callApi);
        throw apiError;
      }
    };
    return callApi();
  }

  return {
    isLoading,
    error,
    getData,
    postData,
    deleteData,
    showModalApi,
    patchData,
  };
}

export default useCommonServices;
