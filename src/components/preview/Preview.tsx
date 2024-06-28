import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import mobileFrame from '../../assets/callScreen.png';
import notch from '../../assets/notch.png';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  color: #000;
`;

const Header = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  color: #000;
`;

const Title = styled.h1`
  font-size: 1.5rem;
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
margin-left: 20px;
background:white;
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MobileFrame = styled.div`
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
const MobileNotch = styled.div`
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
  background: black; /* Set the background to black */
  color: white;
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
  background: rgba(255, 255, 255, 0.2);
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

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={handleBack}><KeyboardArrowLeftSharpIcon /></BackButton>
        <Title>Preview</Title>
        <div style={{ width: '24px' }} /> {/* Placeholder to balance the header */}
      </Header>
      <Content>
        <MobileFrame>
          <PreviewContent>
            <MobileNotch/>
            <PhoneNumber>+251 923244566</PhoneNumber>
            <FlashMessageContainer>
              <FlashMessageTitle>Flash Message</FlashMessageTitle>
              <FlashMessageContent>
                Henry, Sales Manager, Set your status message
              </FlashMessageContent>
            </FlashMessageContainer>
          </PreviewContent>
        </MobileFrame>
      </Content>
    </Container>
  );
};

export default Preview;
