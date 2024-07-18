import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Replace with your logo path
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { startLoading, stopLoading } from '../../redux/slices/LoaderSlice';
import { setPhoneNumber } from '../../redux/slices/UserTypeSlice';
import Loader from '../loader/Loader';
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
  width:fit-content;
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

const PhoneNumberEntry: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const { selectedPlan } = useSelector((state: RootState) => state.user);

 
  const handleSendOtp = async () => {
    dispatch(startLoading());
    try {
      if (phoneNumber) {
        const response = await getData(API_END_POINT.sendOTP + `?msisdn=${phoneNumber}&message=${selectedPlan}`)
        navigate('/enter-otp')
        dispatch(stopLoading())
        
      }
    }
    catch {

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
        <Title>Call Signature</Title>
        <Subtitle>Your Voice, Your Mark: Personalized Calling with Call Signature</Subtitle>
        <WelComeTitle>Welcome</WelComeTitle>
        <InputContainer>
          <InputLabel>Phone Number</InputLabel>
          <InputField
            type="text"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </InputContainer>
        <SendOtpButton onClick={handleSendOtp} disabled={phoneNumber.length === 0}>
          Send OTP
        </SendOtpButton>
      </Container>
    </>
  );
};

export default PhoneNumberEntry;
