import React, { memo } from 'react';
import { FancyButtonProps } from './FancyButtonTypes';
import './FancyButton.scss';

const FancyButton = ({ children, className = '', onClick, disabled = false }: FancyButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={`FancyButton ${className}`}
    >
      {children}
    </button>
  );
};

export default memo(FancyButton);
