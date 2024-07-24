import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import AccountBoxSharpIcon from '@mui/icons-material/AccountBoxSharp';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/loader/Loader';

import { setSubscriptionDate,setNextRenewal,setSubscriptionPlan,setPhoneNo} from '../../redux/slices/ProfileSlice';
import { formatDate, getData } from '../../services/Services';
import { API_END_POINT } from '../../services/Constant';
import { startLoading, stopLoading } from '../../redux/slices/LoaderSlice';
import '../../assets/css/variables.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
  color: var(--text-color);
  gap:100px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background:var(--header-background-color);
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
  background: var(--header-background-color);
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
  color: var(--planButtonBorderColorSecondary);
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
    const dispatch = useDispatch();

    const { SubscriptionPlan, SubscriptionDate ,NextRenewal ,PhoneNo} = useSelector((state: RootState) => state.profile);
    const { token } = useSelector((state: RootState) => state.user);
    const { lang } = useSelector((state: RootState) => state.lang);
    
    const isLoading = useSelector((state: RootState) => state.loader.isLoading);
    const configText = useSelector((state: RootState) => state.configText);

    const handleBack = () => {
        navigate(-1);
    };

    
    useEffect(() => {
      getUserProfile();
    }, []);

    const getUserProfile = async () => {
      dispatch(startLoading())
      try {
        const response = await getData(API_END_POINT.profileUrl,{
          headers: {
            Authorization:  `Bearer ${token}`,
            langCode: lang,
        },
        });
        
        const{
          planStartDate,
          planEndDate,
          userId,
          duration

          } = response
       
        dispatch(setPhoneNo(userId))
        dispatch(setSubscriptionDate(planStartDate))
        dispatch(setNextRenewal(planEndDate))
        dispatch(setSubscriptionPlan(duration))
        dispatch(stopLoading())

      } catch (error: any) {
        dispatch(stopLoading())
      }
    };

    
   
    return (
        <Container>
          {isLoading && <Loader/>}
            <HeaderContainer>
                <BackButton onClick={handleBack}><KeyboardArrowLeftSharpIcon /></BackButton>
                <Header>
                    <Title>{configText.config.profile}</Title>
                </Header>
            </HeaderContainer>

            <ProfileCard>
                <AccountBoxSharpIcon fontSize='large'/>
                <PhoneNumber>{PhoneNo}</PhoneNumber>
                <InfoContainer>
                    <InfoLabel>{configText.config.subscriptionPlan}:</InfoLabel>
                    <InfoValue>{SubscriptionPlan}</InfoValue>
                </InfoContainer>
                <InfoContainer>
                    <InfoLabel>{configText.config.subscription_date}:</InfoLabel>
                    <InfoValue>{formatDate(SubscriptionDate)}</InfoValue>
                </InfoContainer>
                <InfoContainer>
                    <InfoLabel>{configText.config.next_renewal}:</InfoLabel>
                    <InfoValue>{formatDate(NextRenewal)}</InfoValue>
                </InfoContainer>
            </ProfileCard>
        </Container>
    );
};

export default Profile;
