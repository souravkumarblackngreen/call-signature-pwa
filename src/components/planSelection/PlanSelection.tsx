import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import background from '../../assets/SplashScreenBg.png';
import LanguageDropdown from '../languageDropdown/LanguageDropdown';
import { startLoading, stopLoading } from '../../redux/slices/LoaderSlice';
import { setPhoneNumber, setSelectedPlan, setToken } from '../../redux/slices/UserTypeSlice';
import { setLanguages } from '../../redux/slices/LanguageSlice';

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import { RootState } from '../../redux/store';

import { API_END_POINT } from '../../services/Constant';
import { getData } from '../../services/Services';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  height: 100vh;
  background: #451322;
  color: white;
  padding: 20px;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
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

const PhoneTitle = styled.span`
  font-size: 1.2rem;
  align-self: flex-start;
`;

const PlanContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
`;

const PhoneInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 22rem;
`;

const CallSignatureHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  align-items: center;
  gap: 5px;
`;

const PlanButton = styled.div<{ selected: boolean }>`
  background: ${(props) => (props.selected ? '#0032DF' : 'white')};
  color: ${(props) => (props.selected ? 'white' : '#0032DF')};
  border: 1px solid ${(props) => (props.selected ? '#1E90FF' : '#ccc')};
  border-radius: 8px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 1rem;
  min-height: 150px;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #e4ebf3;
  border-radius: 8px;
  font-size: 1rem;
  background: #262626;
  color: #e4ebf3;

  &::placeholder {
    color: #FFFFFF;
    opacity: 1;
  }
`;

const Disclaimer = styled.p`
  font-size: 0.8rem;
  margin: 10px 0;
`;

const PlanDuration = styled.div`
  font-size: 0.8rem;
`;
const PlanDisplayName = styled.div`
  font-size: 1.2rem;
`;

const PlanRate = styled.div`
  font-size: 1rem;
  display: flex;
  font-weight: 900;
  justify-content: center;
  align-items: center;
`;

const SendOtpButton = styled.button<{ disabled: boolean }>`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 25px;
  background-color: #0032DF;
  color: white;
  margin-bottom: 20%;
  width: 20rem;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const PlanSelection: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const { isHeaderEnrichment, phoneNumber, selectedPlan, mediaContent } = useSelector((state: RootState) => state.user);
  const { lang, languages } = useSelector((state: RootState) => state.lang);
  const configText = useSelector((state: RootState) => state.configText);
  const msisdnNo = '1234567899';

  const [plans, setPlans] = useState<any[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isHeaderEnrichment) {
      checkSub();
    }
    getSubscription();
    getLanguageData();
  }, []);

  const checkSub = async () => {
    const response = await getData(API_END_POINT.checkSubApi + msisdnNo);
    dispatch(startLoading());
    if (response.currentStatus === 'active') {
      dispatch(setToken(response.token));
      navigate('/dashboard');
    }
  };

  const getLanguageData = async () => {
    dispatch(startLoading());
    const response = await getData(API_END_POINT.allLanguage);
    dispatch(setLanguages(response));
    dispatch(stopLoading());
  };

  const getSubscription = async () => {
    dispatch(startLoading());
    const response = await getData(API_END_POINT.subscriptionPlans);
    setPlans(response);
    dispatch(stopLoading());
  };

  const handleSelectPlan = (plan: string) => {
    dispatch(setSelectedPlan(plan));
  };

  const handleLogin = () => {
    isHeaderEnrichment ? subscribers() : handleSendOtp();
  };

  const subscribers = async () => {
    dispatch(startLoading());
    const response = await getData(API_END_POINT.subscribe + `?msisdn=${msisdnNo}&planId=${selectedPlan}`);
    dispatch(stopLoading());
  };

  const handleSendOtp = async () => {
    navigate('/enter-phoneno');
    // dispatch(startLoading());
    // const response = await getData(API_END_POINT.sendOTP + `?msisdn=${phoneNumber}&message=${selectedPlan}`);
    // console.log(response, 'hello brother');
    // if (response.statuscode === 200) {
      
    //   dispatch(stopLoading());
    // }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendOtp();
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length === 11) return;
    dispatch(setPhoneNumber(value));
  };

  // const isFormComplete = selectedPlan && (isHeaderEnrichment || phoneNumber);

  const isFormComplete = selectedPlan
  return (
    <>
      {isLoading && <Loader />}
      <Container>
        <LanguageDropdown />
        <CallSignatureHeader>
          <Logo src={logo} alt="Call Signature" />
          <Title>{configText.config.callSignature}</Title>
        </CallSignatureHeader>
        <Subtitle>{configText.config.chooseTemplate}</Subtitle>
        <PlanContainer>
          {plans.map((plan) => (
            <PlanButton key={plan.planId} selected={selectedPlan === plan.planId} onClick={() => handleSelectPlan(plan.planId)}>
              <PlanDisplayName>{plan.displayName}</PlanDisplayName>
              <PlanRate>{`${plan.currency} ${plan.price}`} </PlanRate>
              <PlanDuration>{plan.duration}</PlanDuration>
            </PlanButton>
          ))}
        </PlanContainer>
        {/* {!isHeaderEnrichment && (
          <PhoneInputContainer>
            <PhoneTitle>{configText.config.phoneNo}</PhoneTitle>
            <Input
              type="number"
              placeholder={configText.config.phoneTitle}
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              onKeyDown={handleKeyDown}
            />
          </PhoneInputContainer>
        )} */}
        <Disclaimer>{configText.config.disclaimer}</Disclaimer>
        <SendOtpButton onClick={handleLogin} disabled={!isFormComplete}>
          {configText.config.subscribe}
        </SendOtpButton>
      </Container>
    </>
  );
};

export default PlanSelection;
