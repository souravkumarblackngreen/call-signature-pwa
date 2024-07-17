import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Replace with your logo path
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { startLoading, stopLoading } from '../../redux/slices/LoaderSlice';
import { setToken, setRefreshToken, setUserId } from '../../redux/slices/UserTypeSlice';
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
  font-size: 1.5rem;
  margin: 10px 0;
  color: black;
`;

const Subtitle = styled.h2`
  font-size: 1rem;
  margin-bottom: 20px;
  color: grey;
`;

const OtpContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 2%;
  width: 100%;
`;

const OtpInput = styled.input`
  width: 50px;
  height: 50px;
  font-size: 24px;
  text-align: center;
  border: 1px solid #e4ebf3;
  border-radius: 8px;
  background: white;
  color: black;

  &::placeholder {
    color: grey;
    opacity: 1;
  }
`;

const Disclaimer = styled.p`
  font-size: 0.8rem;
  margin: 10px 0;
  color: grey;
`;

const ResendOtp = styled.a`
  color: #1e90ff;
  cursor: pointer;
  text-decoration: none;
`;

const LoginButton = styled.button<{ disabled: boolean }>`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 25px;
  background-color: #0032e3;
  color: white;
  margin-top: 20px;
  width: 100%;
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

const OtpEntry: React.FC = () => {
  const [otp, setOtp] = useState<string[]>(new Array(4).fill(''));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const { phoneNumber, selectedPlan } = useSelector((state: RootState) => state.user);
  const configText = useSelector((state: RootState) => state.configText);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (otp[index] === '') {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    } else if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    if (otp.join('').length === 4) {
      dispatch(startLoading());
      const response = await getData(`${API_END_POINT.validateOTP}?msisdn=${phoneNumber}&otp=${otp.join('')}`);
      if (response.currentStatus === 'active') {
        const { refreshToken, token, userId } = response;
        navigate('/dashboard');
        dispatch(stopLoading());
        dispatch(setToken(token));
        dispatch(setRefreshToken(refreshToken));
        dispatch(setUserId(userId));
      } else if (response.data.response.currentStatus === 'new') {
        const res = await getData(API_END_POINT.subscribe + `?msisdn=${phoneNumber}&planId=${selectedPlan}`);
        if (res.data.response.currentStatus === 'new') {
          navigate('/dashboard');
        }
      }
    }
  };

  const handleResendOTP = async () => {
    dispatch(startLoading());
    await getData(API_END_POINT.resendOTP + `?msisdn=${phoneNumber}&otp=${selectedPlan}`);
    dispatch(stopLoading());
  };

  const isOtpComplete = otp.every(value => value !== '');

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
        <Subtitle>OTP Verification</Subtitle>
        <OtpContainer>
          {otp.map((value, index) => (
            <OtpInput
              key={index}
              type="text"
              maxLength={1}
              value={value}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
        </OtpContainer>
        <Disclaimer>We have sent a code to {phoneNumber} to verify your registration.</Disclaimer>
        <Disclaimer>
          Haven't got the code yet? <ResendOtp onClick={handleResendOTP}>Resend Code</ResendOtp>
        </Disclaimer>
        <LoginButton onClick={handleLogin} disabled={!isOtpComplete}>Submit</LoginButton>
      </Container>
    </>
  );
};

export default OtpEntry;
