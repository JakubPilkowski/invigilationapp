import { TextField } from '@material-ui/core';
import classNames from 'classnames';
import React, { memo } from 'react';
import { TextFieldType } from './TextFieldType';

import './ThemedTextField.scss';

const ThemedTextField = ({
  text = '',
  disabled = false,
  label = '',
  value = '',
  helperText = '',
  name = '',
  required = false,
  onChange,
  error = false,
  errorText = '',
  autoFocus = false,
  className = '',
  inputClassName = '',
  helperClassName = '',
}: TextFieldType) => {
  const root = classNames('ThemedTextField', className);
  const input = classNames('ThemedTextField__input', inputClassName);
  const labelStyles = classNames('ThemedTextField__label');
  const helper = classNames('ThemedTextField__helper', helperClassName);

  return (
    <TextField
      required={required}
      id={text}
      autoFocus={autoFocus}
      disabled={disabled}
      label={label}
      name={name}
      value={value}
      helperText={error ? errorText : helperText}
      inputProps={{ 'aria-label': label, 'className': input }}
      InputLabelProps={{ className: labelStyles }}
      FormHelperTextProps={{ className: helper }}
      onChange={onChange}
      error={error}
      size="small"
      variant="outlined"
      color="secondary"
      classes={{
        root,
      }}
    />
  );
};

export default memo(ThemedTextField);
