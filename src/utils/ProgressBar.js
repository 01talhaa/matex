// ProgressBar.js
import React from 'react';

const ProgressBar = ({ scrollProgress }) => {
  return (
    <div
      className="fixed top-0 left-0 h-1 bg-blue-600 z-50 transition-all duration-300"
      style={{ width: `${scrollProgress}%` }}
    />
  );
};

export default ProgressBar;