import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import background from '../../assets/images/SplashScreenBg.png';
import LanguageDropdown from '../../components/languageDropdown/LanguageDropdown';
import { startLoading, stopLoading } from '../../redux/slices/LoaderSlice';
import { setFirstTimeModal, setPhoneNumber, setRefreshToken, setSelectedPlan, setToken, setUserId } from '../../redux/slices/UserTypeSlice';
import { setLanguages } from '../../redux/slices/LanguageSlice';

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';
import { RootState } from '../../redux/store';

import { API_END_POINT } from "../../services/Constant";
import { getData } from '../../services/Services';
import '../../assets/css/variables.css';
import Modal from '../../components/modal/Modal';

const Container = styled.div<{ background: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  height: 100vh;
  background: var(--homeBackgroundColor);
  color: white;
  background-image: url(${background});
  background-size: cover;
  background-repeat: no-repeat;
`;

const Logo = styled.img`
  width: 40px;
  height: 38px;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 10px 0;
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const PlanContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none; /* Hide scrollbar for Webkit browsers */
  }

  & > div {
    scroll-snap-align: start;
    flex: 0 0 auto;
  }
`;

const CallSignatureHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  align-items: center;
  gap: 5px;
`;

const PlanButton = styled.div<{ selected: boolean }>`
  background: ${(props) => (props.selected ? 'var(--button-background-color-primary)' : 'white')};
  color: ${(props) => (props.selected ? 'white' : 'var(--button-background-color-primary)')};
  border: 1px solid;
  border-radius: 8px;
  padding: 20px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 1rem;
  min-height: 120px;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: ${(props) => (!props.selected ? '0 4px 8px rgba(0, 0, 0, 0.1)' : '0px 0px 22px #fff')};

  @media (max-width: 768px) {
    width: 40%;
  }

  @media (max-width: 480px) {
    width: 22%;
  }
`;

const Disclaimer = styled.p`
  font-size: 0.7rem;
  margin: 10px 0;
`;

const PlanDuration = styled.div`
  font-size: 0.8rem;
`;

const PlanDisplayName = styled.div`
  font-size: 0.8rem;
`;

const PlanRate = styled.div`
  font-size: 1.5rem;
  display: flex;
  font-weight: 900;
  justify-content: center;
  align-items: center;
`;

const PlanCurrency = styled.span`
  margin-right: 5px;
`;

const PlanPrice = styled.span`
  font-size: 2rem;
`;

const SubscribeButton = styled.button<{ disabled: boolean }>`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 25px;
  background-color: var(--button-background-color-primary);
  color: white;
  margin-bottom: 10px;
  width: 20rem;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const LoginLink = styled.div`
  color: white;
  font-size: 0.8rem;
  text-decoration: none;
  margin-bottom: 15%;
  display: flex;
  gap: 4px;
`;

const LoginLinkButton = styled.div`
  color: white;
  font-size: 0.8rem;
  text-decoration: none;
  font-weight: 800;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
 const DisclaimerAnd = styled.span`
  margin:0 4px;
 `

const TermsandPrivacyContainer = styled.span`
  margin-left: 5px;
  cursor: pointer;
  color: var(--button-background-color-primary);
  text-decoration: underline;
  text-transform: capitalize;
`;

