import React, { createContext, useContext, useEffect } from 'react';
import { themeConfig, getThemeCSSProperties } from '../config/theme.js';

// Create theme context
const ThemeContext = createContext(themeConfig);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  useEffect(() => {
    // Apply CSS custom properties to document root
    const root = document.documentElement;
    const cssProperties = getThemeCSSProperties();
    
    if (cssProperties && typeof cssProperties === 'object') {
      Object.entries(cssProperties).forEach(([property, value]) => {
        if (property && value && root && root.style) {
          root.style.setProperty(property, value);
        }
      });
    }

    // Apply theme class to body for global styling
    document.body.classList.add('violet-dark-theme');
    
    // Cleanup function
    return () => {
      document.body.classList.remove('violet-dark-theme');
    };
  }, []);

  return (
    <ThemeContext.Provider value={themeConfig}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;