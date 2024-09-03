import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Upload, ArrowRight, AlertTriangle, Check, Info, ShoppingBag, Camera } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { submitImage } from '../api';
import GlassContainer from '../components/GlassContainer';
import Chatbot from '../components/Chatbot';
import ProgressBar from '../components/ProgressBar';

const AIEngineContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: 3rem;
  font-size: 3rem;
  font-weight: bold;
`;

const DropzoneContainer = styled(GlassContainer)`
  padding: 3rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.boxShadow.large};
  }
`;

const DropzoneIcon = styled(Upload)`
  width: 64px;
  height: 64px;
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const DropzoneText = styled.p`
  font-size: 1.2rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 400px;
  margin-top: 2rem;
  border-radius: 10px;
  box-shadow: ${props => props.theme.boxShadow.medium};
`;

const SubmitButton = styled(motion.button)`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.2rem;
  margin: 2rem auto;

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: translateY(-2px);
  }
`;

const ResultContainer = styled(motion.div)`
  margin-top: 3rem;
`;

const ResultItem = styled(GlassContainer)`
  margin-bottom: 1.5rem;
  padding: ${props => props.theme.spacing.lg};

  h3 {
    color: ${props => props.theme.colors.primary};
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    font-size: 1.4rem;

    svg {
      margin-right: 1rem;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
`;

const BuyButton = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-top: ${props => props.theme.spacing.md};
  font-weight: 600;

  &:hover {
    background-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
  }

  svg {
    margin-right: 0.8rem;
  }
`;

const AIEngine = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [diseaseContext, setDiseaseContext] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleSubmit = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      
      try {
        const response = await submitImage(formData, (progress) => {
          setUploadProgress(progress);
        });
        setResult(response);
        setDiseaseContext(response.title);
      } catch (error) {
        console.error('Error submitting image:', error);
      } finally {
        setUploadProgress(0);
      }
    }
  };

  return (
    <AIEngineContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>AI Plant Disease Detection</Title>
      <DropzoneContainer {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <>
            <DropzoneIcon />
            <DropzoneText>Drop the image here ...</DropzoneText>
          </>
        ) : (
          <>
            <DropzoneIcon />
            <DropzoneText>Drag 'n' drop an image here, or click to select a file</DropzoneText>
          </>
        )}
        {selectedFile && (
          <ImagePreview src={URL.createObjectURL(selectedFile)} alt="Selected plant" />
        )}
      </DropzoneContainer>
      <SubmitButton
        onClick={handleSubmit}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Analyze
        <ArrowRight size={24} style={{ marginLeft: '1rem' }} />
      </SubmitButton>
      {uploadProgress > 0 && <ProgressBar progress={uploadProgress} />}
      {result && (
        <ResultContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ResultItem>
            <h3><Info size={24} /> Detected Disease</h3>
            <p>{result.title}</p>
          </ResultItem>
          <ResultItem>
            <h3><AlertTriangle size={24} /> Description</h3>
            <p>{result.description}</p>
          </ResultItem>
          <ResultItem>
            <h3><Check size={24} /> Prevention Steps</h3>
            <p>{result.prevent}</p>
          </ResultItem>
          <ResultItem>
            <h3><ShoppingBag size={24} /> Recommended Supplement</h3>
            <p>{result.supplement_name}</p>
            <BuyButton href={result.supplement_buy_link} target="_blank" rel="noopener noreferrer">
              <ShoppingBag size={20} />
              Buy Now
            </BuyButton>
          </ResultItem>
        </ResultContainer>
      )}
      <Chatbot
        diseaseContext={diseaseContext}
        initialMessage={result ? `The detected disease is ${result.title}. ${result.description}` : ''}
      />
    </AIEngineContainer>
  );
};

export default AIEngine;
