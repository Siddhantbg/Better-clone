// Violet Dark Theme Configuration
export const themeConfig = {
  colors: {
    primary: '#7C3AED',      // Violet
    secondary: '#8B5CF6',    // Purple
    background: '#0F0F23',   // Dark Navy
    surface: '#1A1B3A',      // Dark Blue
    accent: '#F59E0B',       // Gold
    text: {
      primary: '#FFFFFF',
      secondary: '#A1A1AA',
      accent: '#F59E0B',
    },
  },
  gradients: {
    hero: {
      primary: 'radial-gradient(circle at 50% 50%, #7C3AED 0%, #8B5CF6 50%, #0F0F23 100%)',
      animated: 'radial-gradient(circle at var(--gradient-x, 50%) var(--gradient-y, 50%), #7C3AED 0%, #8B5CF6 30%, #0F0F23 70%)',
      particles: 'conic-gradient(from 0deg at 50% 50%, #7C3AED, #8B5CF6, #F59E0B, #7C3AED)',
    },
    card: {
      glass: 'linear-gradient(135deg, rgba(26, 27, 58, 0.8) 0%, rgba(15, 15, 35, 0.4) 100%)',
      hover: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(15, 15, 35, 0.6) 100%)',
      border: 'linear-gradient(90deg, #7C3AED, #8B5CF6, #F59E0B)',
      subtle: 'linear-gradient(180deg, rgba(26, 27, 58, 0.6) 0%, rgba(15, 15, 35, 0.8) 100%)',
    },
    button: {
      primary: 'linear-gradient(45deg, #7C3AED, #8B5CF6)',
      animated: 'linear-gradient(45deg, #7C3AED, #8B5CF6, #F59E0B, #7C3AED)',
      hover: 'linear-gradient(45deg, #8B5CF6, #7C3AED, #F59E0B)',
      glow: 'radial-gradient(circle, rgba(124, 58, 237, 0.4), transparent 70%)',
    },
    text: {
      primary: 'linear-gradient(90deg, #7C3AED, #8B5CF6)',
      accent: 'linear-gradient(90deg, #8B5CF6, #F59E0B)',
      rainbow: 'linear-gradient(90deg, #7C3AED, #8B5CF6, #F59E0B, #7C3AED)',
    },
    background: {
      mesh: 'radial-gradient(circle at 20% 80%, rgba(124, 58, 237, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
      overlay: 'linear-gradient(180deg, rgba(15, 15, 35, 0) 0%, rgba(15, 15, 35, 0.8) 100%)',
      section: 'linear-gradient(135deg, #0F0F23 0%, #1A1B3A 100%)',
    }
  },
  effects: {
    glassmorphism: {
      blur: 16,
      opacity: 0.1,
      border: '1px solid rgba(124, 58, 237, 0.2)',
    },
    glow: {
      color: '#7C3AED',
      intensity: 0.5,
      spread: 4,
    },
  },
}

// Color constants for easy access
export const COLORS = {
  VIOLET: '#7C3AED',
  PURPLE: '#8B5CF6', 
  DARK_NAVY: '#0F0F23',
  DARK_BLUE: '#1A1B3A',
  GOLD: '#F59E0B',
  WHITE: '#FFFFFF',
  GRAY: '#A1A1AA',
}

// Utility function to validate theme colors
export const validateThemeColor = (color) => {
  const validColors = Object.values(themeConfig.colors).flat()
  return validColors.includes(color) || 
         Object.values(themeConfig.colors.text).includes(color)
}

// Get CSS custom properties for theme
export const getThemeCSSProperties = () => {
  return {
    '--color-primary': themeConfig.colors.primary,
    '--color-secondary': themeConfig.colors.secondary,
    '--color-background': themeConfig.colors.background,
    '--color-surface': themeConfig.colors.surface,
    '--color-accent': themeConfig.colors.accent,
    '--color-text-primary': themeConfig.colors.text.primary,
    '--color-text-secondary': themeConfig.colors.text.secondary,
    '--color-text-accent': themeConfig.colors.text.accent,
  }
}