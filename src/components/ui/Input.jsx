import React, { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({ 
  type = 'text',
  label,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  className = '',
  helperText,
  ...props 
}, ref) => {
  const inputWrapperClasses = [
    'input-wrapper',
    fullWidth && 'input-wrapper--full-width',
    error && 'input-wrapper--error',
    disabled && 'input-wrapper--disabled',
    className,
  ].filter(Boolean).join(' ');

  const inputClasses = [
    'input',
    icon && iconPosition === 'left' && 'input--with-icon-left',
    icon && iconPosition === 'right' && 'input--with-icon-right',
  ].filter(Boolean).join(' ');

  return (
    <div className={inputWrapperClasses}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      
      <div className="input-container">
        {icon && iconPosition === 'left' && (
          <span className="input-icon input-icon--left">{icon}</span>
        )}
        
        <input
          ref={ref}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          {...props}
        />
        
        {icon && iconPosition === 'right' && (
          <span className="input-icon input-icon--right">{icon}</span>
        )}
      </div>
      
      {(error || helperText) && (
        <span className={error ? 'input-error' : 'input-helper'}>
          {error || helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;