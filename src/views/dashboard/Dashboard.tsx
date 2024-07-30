import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/sidemenu/Sidebar';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '../../components/modal/Modal';
import SignatrueTabs from '../../components/signatureTabs/SignatureTabs';
import { setStatusMessage, setSignatureMessage, setSignatureId,setStatusId } from '../../redux/slices/DashboardSlice';
import { setFirstTimeModal } from '../../redux/slices/UserTypeSlice';
import { setPrivacy, setTerms } from '../../redux/slices/PrivacyPolicySlice';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Loader from '../../components/loader/Loader';
import { API_END_POINT } from '../../services/Constant';
import {getData, postData} from '../../services/Services';
import '../../assets/css/variables.css';

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
  text-align: center;
`;

const FlashMessageTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: var(--flash-message-title-color);
`;

const FlashMessageContent = styled.p`
  font-size: 1rem;
  margin-bottom: 10px;
  color: var(--flash-message-content-color);
`;

const FlashMessageStatus = styled.div`
  color: var(--flash-message-status-color);
  font-weight: bold;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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
`;

const BusinessCardContainer = styled.div`
  background: var(--card-background-color);
  border-radius: 8px;
  padding: 20px;
  max-height: 250px;
  overflow-y: auto;
`;

const BusinessCardTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const BusinessCard = styled.div`
  background: var(--business-card-background-color);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  text-align: left;
  cursor: pointer;

  &:hover {
    background-color: var(--business-card-hover-background-color);
  }
`;

const BusinessCardTitleText = styled.p`
  font-size: 0.9rem;
  color: #555;
`;

const ToggleButton = styled.div`
  display: flex;
  text-transform:capitalize;
`;

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
  const { privacyPolicy, termsncondition} = useSelector((state: RootState) => state.terms);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(()=>{
    getTemplate()
  },[privacyPolicy,termsncondition])

  useEffect(() => {
    getInfo()
    getTermsNcondition()
    if(firstTimeModal)showSucessSubscriber()
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

    if (activeTab === configText.config.signature) {
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
    setLoader(true);
    const value = event.target.checked;
    const action = value ? "PUBLISH" : "UNPUBLISH";
    const actionUrl = value ? API_END_POINT.publishUrl : API_END_POINT.unPublishUrl;
    try {
      await postData(actionUrl, [], {
        headers: {
          Authorization: `Bearer ${token}`,
          langCode: lang,
        },
      });
      setToggleChecked(value);
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
    setModalSubMessage(' ')
  }

  const handleError = () => {
    setModalMessage('You have sucessfully subscribed to this services.')
    setModalType('success')
    setModalSubMessage(' ')
  }

  const getToggleLabel = (toggleChecked:boolean)=>{
    let valToReturn='';
    if(activeTab == configText.config.signature){
      valToReturn = toggleChecked ? 'signature active' : 'signature inactive'
    }else{
      valToReturn = toggleChecked ? 'status active' : 'status inactive'
    }
    return valToReturn;
  }


  

  const templates = activeTab === configText.config.signature ? signatureTemplates : statusTemplates
  let flashMessageToShow = activeTab === configText.config.signature ? signatureMessage : statusMessage

  const modalToShow = firstTimeModal || showModal

  let signatureButtonlabel = activeTab === configText.config.signature?configText.config.editSignature:"Edit Status"
  if(flashMessageToShow == ''){
    flashMessageToShow = `No ${activeTab === configText.config.signature ?configText.config.signature:configText.config.status } set, Please click on add signature to set.`;
    signatureButtonlabel = `Add ${activeTab === configText.config.signature ?configText.config.signature:configText.config.status }`
  }

  return (
    <Container>
      {loader && <Loader />}
      <Modal show={modalToShow} onClose={closeModal} message={modalMessage} type={modalType} subMessage={modalSubMessage} buttonLabel={"Explore"}/>
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
          <FlashMessageContent>
            {flashMessageToShow}
          </FlashMessageContent>
          
          <ButtonContainer>
            <Button onClick={() => navigate('/preview')}>{configText.config.preview}</Button>
            <Button primary onClick={() => navigate('/edit-signature')}>{signatureButtonlabel}</Button>
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
                sx={{'textTransform':"capitalize"}}
              />
            }
            label={getToggleLabel(toggleChecked)}
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



