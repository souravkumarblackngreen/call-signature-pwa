import React, { useEffect } from 'react';
import styled from 'styled-components';
import { MenuItem, Select, FormControl } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { setLanguage } from '../../redux/slices/LanguageSlice';
import axios from 'axios';
import { API_END_POINT } from '../../services/Constant';
import { setConfigText } from '../../redux/slices/GloabalTextDataSlice';
import {getData} from '../../services/Services'

const DropdownContainer = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 8px;
  color: white;
`;

const LanguageDropdown: React.FC = () => {
  
  const { lang,languages } = useSelector((state: RootState) => state.lang);
  const dispatch = useDispatch();
 

  const handleChange = (event:any) => {
    dispatch(setLanguage(event.target.value));
  };

  
  useEffect(() => {
    handleLanguageChangeData();
  }, [lang]);

  const handleLanguageChangeData = async () => {
    try {
      const response = await axios.get(
        `${API_END_POINT.baseUrl+API_END_POINT.getAllData}/${lang}`
      );
      
      if (response.data.statuscode == 200) {
        dispatch(setConfigText(response.data.response));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DropdownContainer>
      <TranslateIcon style={{ color: 'white', marginRight: '8px' }} />
      <FormControl variant="outlined" size="small">
        <Select
          value={lang}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          style={{
            color: 'white',
            border: 'none',
            paddingRight: '24px',
          }}
          MenuProps={{
            PaperProps: {
              style: {
                backgroundColor: '#0032DF',
                color: 'white',
              },
            },
          }}
        >
          {languages.map((lang) => (
            <MenuItem key={lang.languageCode} value={lang.languageCode}>
              {lang.languageName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </DropdownContainer>
  );
};

export default LanguageDropdown;
