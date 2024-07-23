import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

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

const HeaderContainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
`



const TermsNconditions: React.FC = () => {
    const navigate = useNavigate();
    const { termsncondition} = useSelector((state: RootState) => state.terms);
    
    const configText = useSelector((state: RootState) => state.configText);

    const handleBack = () => {
        navigate(-1);
    };

    
    return (
        <Container>
            <HeaderContainer>
                <BackButton onClick={handleBack}><KeyboardArrowLeftSharpIcon /></BackButton>
                <Header>
                    <Title>{configText.config.termsNconditions}</Title>
                </Header>
            </HeaderContainer>

            <ContentCard>
                <p>{termsncondition}</p>
            </ContentCard>
        </Container>
    );
};

export default TermsNconditions;
