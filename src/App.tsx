import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, Loader2, Key } from 'lucide-react';
import { startSummarization, getSummarizationResult } from './api';

function App() {
  const [prompt, setPrompt] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [jobId, setJobId] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult('');

    try {
      const response = await startSummarization(prompt, apiKey);
      console.log('Summarization started:', response);
      setJobId(response.job_id);
    } catch (err) {
      console.error('Error starting summarization:', err);
      setError(err instanceof Error ? err.message : 'Failed to start summarization. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!jobId) return;

    const pollResult = async () => {
      try {
        const response = await getSummarizationResult(jobId, apiKey);
        console.log('Poll result:', response);
        if (response.status === 'completed') {
          setResult(response.text);
          setLoading(false);
          setJobId('');
        } else if (response.status === 'failed') {
          setError('Summarization failed. Please try again.');
          setLoading(false);
          setJobId('');
        }
      } catch (err) {
        console.error('Error polling result:', err);
        setError(err instanceof Error ? err.message : 'Error polling result. Please try again.');
        setLoading(false);
        setJobId('');
      }
    };

    const intervalId = setInterval(pollResult, 2000);
    return () => clearInterval(intervalId);
  }, [jobId, apiKey]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [prompt]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center">AI Summarizer</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="mb-4">
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-1">
              API Key
            </label>
            <div className="relative">
              <input
                type="password"
                id="apiKey"
                className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key"
                required
              />
              <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <textarea
            ref={textareaRef}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 resize-none overflow-hidden"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your text to summarize..."
            disabled={loading}
            style={{ minHeight: '100px' }}
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 flex items-center justify-center"
            disabled={loading || !prompt.trim() || !apiKey.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Summarizing...
              </>
            ) : (
              <>
                <Send className="mr-2" size={20} />
                Summarize
              </>
            )}
          </button>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {result && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-2">Summary:</h2>
            <ReactMarkdown className="prose max-w-none">{result}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;