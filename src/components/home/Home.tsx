import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import { API_END_POINT } from "../../services/Constant";
import background from '../../assets/SplashScreenBg.png' // Replace with your background image path
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';

import axios, { AxiosResponse } from 'axios';
import { setUserType, setToken, setUserId,setRefreshToken, setMediaContent } from '../../redux/slices/UserTypeSlice'
import { startLoading, stopLoading } from '../../redux/slices/LoaderSlice';
import { getData } from '../../services/Services';
import { setConfigText } from '../../redux/slices/GloabalTextDataSlice';

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
  const { lang, languages } = useSelector((state: RootState) => state.lang);
  const hemsisdn = 1234567899;
  

  useEffect(() => {  
  
    // getMediaContent()
  }, []);

  useEffect(() => {
    // handleLanguageChangeData();
  }, [lang]);

  const handleLanguageChangeData = async () => {
    dispatch(startLoading())
    const response = await getData(`${API_END_POINT.getAllData}/${lang}`);
    dispatch(setConfigText(response));
    dispatch(stopLoading())
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('https://c66e267d-7b4d-4cd5-8a14-c55a65942a30.mock.pstmn.io/loginTesting',{
          header:{
            'msisdn':'232'
          }
        });
        console.log(response)

        // const mobileNum = getMobileNumber(response.headers);
        // console.log(mobileNum)
        // setMobileNumber(mobileNum);
      } catch (error) {
        console.error('Error fetching mobile number:', error);
        // setMobileNumber('Error fetching mobile number');
      }
    };

    fetchData();
  }, []);


  // const getMediaContent = async()=>{
  //   const response = await getData(API_END_POINT.mediaContent)
  //   dispatch(setMediaContent(response))
  // }

  const handleNext = () => {
    navigate('/plan-selection');
  };

  
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