const PlanSelection: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const { selectedPlan, phoneNumber, isHeaderEnrichment } = useSelector((state: RootState) => state.user);
  const { mediaContent } = useSelector((state: RootState) => state.mediaContent);
  const configText = useSelector((state: RootState) => state.configText);
  const { lang } = useSelector((state: RootState) => state.lang);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('error');
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalSubMessage, setModalSubMessage] = useState('');

  const [plans, setPlans] = useState<any[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getSubscription();
    getLanguageData();
    if (isHeaderEnrichment) {
      checkSum();
    }
  }, [lang]);

  useEffect(() => {
    if (plans.length === 1) {
      dispatch(setSelectedPlan(plans[0].planId));
    }
  }, [plans, dispatch]);

  const checkSum = async () => {
    try {
      dispatch(startLoading());
      const response = await getData(API_END_POINT.checkSubApi + phoneNumber);
      if (response.currentStatus === 'active') {
        const { refreshToken, token, userId } = response;
        navigate('/dashboard');
        dispatch(stopLoading());
        dispatch(setToken(token));
        dispatch(setRefreshToken(refreshToken));
        dispatch(setUserId(userId));
        dispatch(setFirstTimeModal(false));
      }
    } catch (err: any) {
      dispatch(stopLoading());
      console.log(err);
      const message = err.response?.data?.message || 'An error occurred';
      setModalTitle('Opps');
      setModalMessage(message);
      setModalSubMessage(' ');
      setShowModal(true);
    }
  };

  const getLanguageData = async () => {
    try {
      const response = await getData(API_END_POINT.allLanguage);
      dispatch(setLanguages(response));
    } catch (err: any) {
      dispatch(stopLoading());
      console.log(err);
      const message = err.response?.data?.message || 'An error occurred';
      setModalTitle('Opps');
      setModalMessage(message);
      setModalSubMessage(' ');
      setShowModal(true);
    }
  };

  const getSubscription = async () => {
    try {
      dispatch(startLoading());
      const response = await getData(API_END_POINT.subscriptionPlans, {
        headers: {
          langCode: lang,
        },
      });
      setPlans(response);
      dispatch(stopLoading());
    } catch (err: any) {
      dispatch(stopLoading());
      console.log(err);
      const message = err.response?.data?.message || 'An error occurred';
      setModalTitle('Opps');
      setModalMessage(message);
      setModalSubMessage(' ');
      setShowModal(true);
    }
  };

  const handleSelectPlan = (plan: string) => {
    dispatch(setSelectedPlan(plan));
  };

  const moveToEnterPhonenoRoute = () => {
    navigate('/enter-phoneno');
  };

  const resetPlanBeforeMove = () => {
    dispatch(setSelectedPlan(''));
    dispatch(setPhoneNumber(''));
    navigate('/enter-phoneno');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const subscribeUser = async () => {
    try {
      const res = await getData(API_END_POINT.subscribe + `?msisdn=${phoneNumber}&planId=${selectedPlan}`);
      if (res.currentStatus === 'active') {
        const { refreshToken, token, userId } = res;
        navigate('/dashboard');
        dispatch(stopLoading());
        dispatch(setToken(token));
        dispatch(setRefreshToken(refreshToken));
        dispatch(setUserId(userId));
      }
    } catch (err: any) {
      dispatch(stopLoading());
      console.log(err);
      const message = err.response?.data?.message || 'An error occurred';
      setModalTitle('Opps');
      setModalMessage(message);
      setModalSubMessage(' ');
      setShowModal(true);
    }
  };

  const handleSubscribeButton = () => {
    isHeaderEnrichment ? subscribeUser() : moveToEnterPhonenoRoute();
  };

  const isFormComplete = selectedPlan;

  return (
    <>
      {isLoading && <Loader />}
      <Container background={mediaContent.splashScreenBg}>
        <Modal modalTitle={modalTitle} show={showModal} onClose={closeModal} message={modalMessage} subMessage={modalSubMessage} type={modalType} />
        <LanguageDropdown />
        <CallSignatureHeader>
          <Logo src={mediaContent.logo} alt="Call Signature" />
          <Title>{configText.config.callSignature}</Title>
        </CallSignatureHeader>
        <Subtitle>{configText.config.chooseYourPlan}</Subtitle>
        <PlanContainer>
          {plans.map((plan) => (
            <PlanButton key={plan.planId} selected={selectedPlan === plan.planId} onClick={() => handleSelectPlan(plan.planId)}>
              <PlanDisplayName>{plan.displayName}</PlanDisplayName>
              <PlanRate>
                <PlanCurrency>{plan.currency}</PlanCurrency>
                <PlanPrice>{plan.price}</PlanPrice>
              </PlanRate>
              <PlanDuration>{plan.duration}</PlanDuration>
            </PlanButton>
          ))}
        </PlanContainer>
        <Disclaimer>
          {configText.config.byRegistering + ' '}
          <TermsandPrivacyContainer onClick={() => navigate('/termsNconditions')}>{configText.config.termsNconditions}</TermsandPrivacyContainer> <DisclaimerAnd>{configText.config.and}</DisclaimerAnd>{' '}
          <TermsandPrivacyContainer onClick={() => navigate('/privacy-policy')}>{configText.config.privacyPolicy} </TermsandPrivacyContainer> {' ' + configText.config.ofThePlatform}
        </Disclaimer>
        <SubscribeButton onClick={handleSubscribeButton} disabled={!isFormComplete}>
          {configText.config.subscribe}
        </SubscribeButton>
        {!isHeaderEnrichment && (
          <LoginLink>
            {configText.config.already_existing_user} <LoginLinkButton onClick={resetPlanBeforeMove}>{configText.config.click_here_to_login}</LoginLinkButton>
          </LoginLink>
        )}
      </Container>
    </>
  );
};

export default PlanSelection;
