import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import mobileFrame from '../../assets/images/callScreen.png';
import notch from '../../assets/images/notch.png';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import '../../assets/css/variables.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  color: var(--text-color);
`;

const Header = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--card-background-color);
  color: #000;
`;

const Title = styled.h1`
  font-size: 1.5rem;
`;

const BackButton = styled.button`
font-size: 24px;
cursor: pointer;
border: 1px solid var(--greyColor);
border-radius: 50%;
padding: 5px;
display: flex;
justify-content: center;
align-items: center;
margin-left: 20px;
background:var(--whiteColor);
align-self:flex-start;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MobileFrame = styled.div<{mobileFrame:string}>`
  position: relative;
  width: 300px;
  height: 600px;
  background-image: url(${mobileFrame});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const MobileNotch = styled.div<{notch:string}>`
  position: absolute;
  width: 50%;
  height: 5%;
  top:0;
  left:25%;
  background-image: url(${notch});
  background-size: cover;
  background-position: center;
  
`;

const PreviewContent = styled.div`
  position: absolute;
  width: 74%;
  text-align: center;
  height:90%;
  background: var(--blackColor); /* Set the background to black */
  color: var(--whiteColor);
  padding: 20px;
  border-radius: 16px;
  display:flex;
  flex-direction:column;
  algin-items:center;
  justify-content:center;
`;

const PhoneNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FlashMessageContainer = styled.div`
  background: var(--preview-flashmessage-containerBg);
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 20px;
`;

const FlashMessageTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const FlashMessageContent = styled.p`
  font-size: 1rem;
`;

const Preview: React.FC = () => {
  const navigate = useNavigate();
  const { statusMessage, signatureMessage } = useSelector((state: RootState) => state.dashboard);
  const { activeTab } = useSelector((state: RootState) => state.signatureTabs);
  const { userId, mediaContent} = useSelector((state: RootState) => state.user);
  const configText = useSelector((state: RootState) => state.configText);
  

  const handleBack = () => {
    navigate(-1);
  };


  const flashMessageToShow = activeTab.toLocaleLowerCase() === 'signature' ? signatureMessage : statusMessage
  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}><KeyboardArrowLeftSharpIcon /></BackButton>
        <Title>{configText.config.preview}</Title>
        <div  style={{ width: '24px' }} /> 
      </Header>
      <Content>
        <MobileFrame mobileFrame={mediaContent.callScreen}>
          <PreviewContent>
            <MobileNotch notch={mediaContent.notch}/>
            <PhoneNumber>+91-{userId}</PhoneNumber>
            <FlashMessageContainer>
              <FlashMessageTitle>{configText.config.flashMessage}</FlashMessageTitle>
              <FlashMessageContent>
                {flashMessageToShow}
              </FlashMessageContent>
            </FlashMessageContainer>
          </PreviewContent>
        </MobileFrame>
      </Content>
    </Container>
  );
};

export default Preview;
