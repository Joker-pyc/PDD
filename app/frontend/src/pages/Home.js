import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Upload, ShoppingBag } from 'lucide-react';

const HomeContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: 2rem;
  font-size: ${props => props.theme.fontSizes.xxlarge};
`;

const Description = styled.p`
  text-align: center;
  font-size: ${props => props.theme.fontSizes.large};
  margin-bottom: 2rem;
`;

const Button = styled(Link)`
  display: inline-block;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  padding: 0.8rem 1.5rem;
  text-decoration: none;
  border-radius: ${props => props.theme.borderRadius.medium};
  transition: all ${props => props.theme.transitions.medium};
  font-weight: 600;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.boxShadow.medium};
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
`;

const FeatureCard = styled.div`
  ${props => props.theme.glass}
  text-align: center;
  padding: 2rem;
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.secondary};
`;

const Home = () => {
  return (
    <HomeContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Welcome to Plant Disease Detection</Title>
      <Description>
        Harness the power of AI to identify and manage plant diseases effectively
      </Description>
      <Button to="/ai-engine">Launch AI Engine</Button>
      <FeatureGrid>
        <FeatureCard>
          <FeatureIcon><Upload /></FeatureIcon>
          <h3>Upload</h3>
          <p>Easily upload images of your plants for analysis</p>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon><Leaf /></FeatureIcon>
          <h3>Diagnose</h3>
          <p>Get accurate disease diagnoses for your plants</p>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon><ShoppingBag /></FeatureIcon>
          <h3>Shop</h3>
          <p>Find recommended products for plant care</p>
        </FeatureCard>
      </FeatureGrid>
    </HomeContainer>
  );
};

export default Home;