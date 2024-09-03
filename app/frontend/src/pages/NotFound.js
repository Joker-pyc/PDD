// pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: ${props => props.theme.spacing.xl};
`;

const NotFoundTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const NotFoundText = styled.p`
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const HomeLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const NotFound = () => (
  <NotFoundContainer>
    <NotFoundTitle>404</NotFoundTitle>
    <NotFoundText>Oops! The page you're looking for doesn't exist.</NotFoundText>
    <HomeLink to="/">Go back to homepage</HomeLink>
  </NotFoundContainer>
);

export default NotFound;