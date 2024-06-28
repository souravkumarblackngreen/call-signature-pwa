import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import background from '../../assets/SplashScreenBg.png' // Replace with your background image path

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  height: 100vh;
  background:#451322;
  gap:30px;
  color: white;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
`;



const Logo = styled.img`
  margin-top: 50px;
  width: 150px;
`;

const Title = styled.h1`
  margin-top: 20px;
  font-size: 2rem;
  
`;

const NextButton = styled.button`
  margin-bottom: 16%;
  padding: 18px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 50%;
  background-color: #0032E3;
  border:1px dotted;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;



const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/plan-selection');
  };

  return (
    <Container>
      <Logo src={logo} alt="Call Signature" />
      <Title>Call Signature</Title>
      <NextButton onClick={handleNext}>
      <ArrowForwardSharpIcon fontSize='large'/>
      </NextButton>
    </Container>
  );
};

export default Home;
