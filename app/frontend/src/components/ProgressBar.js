import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius.small};
  margin: 1rem 0;
  overflow: hidden;
`;

const ProgressFill = styled(motion.div)`
  height: 100%;
  background-color: ${props => props.theme.colors.secondary};
  border-radius: ${props => props.theme.borderRadius.small};
`;

const ProgressBar = ({ progress }) => {
  return (
    <ProgressBarContainer>
      <ProgressFill
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
