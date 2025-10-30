import React from 'react';
import { motion } from 'framer-motion';
import './MuseResponse.css';

const MuseResponse = ({ response }) => {
  return (
    <motion.div 
      className="muse-response-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="muse-header"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="muse-icon">🌙</div>
        <h3 className="muse-title">The Muse Reflects</h3>
      </motion.div>
      
      <motion.div 
        className="muse-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {response.split('\n').map((paragraph, index) => (
          paragraph.trim() && (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + (index * 0.1) }}
            >
              {paragraph}
            </motion.p>
          )
        ))}
      </motion.div>

      <motion.div 
        className="decorative-line"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      />
    </motion.div>
  );
};

export default MuseResponse;
