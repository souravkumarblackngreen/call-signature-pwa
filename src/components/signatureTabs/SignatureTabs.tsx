import React from 'react';
import styled from 'styled-components';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setActiveTab } from '../../redux/slices/SignatureTabsSlice';

const TabsContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Tab = styled.div<{ active: boolean }>`
  background: ${(props) => (props.active ? '#0032DF' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#0032DF')};
  border: 1px solid ${(props) => (props.active ? '#1E90FF' : '#ccc')};
  border-radius: 8px;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
`;

const InfoContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
gap: 5px;
font-size: 0.8rem;
margin:15px;
color:grey;
`;


const SignatrueTabs: React.FC = () => {
    // const [activeTab, setActiveTab] = useState('Signature');
    const { activeTab } = useSelector((state: RootState) => state.signatureTabs);
    const dispatch = useDispatch();
    return (
        <div className='hello'>
                    <TabsContainer>
                        <Tab active={activeTab === 'Signature'} onClick={() => dispatch(setActiveTab('Signature'))}>
                            Signature
                        </Tab>
                        <Tab active={activeTab === 'Status'} onClick={() => dispatch(setActiveTab('Status'))}>
                            Status
                        </Tab>

                    </TabsContainer>
                    <InfoContainer>
                        <InfoOutlinedIcon sx={{ 'fontSize': '1rem' }} />
                        <span>The Requested verification is in process.</span>
                    </InfoContainer>

                </div>
    );
};

export default SignatrueTabs;
