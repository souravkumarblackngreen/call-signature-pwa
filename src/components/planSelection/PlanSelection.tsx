import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import logo from '../../assets/logo.png'; // Replace with your logo path
import background from '../../assets/SplashScreenBg.png'
import LanguageDropdown from '../languageDropdown/LanguageDropdown';
import { startLoading, stopLoading } from '../../redux/slices/LoaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import { RootState } from '../../redux/store';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content:flex-end;
  text-align: center;
  height: 100vh;
  background:#451322;
  color: white;
  padding: 20px;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
`;



const Logo = styled.img`
  width: 40px;
  height:38px;
  
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
  align-self:flex-start;
`;

const PlanContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;
const PhoneInputContainer = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  width:22rem;
`;
const CallSignatureHeader = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  align-items:center;
  gap:5px;
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
  
  min-height:100px;
  display:flex;
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
  background:#262626;
  color:#e4ebf3;

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
  font-size: 1.4rem;
  display:flex;
  font-weight:900;
  justify-content:center;
  align-items:center;
`;

const SendOtpButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 25px;
  background-color: #0032DF;
  color: white;
  margin-bottom:20%;
  width:20rem;

`;

const PlanSelection: React.FC = () => {
    const [selectedPlan, setSelectedPlan] = useState<string>('Monthly');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const isLoading = useSelector((state: RootState) => state.loader.isLoading);
    const {isHeaderEnrichment} = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    const handleSelectPlan = (plan: string) => {
        setSelectedPlan(plan);
    };

    const handleSendOtp = () => {
        if (selectedPlan && phoneNumber) {
          dispatch(startLoading());
          setTimeout(() => {
            dispatch(stopLoading());
            navigate('/enter-otp'); // Assuming you have a success page
          }, 2000);
            

        }
    };
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          handleSendOtp();
        }
      };
      const byPassSendOTP = () => {
      navigate('/dashboard')
      };

    return (
      <>
      {isLoading && (
        <Loader/>
      )}
        <Container>
          <LanguageDropdown/>
            <CallSignatureHeader>
                <Logo src={logo} alt="Call Signature" />
                <Title>Call Signature</Title>
            </CallSignatureHeader>

            <Subtitle>Choose Your Plan</Subtitle>
            <PlanContainer>
                <PlanButton selected={selectedPlan === 'Daily'} onClick={() => handleSelectPlan('Daily')}>

                    <PlanRate> 25
                        <AttachMoneySharpIcon /> </PlanRate>
                    <PlanDuration>Daily</PlanDuration>
                </PlanButton>
                <PlanButton selected={selectedPlan === 'Weekly'} onClick={() => handleSelectPlan('Weekly')}>

                    <PlanRate> 40
                        <AttachMoneySharpIcon /> </PlanRate>
                    <PlanDuration>Weekly</PlanDuration>
                </PlanButton>
                <PlanButton selected={selectedPlan === 'Monthly'} onClick={() => handleSelectPlan('Monthly')}>

                    <PlanRate> 50
                        <AttachMoneySharpIcon /> </PlanRate>

                    <PlanDuration> Monthly</PlanDuration>

                </PlanButton>
            </PlanContainer>
            {
              !isHeaderEnrichment && <PhoneInputContainer>
              <PhoneTitle>Phone number</PhoneTitle>
               <Input
                  type="number"
                  placeholder="Enter Phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={handleKeyDown}
              />
          </PhoneInputContainer>
            }
            

            <Disclaimer>
                By registering yourself to this platform you have agreed to the terms and conditions of the platform
            </Disclaimer>
            <SendOtpButton onClick={isHeaderEnrichment?byPassSendOTP:handleSendOtp}>{isHeaderEnrichment?"Subscribe":"Send OTP"}</SendOtpButton>
        </Container>
      </>
      
    );
};

export default PlanSelection;
