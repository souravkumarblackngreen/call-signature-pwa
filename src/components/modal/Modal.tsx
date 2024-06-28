import React from 'react';
import styled, { keyframes } from 'styled-components';
import { PiSmileySad } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end; /* Align to the bottom */
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: linear-gradient(210deg, #0000FF 0%, #451322 100%);
  border-radius: 16px 16px 0 0;
  padding: 20px;
  text-align: center;
  width: 100%;
  max-width: 400px;
  color: white;
  position: relative;
  height:40%;
  animation: ${fadeIn} 0.3s ease-out;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  color: white;
  cursor: pointer;
`;

const Title = styled.h2`
  margin-top: 40px;
  font-size: 1.5rem;
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
  font-weight:600;
`;
const SubMessage = styled.p`
  font-size: 1rem;
  margin: 10px 0;
`;

const StyledCloseButton = styled.button`
  background: white;
  color: #0032df;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  width:24rem;
`;

const IconContainer = styled.div`
  margin: 20px 0;
`;

interface ModalProps {
  show: boolean;
  onClose: () => void;
  message?: string;
  subMessage?:string;
  type?:string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, message , subMessage, type }) => {
  if (!show) {
    return null;
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <IconContainer>
          {type == 'error'? <PiSmileySad style={{'width':'48px','height':'48px'}}/> :<FaCheck style={{'width':'48px','height':'48px'}} /> }
        </IconContainer>
        <Title>{type == 'error' ? "Oops!" :"Successfully Subscribe"}</Title>
        <Message>{message||'Seems like there was a problem with your request.'}</Message>
        <SubMessage>{subMessage || 'Please try again later.'}</SubMessage>
        <StyledCloseButton onClick={onClose}>Close</StyledCloseButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
