import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/home/Home';
import PlanSelection from './components/planSelection/PlanSelection';
import OtpEntry from './components/otpEntry/OtpEntry';
import Dashboard from './components/dashboard/Dashboard';
import Profile from './components/profile/Profile';
import FilterKeywords from './components/filterKeywords/FilterKeywords';
import EditSignature from './components/editSignature/EditSignature';
import PrivacyPolicy from './components/privacyPolicy/PrivacyPolicy'
import TermsNconditions from './components/termsNconditions/TermsNconditions';
import Preview from './components/preview/Preview';
import FAQ from './components/faq/FAQ';
import PhoneNumberEntry from './components/phoneEntry/PhoneEntry';

const App: React.FC = () => {
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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;