import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './views/home/Home';
import PlanSelection from './views/planSelection/PlanSelection';
import OtpEntry from './views/otpEntry/OtpEntry';
import Dashboard from './views/dashboard/Dashboard';
import Profile from './views/profile/Profile';

import EditSignature from './views/editSignature/EditSignature';
import PrivacyPolicy from './views/privacyPolicy/PrivacyPolicy'
import TermsNconditions from './views/termsNconditions/TermsNconditions';
import Preview from './views/preview/Preview';
import FAQ from './views/faq/FAQ';
import PhoneNumberEntry from './views/phoneNumberEntry/PhoneNumberEntry';
import FilterKeywords from './views/filterKeywords/FilterKeywords';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setBaseUrl } from './redux/slices/MediaContent';

import { CircularProgress, Box } from '@mui/material';

const App: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.user);
  const { baseUrl } = useSelector((state: RootState) => state.mediaContent);
  const dispatch = useDispatch();
  useEffect(()=>{ 
    getConfig()
  },[])

  
  const getConfig=async()=>{
    const response = await fetch('/cs-build/config.json');
    const config = await response.json();
    dispatch(setBaseUrl(config.apiUrl))
   
    
  }

  if (!baseUrl) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan-selection" element={<PlanSelection />} />
        <Route path="/enter-phoneno" element={<PhoneNumberEntry/>} />
        <Route path="/enter-otp" element={<OtpEntry />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/filter-keywords" element={<FilterKeywords />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/termsNconditions" element={<TermsNconditions />} />
        <Route path="/edit-signature" element={<EditSignature />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;