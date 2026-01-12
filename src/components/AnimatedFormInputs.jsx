import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import microInteractionManager from '../utils/MicroInteractionManager';

/**
 * AnimatedInput component with enhanced floating label animations and focus state highlighting
 * @param {Object} props - Component props
 * @param {string} props.label - Input label text
 * @param {string} props.type - Input type (text, number, email, etc.)
 * @param {string} props.value - Input value
 * @param {Function} props.onChange - Change handler
 * @param {Function} props.onFocus - Focus handler
 * @param {Function} props.onBlur - Blur handler
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.required - Required field indicator
 * @param {string} props.error - Error message
 * @param {string} props.success - Success message
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.color - Theme color ('primary', 'secondary', 'accent')
 * @param {boolean} props.enhancedInteractions - Enable enhanced micro-interactions
 * @param {string} props.className - Additional CSS classes
 * @returns {JSX.Element} AnimatedInput component
 */
export const AnimatedInput = ({
  label,
  type = 'text',
  value = '',
  onChange,
  onFocus,
  onBlur,
  placeholder = '',
  required = false,
  error = '',
  success = '',
  disabled = false,
  color = 'primary',
  enhancedInteractions = true,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const inputRef = useRef(null);
  const theme = useTheme();

  // Color mapping
  const colorMap = {
    primary: '#7C3AED',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
  };

  const currentColor = error ? colorMap.error : success ? colorMap.success : colorMap[color];

  useEffect(() => {
    setHasValue(value && value.toString().length > 0);
  }, [value]);

  // Setup enhanced interactions
  useEffect(() => {
    if (enhancedInteractions && inputRef.current && !disabled) {
      microInteractionManager.enhanceInputFocus(inputRef.current, {
        glowColor: currentColor,
        lift: true,
      });
    }
  }, [enhancedInteractions, disabled, currentColor]);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e) => {
    onChange?.(e);
  };

  // Generate dynamic styles
  const containerStyles = {
    position: 'relative',
    marginBottom: '1.5rem',
  };

  const inputStyles = {
    width: '100%',
    padding: '1rem 1rem 1rem 1rem',
    fontSize: '1rem',
    border: `2px solid ${isFocused ? currentColor : 'rgba(255, 255, 255, 0.2)'}`,
    borderRadius: '0.5rem',
    background: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    color: '#ffffff',
    outline: 'none',
    transition: enhancedInteractions ? 'border-color 0.25s cubic-bezier(0.23, 1, 0.32, 1)' : 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
    boxShadow: enhancedInteractions ? 'none' : (isFocused 
      ? `0 0 20px ${currentColor}40, 0 0 40px ${currentColor}20`
      : 'none'),
    transform: enhancedInteractions ? 'none' : (isFocused ? 'translateY(-2px)' : 'translateY(0)'),
  };

  const labelStyles = {
    position: 'absolute',
    left: '1rem',
    top: isFocused || hasValue ? '0.25rem' : '1rem',
    fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
    color: isFocused ? currentColor : 'rgba(255, 255, 255, 0.7)',
    background: isFocused || hasValue ? 'rgba(15, 15, 35, 0.9)' : 'transparent',
    padding: isFocused || hasValue ? '0 0.5rem' : '0',
    borderRadius: '0.25rem',
    transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
    pointerEvents: 'none',
    zIndex: 1,
    textShadow: isFocused ? `0 0 8px ${currentColor}` : 'none',
  };

  const feedbackStyles = {
    fontSize: '0.875rem',
    marginTop: '0.5rem',
    minHeight: '1.25rem',
    transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
  };

  const errorStyles = {
    ...feedbackStyles,
    color: colorMap.error,
    textShadow: `0 0 5px ${colorMap.error}`,
  };

  const successStyles = {
    ...feedbackStyles,
    color: colorMap.success,
    textShadow: `0 0 5px ${colorMap.success}`,
  };

  const enhancedClass = enhancedInteractions ? 'input-enhanced' : '';
  const validationClass = error ? 'validation-error' : success ? 'validation-success' : '';

  return (
    <div style={containerStyles} className={className}>
      <div style={{ position: 'relative' }}>
        {label && (
          <label style={labelStyles}>
            {label}
            {required && <span style={{ color: colorMap.error }}> *</span>}
          </label>
        )}
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          style={inputStyles}
          className={`${enhancedClass} ${validationClass}`}
          {...props}
        />
      </div>
      
      {/* Real-time validation feedback */}
      {error && (
        <div style={errorStyles} className="animate-fade-in">
          {error}
        </div>
      )}
      
      {success && !error && (
        <div style={successStyles} className="animate-fade-in">
          {success}
        </div>
      )}
    </div>
  );
};

