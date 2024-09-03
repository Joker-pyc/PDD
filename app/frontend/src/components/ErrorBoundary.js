import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { AlertOctagon, RefreshCw } from 'lucide-react';
import { theme } from "../styles/theme";

const ErrorContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
  background-color: ${props => props.theme.colors.glass};
  backdrop-filter: blur(10px);
`;

const ErrorTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.danger};
`;

const ErrorText = styled.p`
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.lg};
  color: ${props => props.theme.colors.textSecondary};
  max-width: 600px;
`;

const RefreshButton = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-weight: bold;
  cursor: pointer;
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  handleRefresh = () => {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <AlertOctagon size={80} color={theme.colors.danger} style={{ marginBottom: '2rem' }} />
          <ErrorTitle>Oops! Something went wrong.</ErrorTitle>
          <ErrorText>
            We're sorry for the inconvenience. Our team has been notified and is working on fixing the issue.
          </ErrorText>
          <RefreshButton onClick={this.handleRefresh}>
            <RefreshCw size={20} />
            Refresh Page
          </RefreshButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
