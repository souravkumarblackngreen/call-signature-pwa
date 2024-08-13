import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Sidebar from '../../components/sidemenu/Sidebar';
import Modal from '../../components/modal/Modal';
import SignatrueTabs from '../../components/signatureTabs/SignatureTabs';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setStatusMessage, setSignatureMessage } from '../../redux/slices/DashboardSlice';

import Loader from '../../components/loader/Loader';
import { API_END_POINT } from '../../services/Constant';
// import { postData } from '../../services/Services';
import useJWTRefreshToken from '../../hooks/useJWTRefreshToken';
import useCommonServices from '../../services/useCommonService';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: var(--background-color);
  color: var(--text-color);
`;

const Header = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: var(--header-background-color);
  color: var(--header-text-color);
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

const FlashMessageContainer = styled.div`
  background: var(--flash-message-background-color);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
`;

const FlashMessageTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--flash-message-title-color);
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
  width: auto;
`;

const Button = styled.button<{ primary?: boolean }>`
  background: ${(props) => (props.primary ? 'var(--button-background-color-primary)' : 'var(--button-background-color-secondary)')};
  color: ${(props) => (props.primary ? 'var(--button-text-color-primary)' : 'var(--button-text-color-secondary)')};
  border: 1px solid ${(props) => (props.primary ? 'var(--button-border-color-primary)' : 'var(--button-border-color-secondary)')};
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  flex: 1;
  margin: 0 5px;
  width: auto;
`;

const filteredWords = ['fraud', 'spam'];

const EditSignature: React.FC = () => {

  const { statusMessage, signatureMessage, signatureId, statusId } = useSelector((state: RootState) => state.dashboard);
  const { lang, languages } = useSelector((state: RootState) => state.lang);
  const { activeTab } = useSelector((state: RootState) => state.signatureTabs);
  const { token } = useSelector((state: RootState) => state.user);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [loader, setLoader] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('error');
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('')
  const [modalSubMessage, setModalSubMessage] = useState('')
  const [updatedToken, setUpdatedToken] = React.useState(false);
  const refreshJWT = useJWTRefreshToken();
  const {  postData } = useCommonServices();
  
  const configText = useSelector((state: RootState) => state.configText);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleSaveToTemplates = async () => {
    // Implement save to templates logic
    try {
      setLoader(true)
      const response = await postData(
        API_END_POINT.updateSignature,
        {
          signatureId: activeTab === configText.config.signature ? signatureId : statusId,
          signatureLangCode: lang,
          text: activeTab === configText.config.signature ? signatureMessage : statusMessage,
          signatureType: activeTab === configText.config.signature ? "BUSINESS_CARD" : "STATUS",

        },
        token,
      );

      setLoader(false)
      setShowModal(true)
      setModalType('success')
      setModalTitle(configText.config.successful)
      setModalMessage(`${activeTab +' '+ configText.config.savedSuccessfully} `)
      setModalSubMessage(' ')
    } catch (error: any) {

      const message = error.response?.data?.message || configText.config.genericError;
      setLoader(false)
      setShowModal(true);
      setModalType('error')
      setModalTitle('Opps');
      setModalMessage(message);
      setModalSubMessage(' ');

      if (
        error.response.data.statuscode === 4001 ||
        error.response.data.statuscode === 4002

      ) {

        const refreshSuccess = await refreshJWT(); // Attempt to refresh the token
        setUpdatedToken(Boolean(refreshSuccess));
      }
    }


  };

  const handleError = (errorMsg: any) => {
    setModalMessage(errorMsg)
    setModalType('error')
    setModalSubMessage(' ')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    const foundFilteredWord = filteredWords.find(word => value.toLowerCase().includes(word));


    if (foundFilteredWord) {
      setModalMessage(`"${foundFilteredWord}"  ${configText.config.notAllowedRemove}`);
      setModalSubMessage(configText.config.postViolatesGuidelines)
      setShowModal(true);
    } else {
      if (activeTab === configText.config.signature) {
        dispatch(setSignatureMessage(value))
      } else {
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

  const getCharactersAllowed = () => {
    const language = languages.find(langs => langs.languageCode === lang);
    return language ? language.charactersAllowed : 100;
  };

  const flashMessageToShow = activeTab === configText.config.signature ? signatureMessage : statusMessage;
  const characterLimit = getCharactersAllowed();

  return (
    <Container>
      {loader && <Loader />}
      <Modal modalTitle={modalTitle} show={showModal} onClose={closeModal} message={modalMessage} subMessage={modalSubMessage} type={modalType} />
      <Header>
        <HamburgerMenu onClick={toggleSidebar}>☰</HamburgerMenu>
        <CallSignatureHeader>
          <Logo src={logo} alt="Call Signature" />
          <Title>{configText.config.callSignature}</Title>
        </CallSignatureHeader>
        <AccountCircleRoundedIcon sx={{ fontSize: 30 }} onClick={() => navigate('/profile')} />
      </Header>
      <Content>
        <SignatrueTabs />
        <FlashMessageContainer>
          <FlashMessageTitle>{configText.config.flashMessage}</FlashMessageTitle>
          <FlashMessageInput
            value={flashMessageToShow}
            onChange={handleInputChange}
            maxLength={characterLimit}
          />
          <p>{flashMessageToShow.length}/{characterLimit} {configText.config.characters}</p>
        </FlashMessageContainer>
        <ButtonContainer>
          <Button  onClick={handleDone}>{configText.config.back}</Button>
          <Button primary onClick={handleSaveToTemplates}>{configText.config.save}</Button>   
        </ButtonContainer>
      </Content>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </Container>
  );
};

export default EditSignature;
