import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

const FooterWrapper = styled(motion.footer)`
  background-color: ${props => props.theme.colors.glass};
  backdrop-filter: blur(10px);
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.xl} 0;
  text-align: center;
  z-index: -1;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FooterLogo = styled.h2`
  font-size: 1.5rem;
  margin-bottom: ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.primary};
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const FooterLink = styled.a`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  margin: 0 ${props => props.theme.spacing.sm};
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const FooterText = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Footer = () => (
  <FooterWrapper
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <FooterContent>
      <FooterLogo>Plant Disease Detection</FooterLogo>
      <FooterLinks>
        <FooterLink href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
          <Github />
        </FooterLink>
        <FooterLink href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
          <Linkedin />
        </FooterLink>
        <FooterLink href="mailto:your.email@example.com">
          <Mail />
        </FooterLink>
      </FooterLinks>
      <FooterText>
        &copy; {new Date().getFullYear()} Plant Disease Detection. All rights reserved.
      </FooterText>
    </FooterContent>
  </FooterWrapper>
);

export default Footer;
