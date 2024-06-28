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
  gap:100px;

  
`;

const Header = styled.div`
  width: 100%;
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
  height:40%;
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

const Profile: React.FC = () => {
    const navigate = useNavigate();
    const { SubscriptionPlan, SubscriptionDate ,NextRenewal } = useSelector((state: RootState) => state.profile);

    const handleBack = () => {
        navigate(-1);
    };

    console.log(SubscriptionDate)
    return (
        <Container>
            <HeaderContainer>
                <BackButton onClick={handleBack}><KeyboardArrowLeftSharpIcon /></BackButton>
                <Header>
                    <Title>Profile</Title>
                </Header>
            </HeaderContainer>

            <ProfileCard>
                <AccountBoxSharpIcon fontSize='large'/>
                <PhoneNumber>+91 9876543210</PhoneNumber>
                <InfoContainer>
                    <InfoLabel>Subscription Plan:</InfoLabel>
                    <InfoValue>{SubscriptionPlan}</InfoValue>
                </InfoContainer>
                <InfoContainer>
                    <InfoLabel>Subscription Date:</InfoLabel>
                    <InfoValue>{SubscriptionDate}</InfoValue>
                </InfoContainer>
                <InfoContainer>
                    <InfoLabel>Next Renewal:</InfoLabel>
                    <InfoValue>{NextRenewal}</InfoValue>
                </InfoContainer>
            </ProfileCard>
        </Container>
    );
};

export default Profile;
