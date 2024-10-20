// components/Button.js

import React from 'react';

const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
