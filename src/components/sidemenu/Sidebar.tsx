import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../assets/logo.png';
import { Navigate, useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

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
  width: 50px;
  margin-bottom: 20px;
`;

const CloseButton = styled.div`
  align-self: flex-end;
  font-size: 24px;
  cursor: pointer;
  color: white;
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
`;

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const [isLanguageOpen, setLanguageOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const toggleLanguageMenu = () => {
    setLanguageOpen(!isLanguageOpen);
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  return (
    <SidebarContainer isOpen={isOpen}>
      <CloseButton onClick={toggleSidebar}>×</CloseButton>
      <Logo src={logo} alt="Call Signature" />
      <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
      <MenuItem onClick={() => navigate('/filter-keywords')}>Keywords</MenuItem>
      <MenuItem onClick={() => navigate('/faq')}>FAQs</MenuItem>
      <MenuItem>
        <div onClick={toggleLanguageMenu} style={{ display: 'flex', alignItems: 'center' }}>
          Language
          {isLanguageOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </div>
      </MenuItem>
      {isLanguageOpen && (
        <SubMenuContainer>
          <SubMenuItem onClick={() => handleLanguageSelect('English')}>
            {selectedLanguage === 'English' && <CheckCircleOutlineIcon style={{ marginRight: '5px' }} />}
            English
          </SubMenuItem>
          <SubMenuItem onClick={() => handleLanguageSelect('French')}>
            {selectedLanguage === 'French' && <CheckCircleOutlineIcon style={{ marginRight: '5px' }} />}
            French
          </SubMenuItem>
        </SubMenuContainer>
      )}
      <MenuItem onClick={() => navigate('/termsNconditions')}>Terms & Conditions</MenuItem>
      <MenuItem onClick={() => navigate('/privacy-policy')}>Privacy Policy</MenuItem>
      <MenuItem>Unsubscribe</MenuItem>
    </SidebarContainer>
  );
};

export default Sidebar;