/**
 * AnimatedSelect component with floating label and enhanced styling
 */
export const AnimatedSelect = ({
  label,
  value = '',
  onChange,
  onFocus,
  onBlur,
  options = [],
  required = false,
  error = '',
  success = '',
  disabled = false,
  color = 'primary',
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  // Color mapping
  const colorMap = {
    primary: '#7C3AED',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
  };

  const currentColor = error ? colorMap.error : success ? colorMap.success : colorMap[color];

  useEffect(() => {
    setHasValue(value && value.toString().length > 0);
  }, [value]);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const containerStyles = {
    position: 'relative',
    marginBottom: '1.5rem',
  };

  const selectStyles = {
    width: '100%',
    padding: '1rem 1rem 1rem 1rem',
    fontSize: '1rem',
    border: `2px solid ${isFocused ? currentColor : 'rgba(255, 255, 255, 0.2)'}`,
    borderRadius: '0.5rem',
    background: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    color: '#ffffff',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: isFocused 
      ? `0 0 20px ${currentColor}40, 0 0 40px ${currentColor}20`
      : 'none',
    transform: isFocused ? 'translateY(-2px)' : 'translateY(0)',
    cursor: 'pointer',
  };

  const labelStyles = {
    position: 'absolute',
    left: '1rem',
    top: isFocused || hasValue ? '0.25rem' : '1rem',
    fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
    color: isFocused ? currentColor : 'rgba(255, 255, 255, 0.7)',
    background: isFocused || hasValue ? 'rgba(15, 15, 35, 0.9)' : 'transparent',
    padding: isFocused || hasValue ? '0 0.5rem' : '0',
    borderRadius: '0.25rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: 'none',
    zIndex: 1,
    textShadow: isFocused ? `0 0 10px ${currentColor}` : 'none',
  };

  return (
    <div style={containerStyles} className={className}>
      <div style={{ position: 'relative' }}>
        {label && (
          <label style={labelStyles}>
            {label}
            {required && <span style={{ color: colorMap.error }}> *</span>}
          </label>
        )}
        <select
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          style={selectStyles}
          {...props}
        >
          {options.map((option, index) => (
            <option 
              key={index} 
              value={option.value} 
              style={{ 
                background: '#1A1B3A', 
                color: '#ffffff',
                padding: '0.5rem'
              }}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      {error && (
        <div style={{
          fontSize: '0.875rem',
          marginTop: '0.5rem',
          color: colorMap.error,
          textShadow: `0 0 5px ${colorMap.error}`,
        }} className="animate-fade-in">
          {error}
        </div>
      )}
      
      {success && !error && (
        <div style={{
          fontSize: '0.875rem',
          marginTop: '0.5rem',
          color: colorMap.success,
          textShadow: `0 0 5px ${colorMap.success}`,
        }} className="animate-fade-in">
          {success}
        </div>
      )}
    </div>
  );
};

/**
 * AnimatedTextarea component with floating label and enhanced styling
 */
export const AnimatedTextarea = ({
  label,
  value = '',
  onChange,
  onFocus,
  onBlur,
  placeholder = '',
  required = false,
  error = '',
  success = '',
  disabled = false,
  color = 'primary',
  rows = 4,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  // Color mapping
  const colorMap = {
    primary: '#7C3AED',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    success: '#10B981',
    error: '#EF4444',
  };

  const currentColor = error ? colorMap.error : success ? colorMap.success : colorMap[color];

  useEffect(() => {
    setHasValue(value && value.toString().length > 0);
  }, [value]);

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const containerStyles = {
    position: 'relative',
    marginBottom: '1.5rem',
  };

  const textareaStyles = {
    width: '100%',
    padding: '1rem 1rem 1rem 1rem',
    fontSize: '1rem',
    border: `2px solid ${isFocused ? currentColor : 'rgba(255, 255, 255, 0.2)'}`,
    borderRadius: '0.5rem',
    background: 'rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
    color: '#ffffff',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: isFocused 
      ? `0 0 20px ${currentColor}40, 0 0 40px ${currentColor}20`
      : 'none',
    transform: isFocused ? 'translateY(-2px)' : 'translateY(0)',
    resize: 'vertical',
    minHeight: `${rows * 1.5}rem`,
  };

  const labelStyles = {
    position: 'absolute',
    left: '1rem',
    top: isFocused || hasValue ? '0.25rem' : '1rem',
    fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
    color: isFocused ? currentColor : 'rgba(255, 255, 255, 0.7)',
    background: isFocused || hasValue ? 'rgba(15, 15, 35, 0.9)' : 'transparent',
    padding: isFocused || hasValue ? '0 0.5rem' : '0',
    borderRadius: '0.25rem',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: 'none',
    zIndex: 1,
    textShadow: isFocused ? `0 0 10px ${currentColor}` : 'none',
  };

  return (
    <div style={containerStyles} className={className}>
      <div style={{ position: 'relative' }}>
        {label && (
          <label style={labelStyles}>
            {label}
            {required && <span style={{ color: colorMap.error }}> *</span>}
          </label>
        )}
        <textarea
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          style={textareaStyles}
          {...props}
        />
      </div>
      
      {error && (
        <div style={{
          fontSize: '0.875rem',
          marginTop: '0.5rem',
          color: colorMap.error,
          textShadow: `0 0 5px ${colorMap.error}`,
        }} className="animate-fade-in">
          {error}
        </div>
      )}
      
      {success && !error && (
        <div style={{
          fontSize: '0.875rem',
          marginTop: '0.5rem',
          color: colorMap.success,
          textShadow: `0 0 5px ${colorMap.success}`,
        }} className="animate-fade-in">
          {success}
        </div>
      )}
    </div>
  );
};

/**
 * FormValidationProvider - Real-time validation context
 */
export const FormValidationProvider = ({ children, validationRules = {} }) => {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    for (const rule of rules) {
      if (rule.required && (!value || value.toString().trim() === '')) {
        return rule.message || `${name} is required`;
      }
      
      if (rule.minLength && value.toString().length < rule.minLength) {
        return rule.message || `${name} must be at least ${rule.minLength} characters`;
      }
      
      if (rule.maxLength && value.toString().length > rule.maxLength) {
        return rule.message || `${name} must be no more than ${rule.maxLength} characters`;
      }
      
      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.message || `${name} format is invalid`;
      }
      
      if (rule.custom && !rule.custom(value)) {
        return rule.message || `${name} is invalid`;
      }
    }
    
    return '';
  };

  const handleFieldChange = (name, value) => {
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleFieldBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  return (
    <div>
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.props.name) {
          return React.cloneElement(child, {
            error: touched[child.props.name] ? errors[child.props.name] : '',
            success: touched[child.props.name] && !errors[child.props.name] && child.props.value ? '✓ Valid' : '',
            onChange: (e) => {
              child.props.onChange?.(e);
              handleFieldChange(child.props.name, e.target.value);
            },
            onBlur: (e) => {
              child.props.onBlur?.(e);
              handleFieldBlur(child.props.name);
            },
          });
        }
        return child;
      })}
    </div>
  );
};

export default { AnimatedInput, AnimatedSelect, AnimatedTextarea, FormValidationProvider };