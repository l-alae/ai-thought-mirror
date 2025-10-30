import React from 'react';
import { motion } from 'framer-motion';
import './Header.css';

const Header = () => {
  return (
    <motion.header 
      className="header"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div 
        className="feather-icon"
        animate={{ 
          rotate: [0, -10, 10, -10, 0],
          y: [0, -5, 0, -5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🪶
      </motion.div>
      <h1 className="title">Journal Muse</h1>
      <p className="subtitle">
        A space for reflection, where your thoughts meet poetry
      </p>
    </motion.header>
  );
};

export default Header;
