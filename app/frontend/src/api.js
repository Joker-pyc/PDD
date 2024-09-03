const API_URL = 'http://localhost:5000/api';

export const submitImage = async (formData) => {
  const response = await fetch(`${API_URL}/submit`, {
    method: 'POST',
    body: formData,
  });
  if (!response.ok) {
    throw new Error('Image submission failed');
  }
  return response.json();
};

export const getMarketData = async () => {
  const response = await fetch(`${API_URL}/market`);
  if (!response.ok) {
    throw new Error('Failed to fetch market data');
  }
  return response.json();
};

export const sendChatMessage = async (message, diseaseContext = '') => {
  const response = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, disease_context: diseaseContext }),
  });
  if (!response.ok) {
    throw new Error('Chat message failed to send');
  }
  const data = await response.json();
  return data.response;
};
