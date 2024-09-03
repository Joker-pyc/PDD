import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Loader, Save, Maximize2, Minimize2 } from 'lucide-react';

const ChatbotContainer = styled(motion.div)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: ${props => props.isExpanded ? '80vw' : '350px'};
  height: ${props => props.isExpanded ? '80vh' : '500px'};
  background-color: ${props => props.theme.colors.glass};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.boxShadow.large};
  overflow: hidden;
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
`;

const ChatHeader = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const ChatMessages = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: ${props => props.theme.spacing.md};
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.1);
`;

const MessageBubble = styled(motion.div)`
  max-width: 80%;
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.medium};
  margin-bottom: ${props => props.theme.spacing.sm};
  align-self: ${props => props.sender === 'You' ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.sender === 'You' ? props.theme.colors.secondary : props.theme.colors.tertiary};
  color: ${props => props.theme.colors.text};
  box-shadow: ${props => props.theme.boxShadow.small};
`;

const ChatInputContainer = styled.div`
  display: flex;
  padding: ${props => props.theme.spacing.sm};
  background-color: rgba(255, 255, 255, 0.2);
`;

const ChatInput = styled.input`
  flex-grow: 1;
  padding: ${props => props.theme.spacing.sm};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  background-color: rgba(255, 255, 255, 0.3);
  color: ${props => props.theme.colors.text};

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.colors.secondary};
  }
`;

const ChatButton = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.sm};
  margin-left: ${props => props.theme.spacing.sm};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.tertiary};
  }
`;

const ChatToggle = styled(motion.button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  font-size: 24px;
  cursor: pointer;
  box-shadow: ${props => props.theme.boxShadow.medium};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.sm};
  color: ${props => props.theme.colors.textSecondary};
`;

const SuggestedQuestions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SuggestedQuestion = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  font-size: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.theme.colors.tertiary};
  }
`;

const Chatbot = ({ diseaseContext = '', initialMessage = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    if (isOpen && (diseaseContext || initialMessage)) {
      initializeChatbot(diseaseContext, initialMessage);
    }
  }, [isOpen, diseaseContext, initialMessage]);

  const addMessage = (sender, message) => {
    setMessages(prevMessages => [...prevMessages, { sender, message }]);
  };

  const updateLastAIMessage = (newContent) => {
    setMessages(prevMessages => {
      const lastAIMessageIndex = prevMessages.findLastIndex(msg => msg.sender === 'AI');
      if (lastAIMessageIndex === -1) return [...prevMessages, { sender: 'AI', message: newContent }];
      
      const updatedMessages = [...prevMessages];
      updatedMessages[lastAIMessageIndex] = { ...updatedMessages[lastAIMessageIndex], message: newContent };
      return updatedMessages;
    });
  };

  const handleSend = async () => {
    if (input.trim()) {
      addMessage('You', input);
      setInput('');
      setIsTyping(true);
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input, disease_context: diseaseContext }),
        });

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let aiResponse = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value);
          aiResponse += chunk;
          updateLastAIMessage(aiResponse);
        }
      } catch (error) {
        console.error('Error:', error);
        addMessage('AI', 'Sorry, there was an error processing your request.');
      } finally {
        setIsTyping(false);
      }
    }
  };

  const initializeChatbot = async (context, message) => {
    setIsTyping(true);
    try {
      const initialMessage = message || `Tell me about ${context} disease in plants.`;
      addMessage('You', initialMessage);
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: initialMessage, disease_context: context }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        aiResponse += chunk;
        updateLastAIMessage(aiResponse);
      }
    } catch (error) {
      console.error('Error:', error);
      addMessage('AI', 'Sorry, there was an error initializing the chatbot.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleSaveChat = () => {
    const chatContent = messages.map(msg => `${msg.sender}: ${msg.message}`).join('\n');
    const blob = new Blob([chatContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chat_history.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const suggestedQuestions = [
    "What are the early symptoms?",
    "How does it spread?",
    "Can it be cured?",
    "What's the best treatment?",
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <ChatbotContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            isExpanded={isExpanded}
          >
            <ChatHeader>
              <span>Plant Health Assistant</span>
              <div>
                {isExpanded ? (
                  <Minimize2 onClick={() => setIsExpanded(false)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                ) : (
                  <Maximize2 onClick={() => setIsExpanded(true)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                )}
                <X onClick={() => setIsOpen(false)} style={{ cursor: 'pointer' }} />
              </div>
            </ChatHeader>
            <ChatMessages>
              {messages.map((msg, index) => (
                <MessageBubble
                  key={index}
                  sender={msg.sender}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <strong>{msg.sender}:</strong> {msg.message}
                </MessageBubble>
              ))}
              {isTyping && (
                <TypingIndicator>
                  <Loader size={16} style={{ marginRight: '8px' }} />
                  AI is typing...
                </TypingIndicator>
              )}
              <div ref={messagesEndRef} />
            </ChatMessages>
            <SuggestedQuestions>
              {suggestedQuestions.map((question, index) => (
                <SuggestedQuestion key={index} onClick={() => setInput(question)}>
                  {question}
                </SuggestedQuestion>
              ))}
            </SuggestedQuestions>
            <ChatInputContainer>
              <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
              />
              <ChatButton onClick={handleSend}>
                <Send size={20} />
              </ChatButton>
              <ChatButton onClick={handleSaveChat}>
                <Save size={20} />
              </ChatButton>
            </ChatInputContainer>
          </ChatbotContainer>
        )}
      </AnimatePresence>
      <ChatToggle
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageSquare />
      </ChatToggle>
    </>
  );
};

export default Chatbot;

