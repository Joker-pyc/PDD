import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Nav = styled(motion.nav)`
  background-color: ${props => props.theme.colors.glass};
  backdrop-filter: blur(10px);
  padding: ${props => props.theme.spacing.md} 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: ${props => props.theme.boxShadow.medium};
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  margin-left: ${props => props.theme.spacing.md};
  transition: color 0.3s ease;
  font-weight: 500;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${props => props.theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: block;
  }
`;

const NavLinks = styled(motion.div)`
  display: flex;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: ${props => (props.isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: ${props => props.theme.colors.glass};
    backdrop-filter: blur(10px);
    padding: ${props => props.theme.spacing.md};
    box-shadow: ${props => props.theme.boxShadow.medium};
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
    >
      <NavContainer>
        <NavLink to="/">Plant Disease Detection</NavLink>
        <MobileMenuButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </MobileMenuButton>
        <NavLinks
          isOpen={isOpen}
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3 }}
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/ai-engine">AI Engine</NavLink>
          <NavLink to="/market">Market</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
