import React from 'react';
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
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

const App: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.user);
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