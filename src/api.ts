import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://api.ai-lab.plateaumed-dev.com/api/v1';

const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your API key and try again.');
    }
    throw new Error(error.response?.data?.message || error.message || 'An error occurred while processing your request.');
  }
  throw new Error('An unexpected error occurred.');
};

export const startSummarization = async (prompt: string, apiKey: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/summarizer-async`, 
      { prompt },
      { headers: { 'X-API-Key': apiKey } }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const getSummarizationResult = async (jobId: string, apiKey: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/summarizer-async/${jobId}`, 
      { headers: { 'X-API-Key': apiKey } }
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};