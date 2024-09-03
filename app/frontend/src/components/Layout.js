import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Footer from './Footer';
import Chatbot from './Chatbot';

const Main = styled.main`
  min-height: calc(100vh - 120px);
  padding: ${props => props.theme.spacing.xl} 0;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};
`;

const Layout = ({ children }) => (
  <>
    <Navbar />
    <Main>{children}</Main>
    <Chatbot />
    <Footer />
  </>
);

export default Layout;
