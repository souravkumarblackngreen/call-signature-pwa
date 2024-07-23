import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/sidemenu/Sidebar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import Modal from '../../components/modal/Modal';
import SignatrueTabs from '../../components/signatureTabs/SignatureTabs';
import { setStatusMessage, setSignatureMessage, setSignatureId,setStatusId } from '../../redux/slices/DashboardSlice';
import { setFirstTimeModal } from '../../redux/slices/UserTypeSlice';
import { setPrivacy, setTerms } from '../../redux/slices/PrivacyPolicySlice';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Loader from '../../components/loader/Loader';
import { API_END_POINT } from '../../services/Constant';
import {getData} from '../../services/Services'

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
  border: 1px solid #0032DF;
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

const BusinessCardTitleText = styled.p`
  font-size: 0.9rem;
  color: #555;
`;

const ToggleButton = styled.div`
display:flex;

`

const Dashboard: React.FC = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSubMessage, setModalSubMessage] = useState('');
  const [modalType, setModalType] = useState('');

  const [loader, setLoader] = useState<boolean>(false);
  const [signatureTemplates, setSignatureTemplates] = useState<string[]>([]);
  const [statusTemplates, setStatusTemplates] = useState<string[]>([]);
  const [toggleChecked, setToggleChecked] = useState(false);
  
  
  
  const { statusMessage, signatureMessage } = useSelector((state: RootState) => state.dashboard);
  const { lang } = useSelector((state: RootState) => state.lang);
  const { activeTab } = useSelector((state: RootState) => state.signatureTabs);
  const { token, userId, firstTimeModal } = useSelector((state: RootState) => state.user);
  const configText = useSelector((state: RootState) => state.configText);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    getTemplate()
    getInfo()
    getTermsNcondition()
  }, [])

  const getTermsNcondition = async () => {
    setLoader(true)
    const response = await getData(API_END_POINT.privacyContent, {
      headers: {
        Authorization: `Bearer ${token}`,
        langCode: lang,
      },

    })
    const { privacyPolicy, tearmsAndCondition } = response
    setLoader(false)
    dispatch(setPrivacy(privacyPolicy))
    dispatch(setTerms(tearmsAndCondition))

  }


  

  const getTemplate = async () => {
    try {
      const response = await getData(API_END_POINT.getTemplates+userId, {
        headers: {
          Authorization: `Bearer ${token}`,
          langCode: lang,
        },
      })
      const { businessCard, statusCard } = response;
      
      setSignatureTemplates(businessCard);
      setStatusTemplates(statusCard);
    } catch (e) {
      console.log(e)
    }
  }

  const getInfo = async () => {
    try {
      const response = await getData(API_END_POINT.getInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
          langCode: lang,
        },
      })
      preprocessData(response)
    } catch (e) {
      console.log(e)
    }
  }


  // preprocessing and setting the status / signature which already set
  const preprocessData = (data: any) => {
    if (data) {
      const { signatureData } = data;
     
      const businessCard = signatureData.find(
        (sig:any) => sig.signatureType === "BUSINESS_CARD"
      );
      const statusCard = signatureData.find(
        (sig:any) => sig.signatureType === "STATUS"
      );
      
      if (businessCard) {
        dispatch(setSignatureMessage(businessCard.text));
        dispatch(setSignatureId(businessCard.signatureId))
      }
      if (statusCard) {
        dispatch(setStatusMessage(statusCard.text));
        dispatch(setStatusId(businessCard.signatureId))
      }
    }
  };
  
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

  const handleToggleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setToggleChecked(event.target.checked);
    setLoader(true);
    const action = event.target.checked ? "PUBLISH" : "UNPUBLISH";
    try {
      await axios.post(`http://172.16.11.222:5442/crbtSignature/v1/dashboard/signature-action/${action}`, [], {
        headers: {
          Authorization: `Bearer ${token}`,
          langCode: lang,
        },
      });
      setModalMessage(`Signature ${action.toLowerCase()}ed successfully.`);
      setModalType('success');
    } catch (err) {
      setModalMessage(`Failed to ${action.toLowerCase()} signature.`);
      setModalType('error');
    }
    setLoader(false);
    setShowModal(true);
  };

  const showSucessSubscriber = () => {
    setModalMessage('You have sucessfully subscribed to this services.')
    setModalType('success')
  }


  

  const templates = activeTab.toLocaleLowerCase() === 'signature' ? signatureTemplates : statusTemplates
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
          <Title>{configText.config.callSignature}</Title>
        </CallSignatureHeader>
        <NotificationsIcon onClick={() => setShowModal((p) => !p)} />
      </Header>
      <Content>
        <SignatrueTabs />
        <FlashMessageContainer>
          <FlashMessageTitle>{configText.config.flashMessage}</FlashMessageTitle>
          <FlashMessageContent>
            {flashMessageToShow}
          </FlashMessageContent>
          
          <FlashMessageStatus>Active</FlashMessageStatus>
          <ButtonContainer>
            <Button onClick={() => navigate('/preview')}>{configText.config.preview}</Button>
            <Button primary onClick={() => navigate('/edit-signature')}>{configText.config.editSignature}</Button>
          </ButtonContainer>
          <ToggleButton>
          <FormControlLabel
            control={
              <Switch
                checked={toggleChecked}
                onChange={handleToggleChange}
                name="toggleSwitch"
                color="success"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            }
            label={toggleChecked?configText.config.signature:configText.config.subscribeActive}
          />
          </ToggleButton>
          
        </FlashMessageContainer>
        <BusinessCardContainer>
          <BusinessCardTitle>{configText.config.templateBusinessCard}</BusinessCardTitle>
          {templates?.map((template, index) => (
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



