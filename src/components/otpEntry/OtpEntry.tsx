import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Replace with your logo path
import background from '../../assets/SplashScreenBg.png'
import LanguageDropdown from '../languageDropdown/LanguageDropdown';
import { startLoading, stopLoading } from '../../redux/slices/LoaderSlice';
import { setToken, setRefreshToken, setUserId } from '../../redux/slices/UserTypeSlice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Loader from '../loader/Loader';
import axios from 'axios';
import { API_END_POINT } from '../../services/Constant';


const Container = styled.div<{ isLoading: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
  background: #451322;
  justify-content: flex-end;
  color: white;
  padding: 20px;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  ${({ isLoading }) =>
    isLoading &&
    css`
      filter: blur(5px);
    `}
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
  margin-bottom: 20px;
`;

const OtpContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 2%;
  flex-wrap: wrap;
  width: 100vw;
`;

const OtpInput = styled.input`
  width: 50px;
  height: 50px;
  font-size: 24px;
  text-align: center;
  border: 1px solid #e4ebf3;
  border-radius: 8px;
  background: #262626;
  color: #ffff;

  &::placeholder {
    color: #FFFFFF; /* Change this to your desired color */
    opacity: 1; /* Adjust this if you need to change the opacity */
  }
`;

const Disclaimer = styled.p`
  font-size: 0.8rem;
  margin: 10px 0;
`;

const ResendOtp = styled.a`
  color: #1E90FF;
  cursor: pointer;
  text-decoration: none;
`;

const LoginButton = styled.button<{ disabled: boolean }>`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 25px;
  background-color: #0032E3;
  color: white;
  margin-bottom: 20%;
  width: 20rem;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

const CallSignatureHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  align-items: center;
  gap: 5px;
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
  const { phoneNumber,selectedPlan } = useSelector((state: RootState) => state.user);
  const configText = useSelector((state: RootState) => state.configText);
  
  const handleChange = (value: string, index: number) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to the next input field
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value === '') {
      // Clear the current input
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
      // Assuming you have a success page
      dispatch(startLoading());
      const response = await axios.get(`${API_END_POINT.baseUrl + API_END_POINT.validateOTP}?msisdn=${phoneNumber}&message=${otp.join('')}`);

      if (response.status === 200) {
        const { refreshToken, token, userId, userType } = response.data.response;
       
        navigate('/dashboard');
        dispatch(stopLoading());
        dispatch(setToken(token));
        dispatch(setRefreshToken(refreshToken));
        dispatch(setUserId(userId));
      }
    }
  };

 

  const handleResendOTP= async()=>{
    dispatch(startLoading());
    try{
      
        const response = await axios.get(API_END_POINT.baseUrl+API_END_POINT.resendOTP+`?msisdn=${phoneNumber}&message=${selectedPlan}`)
      
        if(response.status == 200){
       
          dispatch(stopLoading())
        }
      
    }
    catch{

    }
  }
  const isOtpComplete = otp.every(value => value !== '');


  return (
    <>
      {isLoading && (
        <Loader />
      )}
      <Container isLoading={isLoading}>
        <LanguageDropdown />
        <CallSignatureHeader>
          <Logo src={logo} alt="Call Signature" />
          <Title>{configText.config.callSignature}</Title>
        </CallSignatureHeader>
        <Subtitle>{configText.config.enterOTP}</Subtitle>
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
        <Disclaimer>{configText.config.otpSent+ phoneNumber}</Disclaimer>
        <Disclaimer style={{ color: 'grey' }}>
          {configText.config.resendOtpText}<ResendOtp onClick={handleResendOTP}>{configText.config.resendOtp}</ResendOtp>
        </Disclaimer>
        <LoginButton onClick={handleLogin} disabled={!isOtpComplete}>{configText.config.login}</LoginButton>
      </Container>
    </>
  );
};

export default OtpEntry;
