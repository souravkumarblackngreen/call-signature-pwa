import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import profilePic from '../../assets/profilePic.jpg'; // Replace with your profile picture path
import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
  color: #000;
  gap:50px;

  
`;

const Header = styled.div`
  width: 88%;
  display: flex;
  justify-content: center;
  align-items: center;
  background:#ffff;
`;

const BackButton = styled.div`
  font-size: 24px;
  cursor: pointer;
  border: 1px solid grey;
  border-radius: 50%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left:20px;
 
`;

const Title = styled.h1`
  font-size: 1.5rem;
  

`;

const ProfileCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  height:auto;
  max-width: 400px;
  display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const PhoneNumber = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  width:100%;
`;

const InfoLabel = styled.span`
  color: #888;
`;

const InfoValue = styled.span`
  color: #1E90FF;
  cursor: pointer;
`;
const HeaderContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
`


const text ="At [Your Company Name], we prioritize your privacy. Our Privacy Policy explains how we collect, use, and protect your personal information when you visit our website [Your Website URL]. We collect information such as your name, email address, and browsing behavior to enhance your experience. We do not share your data with third parties without your consent, except as required by law. By using our website, you agree to the collection and use of your information in accordance with this policy. If you have any concerns, please contact us at [Your Contact Email].\n\n"
const text2 = "Welcome to [Your Company Name] (“Company”, “we”, “our”, “us”)! As you have just clicked our Terms of Service, please pause, grab a cup of coffee and carefully read the following pages. It will take you approximately 20 minutes.\n\nThese Terms of Service (“Terms”, “Terms of Service”) govern your use of our web pages located at [Your Website URL] operated by [Your Company Name].\n\nOur Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.\n\nYour agreement with us includes these Terms and our Privacy Policy (“Agreements”). You acknowledge that you have read and understood Agreements and agree to be bound by them.\n\nIf you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at [Your Contact Email] so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.\n\n"

const PrivacyPolicy: React.FC = () => {
    const navigate = useNavigate();
    const { SubscriptionPlan, SubscriptionDate ,NextRenewal } = useSelector((state: RootState) => state.profile);

    const handleBack = () => {
        navigate(-1);
    };

    
    return (
        <Container>
            <HeaderContainer>
                <BackButton onClick={handleBack}><KeyboardArrowLeftSharpIcon /></BackButton>
                <Header>
                    <Title>Privacy Policy</Title>
                </Header>
            </HeaderContainer>

            <ProfileCard>
                {text}
            </ProfileCard>
        </Container>
    );
};

export default PrivacyPolicy;
