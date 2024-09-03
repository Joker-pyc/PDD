import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Loader } from 'lucide-react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
`;

const StyledLoader = styled(Loader)`
  animation: ${spin} 1s linear infinite;
  color: ${props => props.theme.colors.secondary};
`;

const LoadingSpinner = () => (
  <SpinnerContainer>
    <StyledLoader size={40} />
  </SpinnerContainer>
);

export default LoadingSpinner;
