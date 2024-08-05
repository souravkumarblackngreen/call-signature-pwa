import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';

import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import { API_END_POINT } from "../../services/Constant";
import background from '../../assets/images/SplashScreenBg.png' // Replace with your background image path
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

import {  setIsHeaderEnrichment, setPhoneNumber, setRegax } from '../../redux/slices/UserTypeSlice'

import {getData, logoutfunc} from '../../services/Services'
import { startLoading, stopLoading } from '../../redux/slices/LoaderSlice';
import Loader from '../../components/loader/Loader';
import axios from 'axios';
import '../../assets/css/variables.css';
import { setPrivacy, setTerms } from '../../redux/slices/PrivacyPolicySlice';
import { setConfigText } from '../../redux/slices/GloabalTextDataSlice';

import Modal from '../../components/modal/Modal';
import { setMediaContent } from '../../redux/slices/MediaContent';

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

  const { mediaContent } = useSelector((state: RootState) => state.mediaContent);
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const configText = useSelector((state: RootState) => state.configText);
  const { lang  } = useSelector((state: RootState) => state.lang);
  const [showModal,setShowModal] = useState(false);
  const [modalType ] = useState('error');
  const [modalTitle, setModalTitle] = useState('')
  const [modalMessage, setModalMessage] = useState('');
  const [modalSubMessage, setModalSubMessage] = useState('')

 

 
  
  useEffect(() => {
    handleLanguageChangeData();
  }, [lang]);

  const handleLanguageChangeData = async () => {
    dispatch(startLoading())
    try {
      const response = await getData(
        `${API_END_POINT.getAllData}/${lang}`
      );
      dispatch(setConfigText(response));
      dispatch(startLoading())
      
    } catch (error:any) {
      console.log(error);
      dispatch(startLoading())
      const message = error.response?.data?.message || 'An error occurred during subscription';
            setModalTitle('Opps');
            setModalMessage(message);
            setModalSubMessage(' ');
            setShowModal(true);
    }
    
  };
  useEffect(()=>{
    logoutfunc(navigate,dispatch)
  },[])

  useEffect(() => {
    
    getMediaContent()
    getRegex()
    helogin()
    getTermsNcondition()

  }, []);


  const getTermsNcondition = async () => {
    try{
      dispatch(startLoading())
    const response = await getData(API_END_POINT.privacyContent)
    const { privacyPolicy, tearmsAndCondition } = response
    dispatch(stopLoading())
    dispatch(setPrivacy(privacyPolicy))
    dispatch(setTerms(tearmsAndCondition))
    }
    catch (error:any) {
      console.log(error);
      dispatch(startLoading())
      const message = error.response?.data?.message || 'An error occurred during subscription';
            setModalTitle('Opps');
            setModalMessage(message);
            setModalSubMessage(' ');
            setShowModal(true);
    }
    

  }

  
  const getMediaContent = async()=>{

    try{
      dispatch(startLoading())
      const response = await getData(API_END_POINT.mediaContent)
      dispatch(setMediaContent(response))
      dispatch(stopLoading())
    } catch (error:any) {
      console.log(error);
      dispatch(startLoading())
      const message = error.response?.data?.message || 'An error occurred during subscription';
            setModalTitle('Opps');
            setModalMessage(message);
            setModalSubMessage(' ');
            setShowModal(true);
    }
    
    
  }

  const getRegex = async()=>{
    try{
      dispatch(startLoading())
    const response = await getData(API_END_POINT.regexUrl)
    dispatch(setRegax(response))
    }
    catch (error:any) {
      console.log(error);
      dispatch(startLoading())
      const message = error.response?.data?.message || 'An error occurred during subscription';
            setModalTitle('Opps');
            setModalMessage(message);
            setModalSubMessage(' ');
            setShowModal(true);
    }
    
   
  }

  const decryptParam = (encryptedParam: string) => {
    const cryptoJsKey = process.env.REACT_APP_CryptoJS_KEY as string;
    const key = CryptoJS.enc.Utf8.parse(cryptoJsKey);
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
        // cant use common getData method as baseURL is different
        const response = await axios.get(API_END_POINT.headerEnrichmentCheckAPI,{
          headers:{
            'Service-Name':'callSignatureMobileView'
          }
        });
        const urlParams = new URLSearchParams(response.request.responseURL.split('?')[1]);
        const encryptedParam = urlParams.get('param');
        if (encryptedParam) {
          const decryptedParam = decryptParam(encryptedParam);
        
          dispatch(setIsHeaderEnrichment(true))
          dispatch(setPhoneNumber(decryptedParam))
        }else{
          dispatch(setIsHeaderEnrichment(false))
        }
        
      } catch (error) {
        dispatch(setIsHeaderEnrichment(false))
        
      }
      dispatch(stopLoading());
    };
  
  const handleNext = () => {
    navigate('/plan-selection');
  };

  const closeModal = () => {
    setShowModal(false);
  };


  
  return (
    <Container>
      {isLoading && <Loader/>}
      <Modal modalTitle={modalTitle} show={showModal} onClose={closeModal} message={modalMessage} subMessage={modalSubMessage} type={modalType}/>
      {<Logo src={mediaContent.logo} alt="Call Signature" />}
      <Title>{configText.config.callSignature}</Title>
      <NextButton onClick={handleNext}>
      <ArrowForwardSharpIcon fontSize='large'/>
      </NextButton>
    </Container>
  );
};

export default Home;
