import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Sidebar from '../sidemenu/Sidebar';
import Modal from '../modal/Modal';
import SignatrueTabs from '../signatureTabs/SignatureTabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setStatusMessage, setSignatureMessage } from '../../redux/slices/DashboardSlice';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: #f5f5f5;
  color: #000;
`;

const Header = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  color: #000;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const HamburgerMenu = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CallSignatureHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tab = styled.div<{ active: boolean }>`
  background: ${(props) => (props.active ? '#0032DF' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#0032DF')};
  border: 1px solid ${(props) => (props.active ? '#1E90FF' : '#ccc')};
  border-radius: 8px;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
`;

const FlashMessageContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
`;

const FlashMessageTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const FlashMessageInput = styled.textarea`
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  font-size: 1rem;
  min-height: 100px;
  resize: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Button = styled.button<{ primary?: boolean }>`
  background: ${(props) => (props.primary ? '#0032DF' : 'white')};
  color: ${(props) => (props.primary ? 'white' : '#0032DF')};
  border: 1px solid ${(props) => (props.primary ? '#0032DF' : '#0032DF')};
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  flex: 1;
  margin: 0 5px;
  width:;
`;

const filteredWords = [ 'fraud', 'spam'];

const EditSignature: React.FC = () => {
  
  const { statusMessage, signatureMessage , globalShowModal} = useSelector((state: RootState) => state.dashboard);
  const { activeTab } = useSelector((state: RootState) => state.signatureTabs);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const [modalType,setModalType] = useState('error');
  const [modalMessage, setModalMessage] = useState('');
  const [modalSubMessage, setModalSubMessage] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSaveToTemplates = () => {
    // Implement save to templates logic
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const foundFilteredWord = filteredWords.find(word => value.toLowerCase().includes(word));
    
    
    if (foundFilteredWord) {
      setModalMessage(`The word "${foundFilteredWord}" is not allowed. Please remove it.`);
      setModalSubMessage('Your post contains content that voilates our guidelines.')
      setShowModal(true);
    } else {
      if(activeTab.toLocaleLowerCase() === 'signature'){
        dispatch(setSignatureMessage(value))
      }else{
        dispatch(setStatusMessage(value))
      }
      
    }
  };

  const handleDone = () => {
    navigate('/dashboard');
  };

  const closeModal = () => {
    setShowModal(false);
  };



  const flashMessageToShow = activeTab.toLocaleLowerCase() === 'signature' ? signatureMessage : statusMessage
  return (
    <Container>
      <Modal show={showModal} onClose={closeModal} message={modalMessage} subMessage={modalSubMessage} type={modalType}/>
      <Header>
        <HamburgerMenu onClick={toggleSidebar}>☰</HamburgerMenu>
        <CallSignatureHeader>
          <Logo src={logo} alt="Call Signature" />
          <Title>Call Signature</Title>
        </CallSignatureHeader>
        <NotificationsIcon />
      </Header>
      <Content>
      <SignatrueTabs/>
        <FlashMessageContainer>
          <FlashMessageTitle>Flash Message</FlashMessageTitle>
          <FlashMessageInput
            value={flashMessageToShow}
            onChange={handleInputChange}
            maxLength={100}
          />
          <p>{flashMessageToShow.length}/100 characters</p>
        </FlashMessageContainer>
        <ButtonContainer>
          <Button onClick={handleSaveToTemplates}>Save To Templates</Button>
          <Button primary onClick={handleDone}>Done</Button>
        </ButtonContainer>
      </Content>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </Container>
  );
};

export default EditSignature;
