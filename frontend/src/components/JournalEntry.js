import React from 'react';
import { motion } from 'framer-motion';
import './JournalEntry.css';

const JournalEntry = ({ entry, setEntry, handleSubmit, loading }) => {
  return (
    <motion.div 
      className="journal-entry-container"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="journal-form">
        <div className="textarea-wrapper">
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            placeholder="Pour your thoughts here... What's on your mind today?"
            className="journal-textarea"
            rows="8"
            disabled={loading}
          />
          <div className="textarea-gradient"></div>
        </div>
        
        <motion.button
          type="submit"
          className={`submit-button ${loading ? 'loading' : ''}`}
          disabled={loading || !entry.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {loading ? (
            <>
              <span className="spinner"></span>
              <span>Reflecting...</span>
            </>
          ) : (
            <>
              <span className="sparkle">✨</span>
              <span>Reflect with Muse</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default JournalEntry;
