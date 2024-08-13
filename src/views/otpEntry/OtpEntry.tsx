import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png'; // Replace with your logo path
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { startLoading, stopLoading } from '../../redux/slices/LoaderSlice';
import { setToken, setRefreshToken, setUserId, setFirstTimeModal } from '../../redux/slices/UserTypeSlice';
import Loader from '../../components/loader/Loader';
import { API_END_POINT } from '../../services/Constant';
// import { getData } from '../../services/Services';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import '../../assets/css/variables.css';
import Modal from '../../components/modal/Modal';
import useCommonServices from '../../services/useCommonService';

const Container = styled.div<{ isLoading: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
  background: var(--whiteColor);
  justify-content: flex-start;
  gap:10px;
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
  border: 1px solid var(--otpInputBorderColor);
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
  color: var(--planButtonBorderColorSecondary);
  cursor: pointer;
  text-decoration: none;
`;

const LoginButton = styled.button<{ disabled: boolean }>`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 25px;
  background-color: var(--otpLoginButtonColor);
  color: white;
  max-width:400px;
  margin-top: 20px;
  width: 94%;
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

const VerificationLabel =  styled.h1`
font-size: 1.5rem;
margin: 10px 0;
padding-bottom: 25px;
color: black;
`;

const BackButton = styled.button`
font-size: 24px;
cursor: pointer;
border: 1px solid grey;
border-radius: 50%;
padding: 5px;
display: flex;
justify-content: center;
align-items: center;
margin:20px 0 0 20px;
background:white;
align-self:flex-start;

`;

const OtpEntry: React.FC = () => {

const OTP_BOX_NO = Number(process.env.REACT_APP_OTP_BOX_NO);

if (isNaN(OTP_BOX_NO)) {
  throw new Error('REACT_APP_OTP_BOX_NO environment variable is not a valid number');
}
  const [otp, setOtp] = useState<string[]>(new Array(OTP_BOX_NO).fill(''));
  const [showModal,setShowModal] = useState(false);
  const [modalType,setModalType] = useState('error');
  const [modalTitle, setModalTitle] = useState('')
  const [modalMessage, setModalMessage] = useState('');
  const [modalSubMessage, setModalSubMessage] = useState('')
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const { phoneNumber, selectedPlan } = useSelector((state: RootState) => state.user);
  const configText = useSelector((state: RootState) => state.configText);
  const { lang } = useSelector((state: RootState) => state.lang);

  const { getData } = useCommonServices();

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
    if (otp.join('').length === OTP_BOX_NO) {
      dispatch(startLoading());
      
      try {
        const response = await getData(`${API_END_POINT.validateOTP}?msisdn=${phoneNumber}&otp=${otp.join('')}`);
        
        if (response.currentStatus === 'active') {
          const { refreshToken, token, userId } = response;
          navigate('/dashboard');
          dispatch(stopLoading());
          dispatch(setToken(token));
          dispatch(setRefreshToken(refreshToken));
          dispatch(setUserId(userId));
          dispatch(setFirstTimeModal(false))
        } else if (response.currentStatus === 'new') {
          try {
            const res = await getData(API_END_POINT.subscribe + `?msisdn=${phoneNumber}&planId=${selectedPlan}`);
            
            if (res.currentStatus === 'active') {
              const { refreshToken, token, userId } = res;
              dispatch(stopLoading());
              dispatch(setToken(token));
              dispatch(setRefreshToken(refreshToken));
              dispatch(setUserId(userId));
              dispatch(setFirstTimeModal(true));
              navigate('/dashboard');
            }
          } catch (err:any) {
            console.log(err);
            dispatch(stopLoading());
            const message = err.response?.data?.message || 'An error occurred during subscription';
            setModalTitle('Opps');
            setModalMessage(message);
            setModalSubMessage(' ');
            setShowModal(true);
            setModalType('error')
          }
        }
      } catch (err:any) {
        console.log(err);
        dispatch(stopLoading());
        const message = err.response?.data?.message || 'An error occurred while validating OTP';
        setModalTitle('Opps');
        setModalMessage(message);
        setModalSubMessage(' ');
        setShowModal(true);
        setModalType('error')
      }
    }
  };

  const handleResendOTP = async () => {
    dispatch(startLoading());
    try{
      await getData(API_END_POINT.resendOTP + `?msisdn=${phoneNumber}`);
      dispatch(stopLoading());
      const message = 'A new OTP has been sent to your registered mobile number.';
      setModalTitle(configText.config.successful);
      setModalType('success')
      setModalMessage(message);
      setModalSubMessage(' ');
      setShowModal(true);
      setOtp(new Array(OTP_BOX_NO).fill(''));
    }catch(err:any){
      dispatch(stopLoading());
      console.log(err);
        const message = err.response?.data?.message || 'An error occurred while resending OTP';
        setModalTitle('Opps');
        setModalMessage(message);
        setModalSubMessage(' ');
        setShowModal(true);
        setModalType('error')
    }
    
   
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleBack = () => {
    navigate(-1);
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
      <Modal modalTitle={modalTitle} show={showModal} onClose={closeModal} message={modalMessage} subMessage={modalSubMessage} type={modalType}/>
      <BackButton onClick={handleBack}><KeyboardArrowLeftSharpIcon /></BackButton>
        <Logo src={logo} alt="Call Signature" />
        <Title>{configText.config.callSignature}</Title>
        <Subtitle>{configText.config.your_voice_your_mark}</Subtitle>
        <VerificationLabel>{configText.config.otp_verification}</VerificationLabel>
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
        <Disclaimer>{configText.config.sent_code + `+${process.env.REACT_APP_OTP_CountryCode}-` +phoneNumber + ' '+configText.config.verify_registration}</Disclaimer>
        <Disclaimer>
          {configText.config.not_got_code} <ResendOtp onClick={handleResendOTP}>{configText.config.resend_code}</ResendOtp>
        </Disclaimer>
        <LoginButton onClick={handleLogin} disabled={!isOtpComplete}>{configText.config.submit}</LoginButton>
      </Container>
    </>
  );
};

export default OtpEntry;
