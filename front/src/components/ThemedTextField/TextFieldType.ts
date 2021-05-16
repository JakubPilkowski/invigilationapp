import React from 'react';

export type TextFieldType = {
  text?: string;
  value: string;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  name?: string;
  helperText?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  error?: boolean;
  errorText?: string;
  autoFocus?: boolean;
  className?: string;
  inputClassName?: string;
  helperClassName?: string;
};
