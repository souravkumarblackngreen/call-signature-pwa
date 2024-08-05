import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

import { API_END_POINT } from '../../services/Constant';
import { setConfigText, resetConfigState } from '../../redux/slices/GloabalTextDataSlice';
import { setLanguage,resetLanguageState } from '../../redux/slices/LanguageSlice';
import { startLoading, stopLoading, resetLoadingState } from '../../redux/slices/LoaderSlice';
import { resetFilterState } from '../../redux/slices/FilterSlice';

import { resetPrivacyPolicyState } from '../../redux/slices/PrivacyPolicySlice';
import { resetProfileState } from '../../redux/slices/ProfileSlice';
import { resetSignatureTabsState } from '../../redux/slices/SignatureTabsSlice';
import { resetDashboardState } from '../../redux/slices/DashboardSlice';
import { resetUserState } from "../../redux/slices/UserTypeSlice"
import { deleteData, getData } from '../../services/Services';
import Loader from '../loader/Loader';
import useJWTRefreshToken from '../../hooks/useJWTRefreshToken';


const SidebarContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background: linear-gradient(180deg, #0000FF 0%, #451322 100%);
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Logo = styled.img`
  width: 38px;
`;

const CloseButton = styled.div`
  align-self: center;
  font-size: 24px;
  cursor: pointer;
  color: white;
  margin-left:auto;
`;

const MenuItem = styled.div`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  margin: 10px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  &:hover {
    text-decoration: underline;
  }
`;

const SubMenuItem = styled.div`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  margin: 10px 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    text-decoration: underline;
  }
`;

const SubMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  max-height: 150px;
  overflow-y: auto;
`;

const UnsubscribeButton = styled(MenuItem)`
  margin-top: auto;
  margin-bottom: 25%;
`;

const SideMenuHeader = styled.div`
  color: white;
  display: flex;
  gap: 10px;
  justify-content: center;
  align-items: center;
`;

const SideMenuHeaderContainer = styled.div`
  display: flex;
  width: 100%;
`;

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}
const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [isLanguageOpen, setLanguageOpen] = useState(false);
  const { lang, languages } = useSelector((state: RootState) => state.lang);
  const [menuData, setMenuData] = useState<[]>([]);
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.user);
  const [updatedToken, setUpdatedToken] = React.useState(false);
  const configText = useSelector((state: RootState) => state.configText);
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const refreshJWT = useJWTRefreshToken();

  const toggleLanguageMenu = () => {
    setLanguageOpen(!isLanguageOpen);
  };
  const handleLanguageSelect = (language: string) => {
    dispatch(setLanguage(language));
  };


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        toggleSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);
  useEffect(() => {
    handleLanguageChangeData();
  }, [updatedToken,lang]);
  useEffect(() => {
    getMenu()
  }, [updatedToken,token])
  const handleLanguageChangeData = async () => {
    dispatch(startLoading())
    try {
      const response = await getData(
        `${API_END_POINT.getAllData}/${lang}`
      );
      dispatch(setConfigText(response));
      dispatch(stopLoading())
     
    } catch (error:any) {
      console.log(error);
      dispatch(stopLoading())
      if (
        error.response.data.statuscode === 4001 ||
        error.response.data.statuscode === 4002
         
      ) {

        const refreshSuccess = await refreshJWT(); // Attempt to refresh the token
        setUpdatedToken(Boolean(refreshSuccess));
      }
    }
  };
  const Unsubscribe = async () => {
    dispatch(startLoading())

    try {
      const response = await deleteData(`${API_END_POINT.unsubscribe}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          langCode: lang,
        },
      });

      dispatch(stopLoading())
      if (response.statuscode == 200) {
        dispatch(resetConfigState())
        dispatch(resetDashboardState())
        dispatch(resetFilterState())
        dispatch(resetLanguageState())
        dispatch(resetLoadingState())
        dispatch(resetPrivacyPolicyState())
        dispatch(resetProfileState())
        dispatch(resetSignatureTabsState())
        dispatch(resetUserState())
        navigate('/')
      }
    } catch (error:any) {
      console.log(error);
      dispatch(stopLoading())
      if (
        error.response.data.statuscode === 4001 ||
        error.response.data.statuscode === 4002
         
      ) {

        const refreshSuccess = await refreshJWT(); // Attempt to refresh the token
        setUpdatedToken(Boolean(refreshSuccess));
      }
    }
  };
  const getMenu = async () => {
    dispatch(startLoading())
    try {
      const response = await getData(API_END_POINT.sideMenu, {
        headers: {
          Authorization: `Bearer ${token}`,
          langCode: lang,
        },
      });
      setMenuData(response);
      
      dispatch(stopLoading())
    } catch (error: any) {
      dispatch(stopLoading())
      if (
        error.response.data.statuscode === 4001 ||
        error.response.data.statuscode === 4002
         
      ) {

        const refreshSuccess = await refreshJWT(); // Attempt to refresh the token
        setUpdatedToken(Boolean(refreshSuccess));
      }

    }
  };
  const renderMenuItem = (item: any) => {
    switch (item.name) {
      case 'languageIndi':
        return (
          <MenuItem key={item.name}>
            <div onClick={toggleLanguageMenu} style={{ display: 'flex', alignItems: 'center' }}>
              {configText.config[item.name]}
              {isLanguageOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
            {isLanguageOpen && (
              <SubMenuContainer>
                {languages.map((language: any) => (
                  <SubMenuItem key={language.languageCode} onClick={() => handleLanguageSelect(language.languageCode)}>
                    {lang === language.languageCode && <CheckCircleOutlineIcon style={{ marginRight: '5px' }} />}
                    {language.languageName}
                  </SubMenuItem>
                ))}
              </SubMenuContainer>
            )}
          </MenuItem>
        );
      case 'unsubscribe':
        return (
          <MenuItem key={item.name} onClick={Unsubscribe}>
            {configText.config[item.name]}
          </MenuItem>
        );
      default:
        return (
          <MenuItem key={item.name} onClick={() => navigate(item.routePath)}>
            {configText.config[item.name]}
          </MenuItem>
        );
    }
  };
  return (
    <>
    {isLoading && <Loader/>}
    <SidebarContainer isOpen={isOpen} ref={sidebarRef}>
      <SideMenuHeaderContainer>
      <SideMenuHeader ><Logo src={logo} alt="Call Signature" /><h3>{configText.config.callSignature}</h3></SideMenuHeader>
      <CloseButton onClick={toggleSidebar}>×</CloseButton>
      </SideMenuHeaderContainer>
      
      {menuData.map((item: any) => renderMenuItem(item))}
      <UnsubscribeButton onClick={Unsubscribe}>{configText.config.unsubscribe}</UnsubscribeButton>
    </SidebarContainer>
    </>
  );
};
export default Sidebar;