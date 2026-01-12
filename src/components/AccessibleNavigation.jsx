import React from 'react'
import { useReducedMotion, useAccessibleNavigation } from '../hooks/useReducedMotion.js'

/**
 * Accessibility-friendly navigation component
 * Provides skip links, keyboard navigation, and reduced motion support
 */
export function AccessibleNavigation({ children, className = '' }) {
  const { isReducedMotion } = useReducedMotion()
  const { focusElement, scrollToElement } = useAccessibleNavigation()

  const handleSkipToMain = (e) => {
    e.preventDefault()
    const mainContent = document.getElementById('main-content')
    if (mainContent) {
      scrollToElement(mainContent)
      focusElement(mainContent, { preventScroll: true })
    }
  }

  const handleSkipToNav = (e) => {
    e.preventDefault()
    const navigation = document.getElementById('main-navigation')
    if (navigation) {
      scrollToElement(navigation)
      focusElement(navigation.querySelector('a, button'), { preventScroll: true })
    }
  }

  return (
    <>
      {/* Skip Links for Screen Readers and Keyboard Users */}
      <div className="sr-only focus-within:not-sr-only">
        <a
          href="#main-content"
          onClick={handleSkipToMain}
          className="skip-link"
        >
          Skip to main content
        </a>
        <a
          href="#main-navigation"
          onClick={handleSkipToNav}
          className="skip-link"
        >
          Skip to navigation
        </a>
      </div>

      {/* Navigation Container */}
      <nav
        id="main-navigation"
        className={`
          ${className}
          ${isReducedMotion ? 'reduced-motion' : ''}
        `}
        role="navigation"
        aria-label="Main navigation"
      >
        {children}
      </nav>
    </>
  )
}

/**
 * Accessible navigation link component
 */
export function AccessibleNavLink({ 
  href, 
  children, 
  isActive = false, 
  onClick,
  className = '',
  ...props 
}) {
  const { isReducedMotion } = useReducedMotion()
  const { focusElement } = useAccessibleNavigation()

  const handleClick = (e) => {
    if (onClick) {
      onClick(e)
    }
    
    // Ensure proper focus management
    setTimeout(() => {
      focusElement(e.target)
    }, 100)
  }

  const linkClasses = `
    ${className}
    nav-link
    ${isActive ? 'active' : ''}
    ${isReducedMotion ? 'reduced-motion' : ''}
    focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
    transition-colors duration-200
  `.trim()

  return (
    <a
      href={href}
      onClick={handleClick}
      className={linkClasses}
      aria-current={isActive ? 'page' : undefined}
      {...props}
    >
      {children}
    </a>
  )
}

/**
 * Accessible button component with reduced motion support
 */
export function AccessibleButton({ 
  children, 
  onClick, 
  disabled = false,
  variant = 'primary',
  className = '',
  ...props 
}) {
  const { isReducedMotion } = useReducedMotion()

  const buttonClasses = `
    ${className}
    ${variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
    ${isReducedMotion ? 'reduced-motion' : ''}
    focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    transition-colors duration-200
  `.trim()

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  )
}

/**
 * Accessible form field with reduced motion support
 */
export function AccessibleFormField({ 
  label, 
  id, 
  error, 
  success,
  children,
  className = '',
  ...props 
}) {
  const { isReducedMotion } = useReducedMotion()

  const fieldClasses = `
    form-field
    ${error ? 'error' : ''}
    ${success ? 'success' : ''}
    ${isReducedMotion ? 'reduced-motion' : ''}
    ${className}
  `.trim()

  return (
    <div className={fieldClasses}>
      {label && (
        <label 
          htmlFor={id}
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          {label}
        </label>
      )}
      
      {children}
      
      {error && (
        <div 
          className="error-message text-red-400 text-sm mt-1"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}
      
      {success && (
        <div 
          className="success-message text-green-400 text-sm mt-1"
          role="status"
          aria-live="polite"
        >
          {success}
        </div>
      )}
    </div>
  )
}

/**
 * Accessible progress indicator
 */
export function AccessibleProgress({ 
  value, 
  max = 100, 
  label,
  className = '' 
}) {
  const { isReducedMotion } = useReducedMotion()
  const percentage = Math.round((value / max) * 100)

  return (
    <div className={`progress-container ${className}`}>
      {label && (
        <div className="flex justify-between text-sm text-gray-300 mb-2">
          <span>{label}</span>
          <span>{percentage}%</span>
        </div>
      )}
      
      <div 
        className={`
          progress-bar
          ${isReducedMotion ? 'reduced-motion' : ''}
          w-full bg-gray-700 rounded-full h-2
        `}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || 'Progress'}
        style={{ '--progress-value': `${percentage}%` }}
      >
        <div 
          className={`
            h-full rounded-full transition-all duration-300
            ${isReducedMotion ? 'transition-none' : ''}
          `}
          style={{ 
            width: `${percentage}%`,
            background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))'
          }}
        />
      </div>
    </div>
  )
}

export default AccessibleNavigation