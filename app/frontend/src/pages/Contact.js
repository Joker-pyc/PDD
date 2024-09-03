import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';
import GlassContainer from '../components/GlassContainer';

const ContactContainer = styled(motion.div)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
`;

const ContactCard = styled(motion(GlassContainer))`
  padding: 2rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;

  svg {
    margin-right: 1rem;
    color: ${props => props.theme.colors.secondary};
  }
`;

const Contact = () => {
  return (
    <ContactContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Contact Us</Title>
      <ContactCard whileHover={{ scale: 1.02 }}>
        <h2>Manthan Bhikadiya</h2>
        <ContactInfo>
          <Mail size={20} />
          <p>bhikadiyamanthan@gmail.com</p>
        </ContactInfo>
        <ContactInfo>
          <Linkedin size={20} />
          <a href="https://www.linkedin.com/in/manthanbhikadiya" target="_blank" rel="noopener noreferrer">manthanbhikadiya</a>
        </ContactInfo>
        <ContactInfo>
          <Github size={20} />
          <a href="https://github.com/manthanbhikadiya" target="_blank" rel="noopener noreferrer">manthanbhikadiya</a>
        </ContactInfo>
      </ContactCard>
      <ContactCard whileHover={{ scale: 1.02 }}>
        <h2>Krishna Baldaniya</h2>
        <ContactInfo>
          <Mail size={20} />
          <p>krishna.baldaniya93@gmail.com</p>
        </ContactInfo>
        <ContactInfo>
          <Linkedin size={20} />
          <a href="https://www.linkedin.com/in/krishna-baldaniya-5547381a1/" target="_blank" rel="noopener noreferrer">krishna-baldaniya</a>
        </ContactInfo>
        <ContactInfo>
          <Github size={20} />
          <a href="https://github.com/krishnabaldaniya" target="_blank" rel="noopener noreferrer">krishnabaldaniya</a>
        </ContactInfo>
      </ContactCard>
    </ContactContainer>
  );
};

export default Contact;
