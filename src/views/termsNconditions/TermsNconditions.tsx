import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import { RootState } from '../../redux/store';
import { useSelector } from 'react-redux';
import '../../assets/css/variables.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
  color: var(--text-color);
  gap:50px;

  
`;

const Header = styled.div`
  width: 88%;
  display: flex;
  justify-content: center;
  align-items: center;
  background:var(--header-background-color);
`;

const BackButton = styled.div`
  font-size: 24px;
  cursor: pointer;
  border: 1px solid var(--greyColor);
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
  background: var(--header-background-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 3px 36px #00000012;
  width: 80%;
  max-width: 400px;
  max-height: 900px; /* Set your desired maximum height here */
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
