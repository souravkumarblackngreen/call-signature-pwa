import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../sidemenu/Sidebar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Modal from '../modal/Modal';
import SignatrueTabs from '../signatureTabs/SignatureTabs';
import { setStatusMessage, setSignatureMessage } from '../../redux/slices/DashboardSlice';
import { setFirstTimeModal } from '../../redux/slices/UserTypeSlice';
import { setPrivacy, setTerms } from '../../redux/slices/PrivacyPolicySlice';
import Loader from '../loader/Loader';

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
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
`;

const FlashMessageTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const FlashMessageContent = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
`;

const FlashMessageStatus = styled.div`
  color: green;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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
`;

const BusinessCardContainer = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  max-height:250px;
  overflow-y:auto;
`;

const BusinessCardTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const BusinessCard = styled.div`
  background: #f5f5f5;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  text-align: left;
  cursor:pointer;
  &:hover {
    background-color: #ccc;
  }
`;

const BusinessCardName = styled.p`
  font-size: 1rem;
  font-weight: bold;
`;

const BusinessCardTitleText = styled.p`
  font-size: 0.9rem;
  color: #555;
`;

const Dashboard: React.FC = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSubMessage, setModalSubMessage] = useState('');
  const [modalType, setModalType] = useState('');
  const [flashMessage, setFlashMessage] = useState('Henry, Sales Manager, I am here to scam you')
  const [loader, setLoader] = useState<boolean>(false);
  const [signatureTemplates, setSignatureTemplates] = useState<string[]>([]);
  const [statusTemplates, setStatusTemplates] = useState<string[]>([]);
  const baseUrl = "http://172.16.11.222:5441/crbtSignature/v1";
  const loginUrl = "/api/login"
  const privacyContent = "/api/privacy-content";

  const { statusMessage, signatureMessage, globalShowModal, } = useSelector((state: RootState) => state.dashboard);
  const { activeTab } = useSelector((state: RootState) => state.signatureTabs);
  const { token, userId, firstTimeModal } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();


  console.log(token, 'token')

  const navigate = useNavigate()

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {

    getTemplate()
    getTermsNcondition()
    showSucessSubscriber()
  }, [])

  const getTermsNcondition = async () => {
    setLoader(true)
    const response = await axios.get(baseUrl + privacyContent, {
      headers: {
        Authorization: `Bearer ${token}`,
        langCode: 'en',
      },

    })
    const { privacyPolicy, tearmsAndCondition } = response.data.response
    setLoader(false)
    dispatch(setPrivacy(privacyPolicy))
    dispatch(setTerms(tearmsAndCondition))

  }


  const showSucessSubscriber = () => {
    setModalMessage('You have sucessfully subscribed to this services.')
    setModalType('success')
  }

  const getTemplate = async () => {
    try {
      const response = await axios.get(`${baseUrl}/signature/get-templates/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          langCode: 'en',
        },
      })
      console.log(response)
      const { businessCard, statusCard } = response.data.response;
      setSignatureTemplates(businessCard);
      setStatusTemplates(statusCard);
    } catch (e) {
      console.log(e)
    }
  }

  const setCardMessage = (template: any) => {

    if (activeTab.toLocaleLowerCase() === 'signature') {
      dispatch(setSignatureMessage(template))
    } else {
      dispatch(setStatusMessage(template))
    }
  }

  const closeModal = () => {
    setShowModal(false);
    dispatch(setFirstTimeModal(false))
  };

  const template = activeTab.toLocaleLowerCase() === 'signature' ? signatureTemplates : statusTemplates
  const flashMessageToShow = activeTab.toLocaleLowerCase() === 'signature' ? signatureMessage : statusMessage
  const modalToShow = firstTimeModal || showModal
  return (
    <Container>
      {loader && <Loader />}
      <Modal show={modalToShow} onClose={closeModal} message={modalMessage} type={modalType} subMessage={modalSubMessage} />
      <Header>
        <HamburgerMenu onClick={toggleSidebar}>☰</HamburgerMenu>
        <CallSignatureHeader>
          <Logo src={logo} alt="Call Signature" />
          <Title>Call Signature</Title>
        </CallSignatureHeader>
        <NotificationsIcon onClick={() => setShowModal((p) => !p)} />
      </Header>
      <Content>
        <SignatrueTabs />
        <FlashMessageContainer>
          <FlashMessageTitle>Flash Message</FlashMessageTitle>
          <FlashMessageContent>
            {flashMessageToShow}
          </FlashMessageContent>
          <FlashMessageStatus>Active</FlashMessageStatus>
          <ButtonContainer>
            <Button onClick={() => navigate('/preview')}>Preview</Button>
            <Button primary onClick={() => navigate('/edit-signature')}>Edit Signature</Button>
          </ButtonContainer>
        </FlashMessageContainer>
        <BusinessCardContainer>
          <BusinessCardTitle>Template Business Cards</BusinessCardTitle>
          {template.map((template, index) => (
            <BusinessCard onClick={() => setCardMessage(template)}>
              <BusinessCardTitleText key={index}>{template}</BusinessCardTitleText>
            </BusinessCard>
          ))}
        </BusinessCardContainer>
      </Content>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </Container>
  );
};

export default Dashboard;
