import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { sendChatMessage } from '../api';
import GlassContainer from '../components/GlassContainer';
import Chatbot from '../components/Chatbot';
import { Check, AlertTriangle, Info, ShoppingBag, ChevronDown, ChevronUp } from 'lucide-react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const SubmitContainer = styled(motion.div)`
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

const ImagePreview = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  margin-bottom: 1rem;
  box-shadow: ${props => props.theme.boxShadow.medium};
`;

const ResultItem = styled.div`
  margin-bottom: 1rem;
  padding: ${props => props.theme.spacing.md};
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${props => props.theme.borderRadius.medium};
  box-shadow: ${props => props.theme.boxShadow.small};

  h3 {
    color: ${props => props.theme.colors.secondary};
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5rem;
    }
  }
`;

const BuyButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: ${props => props.theme.spacing.sm};

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const AIInsightsCard = styled(GlassContainer)`
  margin-bottom: 2rem;
  padding: ${props => props.theme.spacing.lg};
  background-color: rgba(255, 255, 255, 0.15);
`;

const ExpandableSection = styled.div`
  margin-top: 1rem;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  font-weight: bold;
`;

const ExpandableContent = styled(motion.div)`
  padding-top: 1rem;
`;

const SeverityScale = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const SeverityIndicator = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${props => props.active ? props.color : 'gray'};
`;

const Submit = ({ result, uploadedImage }) => {
  const [chatbotMessage, setChatbotMessage] = useState('');
  const [diseaseContext, setDiseaseContext] = useState('');
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    if (result) {
      setDiseaseContext(result.title);
      const message = `The uploaded plant image has been analyzed. The detected disease is ${result.title}. ${result.description}`;
      sendChatMessage(message).then(response => {
        setChatbotMessage(response);
      });
    }
  }, [result]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderSeverityScale = (severity) => {
    const levels = ['Low', 'Medium', 'High'];
    const colors = ['green', 'yellow', 'red'];
    return (
      <SeverityScale>
        {levels.map((level, index) => (
          <SeverityIndicator
            key={level}
            color={colors[index]}
            active={index <= severity}
          />
        ))}
      </SeverityScale>
    );
  };

  return (
    <SubmitContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Analysis Results</Title>
      {uploadedImage && (
        <ImagePreview src={URL.createObjectURL(uploadedImage)} alt="Uploaded plant" />
      )}
      {result && (
        <Tabs>
          <TabList>
            <Tab>Disease Details</Tab>
            <Tab>Prevention</Tab>
            <Tab>Treatment</Tab>
          </TabList>

          <TabPanel>
            <ResultItem>
              <h3><Info size={20} /> Detected Disease:</h3>
              <p>{result.title}</p>
              {renderSeverityScale(1)} {/* Example severity */}
            </ResultItem>
            <ResultItem>
              <h3><AlertTriangle size={20} /> Description:</h3>
              <p>{result.description}</p>
              <ExpandableSection>
                <ExpandButton onClick={() => toggleSection('moreInfo')}>
                  {expandedSections.moreInfo ? <ChevronUp /> : <ChevronDown />}
                  {expandedSections.moreInfo ? 'Less Info' : 'More Info'}
                </ExpandButton>
                {expandedSections.moreInfo && (
                  <ExpandableContent
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <p>Additional information about the disease...</p>
                  </ExpandableContent>
                )}
              </ExpandableSection>
            </ResultItem>
          </TabPanel>

          <TabPanel>
            <ResultItem>
              <h3><Check size={20} /> Prevention Steps:</h3>
              <p>{result.prevent}</p>
            </ResultItem>
          </TabPanel>

          <TabPanel>
            <ResultItem>
              <h3><Info size={20} /> Recommended Supplement:</h3>
              <p>{result.supplement_name}</p>
              <BuyButton href={result.supplement_buy_link} target="_blank" rel="noopener noreferrer">
                <ShoppingBag size={16} />
                Buy Now
              </BuyButton>
            </ResultItem>
          </TabPanel>
        </Tabs>
      )}
      {chatbotMessage && (
        <AIInsightsCard>
          <h3>AI Assistant Insights:</h3>
          <p>{chatbotMessage}</p>
        </AIInsightsCard>
      )}
      <Chatbot diseaseContext={diseaseContext} />
    </SubmitContainer>
  );
};

export default Submit;
