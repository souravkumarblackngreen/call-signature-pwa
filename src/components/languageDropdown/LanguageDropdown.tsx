import React from 'react';
import styled from 'styled-components';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';

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
  const [language, setLanguage] = React.useState('English');

  const handleChange = (event:any) => {
    setLanguage(event.target.value);
  };

  return (
    <DropdownContainer>
      <TranslateIcon style={{ color: 'white', marginRight: '8px' }} />
      <FormControl variant="outlined" size="small">
        <Select
          value={language}
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
          <MenuItem value="English">English</MenuItem>
          <MenuItem value="Spanish">Hindi</MenuItem>
          <MenuItem value="French">Arabic</MenuItem>
          {/* Add more languages as needed */}
        </Select>
      </FormControl>
    </DropdownContainer>
  );
};

export default LanguageDropdown;
