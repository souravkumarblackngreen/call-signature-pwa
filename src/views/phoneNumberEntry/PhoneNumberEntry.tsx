import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Replace with your logo path
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { startLoading, stopLoading } from '../../redux/slices/LoaderSlice';
import { setPhoneNumber } from '../../redux/slices/UserTypeSlice';
import Loader from '../../components/loader/Loader';
import { API_END_POINT } from '../../services/Constant';
import { getData } from '../../services/Services';

const Container = styled.div<{ isLoading: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
  background: white;
  justify-content: flex-start;
  padding: 20px;
  ${({ isLoading }) =>
    isLoading &&
    css`
      filter: blur(5px);
    `}
`;

const Logo = styled.img`
  width: 80px;
  height: 80px;
  margin-top: 20px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin: 10px 0;
  color: black;
`;
const WelComeTitle = styled.h1`
  font-size: 1.5rem;
  margin: 10px 0;
  padding-bottom: 25px;
  color: black;
`;

const Subtitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 20px;
  color: grey;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
`;

const InputLabel = styled.div`
  font-size: 1rem;
  color: black;
  margin-bottom: 5px;
  width: fit-content;
`;

const InputField = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #e4ebf3;
  border-radius: 8px;
  background: #f5f5f5;
  color: black;

  &::placeholder {
    color: grey;
    opacity: 1;
  }
`;

const SendOtpButton = styled.button<{ disabled: boolean }>`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 25px;
  background-color: #0032e3;
  color: white;
  margin-top: 20px;
  width: 100%;
  max-width: 400px;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const ErrorContainer = styled.div`
  display:flex;
  color:red;
  font-size:0.8rem;
  padding:4px;
`;

const PhoneNumberEntry: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const { selectedPlan, phoneNumber } = useSelector((state: RootState) => state.user);
  const configText = useSelector((state: RootState) => state.configText);

  const [errorMessage, setErrorMessage] = useState('');



 
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,10}$/.test(value)) {
      dispatch(setPhoneNumber(value));
      setErrorMessage('');
    } else {
      setErrorMessage('Please enter a valid 10-digit phone number');
    }
  };

  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit phone number');
      return;
    }
    dispatch(startLoading());
    try {
      if (phoneNumber) {
        const response = await getData(API_END_POINT.sendOTP + `?msisdn=${phoneNumber}&message=${selectedPlan}`); 
        if(response.statuscode == 200){
            navigate('/enter-otp');
            dispatch(stopLoading());
        }
        
      }
    } catch {
      // Handle error
    }
  };

  return (
    <>
      {isLoading && (
        <LoaderOverlay>
          <Loader />
        </LoaderOverlay>
      )}
      <Container isLoading={isLoading}>
        <Logo src={logo} alt="Call Signature" />
        <Title>{configText.config.callSignature}</Title>
        <Subtitle>{configText.config.your_voice_your_mark}</Subtitle>
        <WelComeTitle>{configText.config.welcome}</WelComeTitle>
        <InputContainer>
          <InputLabel>{configText.config.phoneTitle}</InputLabel>
          <InputField
            type="text"
            placeholder={configText.config.phoneNo}
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          {errorMessage && <ErrorContainer >{errorMessage}</ErrorContainer>}
        </InputContainer>
        <SendOtpButton onClick={handleSendOtp} disabled={phoneNumber.length !== 10}>
          {configText.config.sendOtp}
        </SendOtpButton>
      </Container>
    </>
  );
};

export default PhoneNumberEntry;
