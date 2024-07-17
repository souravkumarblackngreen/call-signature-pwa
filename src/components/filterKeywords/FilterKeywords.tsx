import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { setKeywords } from '../../redux/slices/FilterSlice';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import KeyboardArrowLeftSharpIcon from '@mui/icons-material/KeyboardArrowLeftSharp';
import axios, { AxiosResponse } from 'axios';

import Loader from '../loader/Loader';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
  background: #f5f5f5;
  color: #000;
  padding: 20px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
`;

const BackButton = styled.div`
  font-size: 24px;
  cursor: pointer;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 10px 0;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #888;
  margin-bottom: 20px;
`;

const KeywordsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
  max-height: 200px; /* Set a maximum height */
  overflow-y: auto; 
`;

const KeywordChip = styled.div`
  background: white;
  border: 1px solid #1E90FF;
  border-radius: 20px;
  padding: 6px 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: #1E90FF;
  font-size: 1rem;
  cursor: pointer;
`;

const RemoveButton = styled.span`
  background: #1E90FF;
  color: white;
  border-radius: 50%;
  padding: 5px;
  cursor: pointer;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #1E90FF;
  border-radius: 25px;
  background-color: transparent;
  color: #1E90FF;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #1E90FF;
  border-radius: 25px;
  margin-bottom: 20px;
  width: 80%;
  max-width: 300px;
`;

const TitleHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background:#ffff;
`;


const FilterKeywords: React.FC = () => {

  const { keywords } = useSelector((state: RootState) => state.filter);
  const [newKeyword, setNewKeyword] = useState<string>('');
  const { token, userId } = useSelector((state: RootState) => state.user);
  const configText = useSelector((state: RootState) => state.configText);
  const baseUrl = "http://172.16.11.222:5442/crbtSignature/v1";

  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getFilterWord = "/filter/get-filter-words";
  

  useEffect(() => {
      getfilterWords();
  }, []);


  const getfilterWords = async () => {
    setLoader(true);
    try {
      // const response = await getData(API_END_POINT.getFilterWord, token);
      const response: AxiosResponse<any> = await axios.get(baseUrl+getFilterWord,{
        headers: {
          Authorization:  `Bearer ${token}`,
          
          langCode: 'en',
      },
      })
      
    
      setLoader(false);
      
    } catch (err: any) {
      setLoader(false);
      
      
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  const addKeyword = () => {
    if (newKeyword.trim() !== '' && !keywords.includes(newKeyword.trim())) {
      dispatch(setKeywords([...keywords, newKeyword.trim()]));
      setNewKeyword('');
    }
  };

  const removeKeyword = (keyword: string) => {
    dispatch(setKeywords(keywords.filter(k => k !== keyword)));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addKeyword();
    }
  };


  return (
    <Container>
      {loader && <Loader/>}
      <Header>
        <BackButton onClick={handleBack}><KeyboardArrowLeftSharpIcon /></BackButton>
        <Title>{configText.config.filterKeywords}</Title>

      </Header>
      <Subtitle>{configText.config.customizeYourFilterInfo}</Subtitle>
      <KeywordsContainer>
        {keywords.map((keyword, index) => (
          <KeywordChip key={index}>
            {keyword}
            <RemoveButton onClick={() => removeKeyword(keyword)}>×</RemoveButton>
          </KeywordChip>
        ))}
      </KeywordsContainer>
      <Input
        type="text"
        value={newKeyword}
        onChange={(e) => setNewKeyword(e.target.value)}
        placeholder={configText.config.addNewKeywords}
        onKeyDown={handleKeyDown}
      />
      <AddButton onClick={addKeyword}>{configText.config.addText}</AddButton>

    </Container>
  );
};

export default FilterKeywords;
