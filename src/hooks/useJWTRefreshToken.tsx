import { useDispatch, useSelector } from "react-redux";



import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";

import { setRefreshToken, setToken } from "../redux/slices/UserTypeSlice";
import { getData, logoutfunc } from "../services/Services";
import { API_END_POINT } from "../services/Constant";

const useJWTRefreshToken = () => {
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { refrToken } = useSelector((state: RootState) => state.user);
  const { lang } = useSelector((state: RootState) => state.lang);

  return async () => {
    try {
      const response = await getData(API_END_POINT.refreshToken, {
        headers: {
        Authorization: `Bearer ${refrToken}`,
        langCode: lang,
      }});
      const { token, refreshToken } = response;
        dispatch(setToken(token));
        dispatch(setRefreshToken(refreshToken));
        return true; 
      
    } catch (error) {
      console.log(error)
      logoutfunc(navigate,dispatch)
      return false; // Indicate that refresh failed
    }
  };
};

export default useJWTRefreshToken;