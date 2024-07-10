import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import logo from '../../assets/logo.png'
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import { API_END_POINT } from "../../services/Constant";
import background from '../../assets/SplashScreenBg.png' // Replace with your background image path
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

import axios, { AxiosResponse } from 'axios';
import { setUserType, setToken, setUserId,setRefreshToken, setMediaContent } from '../../redux/slices/UserTypeSlice'

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
  const dispatch = useDispatch();
  const { isHeaderEnrichment, mediaContent } = useSelector((state: RootState) => state.user);
  const hemsisdn = 1234567899;
  

  useEffect(() => {  
    fetchData()  
    heLogin()
    getMediaContent()
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8095/');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Inspect request headers
      console.log('Request Headers:', {
        'Request URL': response.url,
        'Request Method': 'GET', // assuming GET request as per your example
        
      });

      // Inspect response headers
     
      response.headers.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };


  const getMediaContent = async()=>{
    try{
      const response = await axios.get(API_END_POINT.mediaContent)
    
    dispatch(setMediaContent(response.data.response))
    }catch(err){
      
    }
    
  }
  const heLogin = async () => {
    try {
      const response: AxiosResponse<any> = await axios.get(API_END_POINT.baseUrl+API_END_POINT.heLoginApi,{
        headers: {
          'http-x-msisdn': hemsisdn,
          'langCode': 'en'
          
          // Assuming the content type is JSON
        },
      })

      const {userType,token,userId,refreshToken} = response.data.response
      dispatch(setToken(token))
      dispatch(setUserId(userId))
      dispatch(setRefreshToken(refreshToken))
      dispatch(setUserType(userType))

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };
  const handleNext = () => {
    navigate('/plan-selection');
  };

  console.log(mediaContent)
  return (
    <Container>
      {<Logo src={mediaContent.logo} alt="Call Signature" />}
      <Title>Call Signature</Title>
      <NextButton onClick={handleNext}>
      <ArrowForwardSharpIcon fontSize='large'/>
      </NextButton>
    </Container>
  );
};

export default Home;
