import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import { API_END_POINT } from "../../services/Constant";
import background from '../../assets/images/SplashScreenBg.png' // Replace with your background image path
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

import {  setIsHeaderEnrichment, setMediaContent, setPhoneNumber, setRegax } from '../../redux/slices/UserTypeSlice'

import {getData} from '../../services/Services'
import { startLoading, stopLoading } from '../../redux/slices/LoaderSlice';
import Loader from '../../components/loader/Loader';
import axios from 'axios';
import '../../assets/css/variables.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  text-align: center;
  height: 100vh;
  background:var(--homeBackgroundColor);
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
  background-color: var(--button-background-color-primary);
  border:1px dotted;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;



const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [redirectData,setRedirectData] = useState()
  const { mediaContent, isHeaderEnrichment, phoneNumber } = useSelector((state: RootState) => state.user);
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
 
  

  useEffect(() => {  
    getMediaContent()
    getRegex()
    helogin()
  }, []);

  
  const getMediaContent = async()=>{
      dispatch(startLoading())
      const response = await getData(API_END_POINT.mediaContent)
      dispatch(setMediaContent(response))
      dispatch(stopLoading())
    
    
  }

  const getRegex = async()=>{
    dispatch(startLoading())
    const response = await getData(API_END_POINT.regexUrl)
    dispatch(setRegax(response))
   
  }

  const decryptParam = (encryptedParam: string) => {
  const key = CryptoJS.enc.Utf8.parse('p@4DnhsE1jF-t(GN06k}eL9B7Z8h&Ay*');
  const decrypted = CryptoJS.AES.decrypt(encryptedParam, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
  };
 
  const helogin = async() =>
    {
      dispatch(startLoading());
      try {
       
        const response = await axios.get("http://172.16.11.222:8099/header-augment-0.0.1-SNAPSHOT/v1/mobile/get-he-number",{
          headers:{
            'Service-Name':'callSignatureMobileView'
          }
        });
        const urlParams = new URLSearchParams(response.request.responseURL.split('?')[1]);
        const encryptedParam = urlParams.get('param');
        if (encryptedParam) {
          const decryptedParam = decryptParam(encryptedParam);
          console.log('Decrypted Parameter:', decryptedParam);
          dispatch(setIsHeaderEnrichment(true))
          dispatch(setPhoneNumber(decryptedParam))
        }else{
          dispatch(setIsHeaderEnrichment(false))
        }
        
      
  
        if (response.status === 302) {
          const redirectUrl = response.headers.location;
          if (redirectUrl) {
            const redirectedResponse = await axios.get(redirectUrl);
            setRedirectData(redirectedResponse.data)
            
          }
        } else {
          dispatch(setIsHeaderEnrichment(false))
          
        }
      } catch (error) {
        dispatch(setIsHeaderEnrichment(false))
        console.log('Error fetching media content:', error);
      }
      dispatch(stopLoading());
    };
  
  const handleNext = () => {
    navigate('/plan-selection');
  };


  
  return (
    <Container>
      {isLoading && <Loader/>}
      {<Logo src={mediaContent.logo} alt="Call Signature" />}
      <Title>Call Signature</Title>
      <NextButton onClick={handleNext}>
      <ArrowForwardSharpIcon fontSize='large'/>
      </NextButton>
    </Container>
  );
};

export default Home;
