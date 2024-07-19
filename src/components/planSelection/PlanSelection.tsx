import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';

import logo from '../../assets/logo.png'; // Replace with your logo path
import background from '../../assets/SplashScreenBg.png'
import LanguageDropdown from '../languageDropdown/LanguageDropdown';
import { startLoading, stopLoading } from '../../redux/slices/LoaderSlice';
import { setPhoneNumber, setSelectedPlan } from '../../redux/slices/UserTypeSlice';
import { setLanguages } from '../../redux/slices/LanguageSlice';

import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import { RootState } from '../../redux/store';
import axios from 'axios';
import { API_END_POINT } from "../../services/Constant";
import { getData } from '../../services/Services';

const Container = styled.div<{ background: string }>`
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

const PlanContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
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
  padding: 20px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 1rem;
  min-height: 150px;
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Disclaimer = styled.p`
  font-size: 0.8rem;
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

const SendOtpButton = styled.button<{ disabled: boolean }>`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 25px;
  background-color: #0032DF;
  color: white;
  margin-bottom: 10px;
  width: 20rem;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const LoginLink = styled(Link)`
  color: white;
  font-size: 0.8rem;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const PlanSelection: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const { isHeaderEnrichment, phoneNumber, selectedPlan, mediaContent } = useSelector((state: RootState) => state.user);
  const { lang, languages } = useSelector((state: RootState) => state.lang);
  const configText = useSelector((state: RootState) => state.configText);

  const [plans, setPlans] = useState<any[]>([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getSubscription();
    getLanguageData();
  }, []);

  const getLanguageData = async () => {
    const response = await getData(API_END_POINT.allLanguage);
    dispatch(setLanguages(response));
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

  const moveToEnterPhonenoRoute = () => {
    navigate('/enter-phoneno');
  };

  const isFormComplete = selectedPlan;

  return (
    <>
      {isLoading && <Loader />}
      <Container background={mediaContent.splashScreenBg}>
        <LanguageDropdown />
        <CallSignatureHeader>
          <Logo src={mediaContent.logo} alt="Call Signature" />
          <Title>{configText.config.callSignature}</Title>
        </CallSignatureHeader>
        <Subtitle>{configText.config.chooseTemplate}</Subtitle>
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
          {configText.config.disclaimer}
        </Disclaimer>
        <SendOtpButton onClick={moveToEnterPhonenoRoute} disabled={!isFormComplete}>
          {configText.config.subscribe}
        </SendOtpButton>
        <LoginLink to="/login">Already existing user? Click here to login</LoginLink>
      </Container>
    </>
  );
};

export default PlanSelection;
