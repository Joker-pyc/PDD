import styled from 'styled-components';

const GlassContainer = styled.div`
  background: ${props => props.theme.glass.background};
  backdrop-filter: ${props => props.theme.glass.backdropFilter};
  -webkit-backdrop-filter: ${props => props.theme.glass.backdropFilter};
  border-radius: ${props => props.theme.glass.borderRadius};
  border: ${props => props.theme.glass.border};
  box-shadow: ${props => props.theme.glass.boxShadow};
  padding: ${props => props.theme.spacing.lg};
  transition: all ${props => props.theme.transitions.medium};

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.boxShadow.large};
  }
`;

export default GlassContainer;
