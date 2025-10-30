import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import './App.css';
import JournalEntry from './components/JournalEntry';
import MuseResponse from './components/MuseResponse';
import Header from './components/Header';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [entry, setEntry] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!entry.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post('/api/reflect', {
        journal_entry: entry
      });

      const newEntry = {
        userEntry: entry,
        museResponse: res.data.reply,
        timestamp: new Date().toISOString()
      };

      setResponse(res.data.reply);
      setHistory([newEntry, ...history]);
      setEntry('');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setHistory([]);
    setResponse(null);
  };

  return (
    <div className="App">
      <ParticleBackground />
      
      <div className="container">
        <Header />

        <motion.div 
          className="main-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <JournalEntry
            entry={entry}
            setEntry={setEntry}
            handleSubmit={handleSubmit}
            loading={loading}
          />

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <span className="error-icon">⚠️</span>
                {error}
              </motion.div>
            )}

            {response && !loading && (
              <MuseResponse response={response} />
            )}
          </AnimatePresence>

          {history.length > 0 && (
            <motion.div 
              className="history-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="history-header">
                <h3>Past Reflections</h3>
                <button onClick={clearHistory} className="clear-btn">
                  Clear History
                </button>
              </div>
              
              <div className="history-list">
                {history.map((item, index) => (
                  <motion.div
                    key={index}
                    className="history-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="history-date">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                    <div className="history-entry">
                      <strong>You:</strong> {item.userEntry.substring(0, 100)}
                      {item.userEntry.length > 100 ? '...' : ''}
                    </div>
                    <div className="history-response">
                      <strong>Muse:</strong> {item.museResponse.substring(0, 150)}
                      {item.museResponse.length > 150 ? '...' : ''}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default App;
