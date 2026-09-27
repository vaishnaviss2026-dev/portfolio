import React from 'react';
import { motion } from 'framer-motion';

export const ShinyText = ({ text, disabled = false, speed = 3, className = '' }) => {
  const animationDuration = `${speed}s`;

  return (
    <motion.div
      className={`shiny-text ${disabled ? 'disabled' : ''} ${className}`}
      style={{
        display: 'inline-block',
        background: 'linear-gradient(120deg, rgba(255, 255, 255, 0) 40%, rgba(255, 255, 255, 0.8) 50%, rgba(255, 255, 255, 0) 60%)',
        backgroundSize: '200% 100%',
        WebkitBackgroundClip: 'text',
        backgroundColor: '#fff',
        color: 'transparent',
        animation: disabled ? 'none' : `shine ${animationDuration} linear infinite`,
      }}
    >
      {text}
      <style>
        {`
          @keyframes shine {
            0% { background-position: 100% 50%; }
            100% { background-position: -100% 50%; }
          }
        `}
      </style>
    </motion.div>
  );
};
