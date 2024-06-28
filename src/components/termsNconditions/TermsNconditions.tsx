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

const ContentCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 80%;
  max-width: 400px;
  max-height: 400px; /* Set your desired maximum height here */
  overflow-y: auto; /* Add vertical scroll when content exceeds max-height */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Align items at the top */
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


const text = "Welcome to [Your Company Name] (“Company”, “we”, “our”, “us”)! As you have just clicked our Terms of Service, please pause, grab a cup of coffee and carefully read the following pages. It will take you approximately 20 minutes.\n\nThese Terms of Service (“Terms”, “Terms of Service”) govern your use of our web pages located at [Your Website URL] operated by [Your Company Name].\n\nOur Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.\n\nYour agreement with us includes these Terms and our Privacy Policy (“Agreements”). You acknowledge that you have read and understood Agreements and agree to be bound by them.\n\nIf you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at [Your Contact Email] so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.\n\n"

const TermsNconditions: React.FC = () => {
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
                    <Title> Terms and Condtions</Title>
                </Header>
            </HeaderContainer>

            <ContentCard>
                <p>{text+'ljdfslkjflksaj lfajs lajsfdlk jafl  lsdfjlkjasf llf jfljsdl How Many Paragraphs Is 150 Words? 150 words is about 0.75-1.5 paragraphs for essays or 1-3 for easier reading (to allow skimming). A paragraph length typically has 100-200 words and 5-6'}</p>
            </ContentCard>
        </Container>
    );
};

export default TermsNconditions;
