import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=Montserrat:wght@400;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: ${props => props.theme.fonts.main};
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    font-size: ${props => props.theme.fontSizes.medium};
    min-height: 100vh;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${props => props.theme.fonts.heading};
    font-weight: 600;
    line-height: 1.3;
    margin-bottom: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.primary};
  }

  a {
    color: ${props => props.theme.colors.secondary};
    text-decoration: none;
    transition: color ${props => props.theme.transitions.fast};

    &:hover {
      color: ${props => props.theme.colors.primary};
    }
  }

  button {
    cursor: pointer;
    font-family: ${props => props.theme.fonts.main};
    font-size: ${props => props.theme.fontSizes.medium};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    border: none;
    border-radius: 50px;
    transition: all ${props => props.theme.transitions.medium};
    background-color: ${props => props.theme.colors.secondary};
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${props => props.theme.boxShadow.medium};
      background-color: ${props => props.theme.colors.primary};
    }

    &:active {
      transform: translateY(0);
    }
  }

  input, textarea {
    font-family: ${props => props.theme.fonts.main};
    font-size: ${props => props.theme.fontSizes.medium};
    padding: ${props => props.theme.spacing.sm};
    border: 1px solid ${props => props.theme.colors.textSecondary};
    border-radius: ${props => props.theme.borderRadius.medium};
    transition: border-color ${props => props.theme.transitions.fast};
    background-color: rgba(255, 255, 255, 0.1);
    color: ${props => props.theme.colors.text};

    &:focus {
      outline: none;
      border-color: ${props => props.theme.colors.secondary};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 ${props => props.theme.spacing.md};
  }

  .section {
    padding: ${props => props.theme.spacing.xxl} 0;
  }

  .glass {
    background: ${props => props.theme.glass.background};
    backdrop-filter: ${props => props.theme.glass.backdropFilter};
    -webkit-backdrop-filter: ${props => props.theme.glass.backdropFilter};
    border-radius: ${props => props.theme.glass.borderRadius};
    border: ${props => props.theme.glass.border};
    box-shadow: ${props => props.theme.glass.boxShadow};
  }

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    html {
      font-size: 14px;
    }
  }

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    html {
      font-size: 12px;
    }
  }
`;

export default GlobalStyles;
