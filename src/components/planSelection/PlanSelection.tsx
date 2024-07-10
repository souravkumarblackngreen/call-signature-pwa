import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import logo from '../../assets/logo.png'; // Replace with your logo path
import background from '../../assets/SplashScreenBg.png'
import LanguageDropdown from '../languageDropdown/LanguageDropdown';
import { startLoading, stopLoading } from '../../redux/slices/LoaderSlice';
import { setPhoneNumber, setSelectedPlan } from '../../redux/slices/UserTypeSlice';
import { setLanguage, setLanguages } from '../../redux/slices/LanguageSlice';
import { setConfigText } from '../../redux/slices/GloabalTextDataSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import { RootState } from '../../redux/store';
import axios from 'axios';
import { API_END_POINT } from "../../services/Constant";

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
  width:100%;
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
  background: ${(props) => (props.selected ? '#0032DF;' : 'white')};
  color: ${(props) => (props.selected ? 'white' : '#0032DF;')};
  border: 1px solid ${(props) => (props.selected ? '#1E90FF' : '#ccc')};
  border-radius: 8px;
  padding: 10px 20px;
  margin: 0 10px;
  cursor: pointer;
  font-size: 1rem;
  min-height: 150px;
  width:25%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
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
    color: #FFFFFF; /* Change this to your desired color */
    opacity: 1; /* Adjust this if you need to change the opacity */
  }
`;

const Disclaimer = styled.p`
  font-size: 0.8rem;
  margin: 10px 0;
`;

const PlanDuration = styled.div`
  font-size: 0.8rem;
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
  const { isHeaderEnrichment, token, phoneNumber, selectedPlan } = useSelector((state: RootState) => state.user);
  const { lang, languages } = useSelector((state: RootState) => state.lang);
  const configText = useSelector((state: RootState) => state.configText);

  const [plans, setPlans] = useState<any[]>([]);


  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    getSubscription()
    getLanguageData()
  }, [])





  const getLanguageData = async () => {
    try {
      const response = await axios.get(API_END_POINT.baseUrl + API_END_POINT.allLanguage);

      if (response.data.statuscode == 200) {
        dispatch(setLanguages(response.data.response));

      }
    } catch (error: any) {

    }
  };


  const getSubscription = async () => {
    dispatch(startLoading())
    try {
      const response = await axios.get(API_END_POINT.baseUrl + API_END_POINT.subscriptionPlans, {
        // headers: {
        //   "langCode": 'en',
        //   "Authorization":`Bearer ${token}`

        // }
      })
      setPlans(response.data.response);
      dispatch(stopLoading())

    } catch {
      dispatch(stopLoading())
    }

  }


  const handleSelectPlan = (plan: string) => {
    dispatch(setSelectedPlan(plan));
  };

  const handleSendOtp = async () => {
    dispatch(startLoading());
    try {
      if (selectedPlan && phoneNumber) {
        const response = await axios.get(API_END_POINT.baseUrl + API_END_POINT.sendOTP + `?msisdn=${phoneNumber}&message=${selectedPlan}`)
        if (response.status == 200) {
          navigate('/enter-otp')
          dispatch(stopLoading())
        }
      }
    }
    catch {

    }

  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendOtp();
    }
  };

  const byPassSendOTP = () => {
    navigate('/dashboard');
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // // const phoneNumberPattern = /^[0-9]{0,10}$/;
    // console.log(value.length == 10)
    if(value.length == 10)
      return
    dispatch(setPhoneNumber(value));
    // if (phoneNumberPattern.test(value)) {
      
    // }
  };

  const isFormComplete = selectedPlan && (isHeaderEnrichment || phoneNumber);


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
              <PlanRate>
                {plan.displayName}
              </PlanRate>
              <PlanDuration>{plan.planId}</PlanDuration>
            </PlanButton>
          ))}
        </PlanContainer>
        {!isHeaderEnrichment && (
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
        )}
        <Disclaimer>
          {configText.config.disclaimer}
        </Disclaimer>
        <SendOtpButton onClick={isHeaderEnrichment ? byPassSendOTP : handleSendOtp} disabled={!isFormComplete}>
          {isHeaderEnrichment ? configText.config.subscribe : configText.config.sendOtp}
        </SendOtpButton>
      </Container>
    </>
  );
};

export default PlanSelection;
