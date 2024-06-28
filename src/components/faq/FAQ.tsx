import React, { useState } from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MenuIcon from '@mui/icons-material/Menu';
import logo from '../../assets/logo.png';
import Sidebar from '../sidemenu/Sidebar';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background: #ffffff;
  color: #000000;
  gap:100px;
`;

const Header = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  color: #000;
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

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Logo = styled.img`
  width: 32px;
  height: 32px;
`;

const Title = styled.div`
  font-size: 1.3rem;
`;

const FAQContainer = styled.div`
  background: white;
  color:grey;
  border-radius: 8px;
  display:flex;
  flex-direction:column;
  gap:10px;
  
`;

const FAQItem = styled.div`
  margin: 10px 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e4e4e4;
`;

const FAQQuestion = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: white;
  color: black;
  cursor: pointer;
  font-weight: bold;
`;

const FAQAnswer = styled.div`
  padding: 20px;
  max-width: 22rem;
  background: white;
  color: grey;
  border-top: 1px solid #e4e4e4;
`;
const HeaderContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
`


const FAQ: React.FC = () => {

  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const faqs = [
    {
        question: 'What is Call Signature?',
        answer: 'Call Signature is a service that allows you to personalize your outgoing call screen with custom messages and business cards.',
      },
      {
        question: 'How can I subscribe to Call Signature?',
        answer: 'You can subscribe to Call Signature by selecting a plan and entering your phone number to receive an OTP for verification.',
      },
      {
        question: 'How do I set my signature message?',
        answer: 'You can set your signature message in the dashboard by editing the Flash Message section.',
      },
      {
        question: 'Can I change my subscription plan?',
        answer: 'Yes, you can change your subscription plan from the settings page in your account dashboard.',
      },
  
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <Container>
        <HeaderContainer>
                <BackButton onClick={handleBack}><KeyboardArrowLeftSharpIcon /></BackButton>
                <Header>
                    <Title> Frequently Asked Questions</Title>
                </Header>
            </HeaderContainer>
      
      <FAQContainer>
        {faqs.map((faq, index) => (
          <FAQItem key={index}>
            <FAQQuestion onClick={() => toggleFAQ(index)}>
              {faq.question}
              {openIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </FAQQuestion>
            {openIndex === index && <FAQAnswer>{faq.answer}</FAQAnswer>}
          </FAQItem>
        ))}
      </FAQContainer>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleToggleSidebar} />
    </Container>
  );
};

export default FAQ;
