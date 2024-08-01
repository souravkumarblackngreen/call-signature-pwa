import React from 'react';
import styled, { keyframes } from 'styled-components';
import { PiSmileySad } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

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
  text-align: center;
  width: 100%;
  max-width: 400px;
  color: white;
  position: relative;
  padding: 20px;
  height: auto;
  animation: ${fadeIn} 0.3s ease-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    border-radius: 16px 16px 0 0;
    max-width: 100%;
    padding: 15px;
  }

  @media (max-width: 375px) {
    padding: 10px;
  }
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

  @media (max-width: 600px) {
    font-size: 18px;
  }

  @media (max-width: 375px) {
    font-size: 16px;
  }
`;

const Title = styled.h2`
  margin-top: 20px;
  font-size: 1.5rem;

  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-top: 15px;
  }

  @media (max-width: 375px) {
    font-size: 1.3rem;
  }
`;

const Message = styled.p`
  font-size: 1.2rem;
  margin: 10px 0;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 1.1rem;
  }

  @media (max-width: 375px) {
    font-size: 1rem;
  }
`;

const SubMessage = styled.p`
  font-size: 1rem;
  margin: 10px 0;

  @media (max-width: 600px) {
    font-size: 0.9rem;
  }

  @media (max-width: 375px) {
    font-size: 0.8rem;
  }
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
  width: 90%;

  @media (max-width: 600px) {
    padding: 8px 16px;
    font-size: 0.9rem;
  }

  @media (max-width: 375px) {
    padding: 6px 12px;
    font-size: 0.8rem;
  }
`;

const IconContainer = styled.div`
  margin: 20px 0;

  .modal-icon {
    width: 48px;
    height: 48px;

    @media (max-width: 600px) {
      width: 40px;
      height: 40px;
    }

    @media (max-width: 375px) {
      width: 32px;
      height: 32px;
    }
  }
`;

interface ModalProps {
  show: boolean;
  onClose: () => void;
  message?: string;
  subMessage?: string;
  type?: string;
  modalTitle?: string;
  buttonLabel?: string;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, message, subMessage, type, modalTitle, buttonLabel = 'Close' }) => {
  const configText = useSelector((state: RootState) => state.configText);

  if (!show) {
    return null;
  }

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>✕</CloseButton>
        <IconContainer>
          {type === 'error' ? <PiSmileySad className="modal-icon" /> : <FaCheck className="modal-icon" />}
        </IconContainer>
        <Title>{type === 'error' ? configText.config.oops : (modalTitle || configText.config.successful)}</Title>
        <Message>{message}</Message>
        <SubMessage>{subMessage}</SubMessage>
        <StyledCloseButton onClick={onClose}>{buttonLabel}</StyledCloseButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default Modal;
