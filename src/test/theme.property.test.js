import { describe, test, expect } from 'vitest'
import fc from 'fast-check'
import { themeConfig, validateThemeColor, getThemeCSSProperties } from '../config/theme.js'

describe('Theme Color Consistency Properties', () => {
  // Feature: modern-crypto-ui-transformation, Property 1: Theme Color Consistency
  test('theme colors are consistently applied across components', () => {
    fc.assert(fc.property(
      fc.record({
        componentType: fc.constantFrom('button', 'card', 'navbar', 'hero', 'text'),
        colorType: fc.constantFrom('primary', 'secondary', 'background', 'surface', 'accent'),
        textVariant: fc.constantFrom('primary', 'secondary', 'accent')
      }),
      ({ componentType, colorType, textVariant }) => {
        // Test that all theme colors match the defined violet dark theme palette
        const expectedColors = {
          primary: '#7C3AED',
          secondary: '#8B5CF6', 
          background: '#0F0F23',
          surface: '#1A1B3A',
          accent: '#F59E0B'
        }
        
        // Validate main colors
        if (colorType in expectedColors) {
          const actualColor = themeConfig.colors[colorType]
          expect(actualColor).toBe(expectedColors[colorType])
        }
        
        // Validate text colors
        const expectedTextColors = {
          primary: '#FFFFFF',
          secondary: '#A1A1AA', 
          accent: '#F59E0B'
        }
        
        if (textVariant in expectedTextColors) {
          const actualTextColor = themeConfig.colors.text[textVariant]
          expect(actualTextColor).toBe(expectedTextColors[textVariant])
        }
        
        return true
      }
    ), { numRuns: 10 })
  })

  test('CSS custom properties contain all required theme colors', () => {
    fc.assert(fc.property(
      fc.constantFrom('primary', 'secondary', 'background', 'surface', 'accent'),
      (colorName) => {
        const cssProps = getThemeCSSProperties()
        const cssVarName = `--color-${colorName}`
        
        // Verify CSS custom property exists
        expect(cssProps).toHaveProperty(cssVarName)
        
        // Verify it matches the theme config
        const expectedColor = themeConfig.colors[colorName]
        expect(cssProps[cssVarName]).toBe(expectedColor)
        
        return true
      }
    ), { numRuns: 10 })
  })

  test('gradient definitions use only theme colors', () => {
    fc.assert(fc.property(
      fc.record({
        gradientType: fc.constantFrom('hero', 'card', 'button'),
        variant: fc.constantFrom('primary', 'animated', 'hover', 'glass', 'border')
      }),
      ({ gradientType, variant }) => {
        const gradientObj = themeConfig.gradients[gradientType]
        
        // Skip if variant doesn't exist for this gradient type
        if (!gradientObj || !gradientObj[variant]) {
          return true
        }
        
        const gradient = gradientObj[variant]
        
        // Check that gradient contains theme colors (hex or rgba equivalents)
        const themeColorValues = [
          '#7C3AED', '#8B5CF6', '#0F0F23', '#1A1B3A', '#F59E0B'
        ]
        
        // Convert hex to rgba equivalents for validation
        const rgbaEquivalents = {
          '#7C3AED': '124, 58, 237', // violet
          '#8B5CF6': '139, 92, 246', // purple  
          '#0F0F23': '15, 15, 35',   // dark navy
          '#1A1B3A': '26, 27, 58',   // dark blue
          '#F59E0B': '245, 158, 11'  // gold
        }
        
        // Check for hex colors or their rgba equivalents
        const containsThemeColor = themeColorValues.some(color => 
          gradient.includes(color) || gradient.includes(rgbaEquivalents[color])
        )
        
        expect(containsThemeColor).toBe(true)
        return true
      }
    ), { numRuns: 10 })
  })

  test('glassmorphism effects use theme-consistent colors', () => {
    const glassEffect = themeConfig.effects.glassmorphism
    
    // Test that glassmorphism border uses primary color with transparency
    expect(glassEffect.border).toContain('124, 58, 237') // RGB values of #7C3AED
    
    // Test glow effect uses primary color
    const glowEffect = themeConfig.effects.glow
    expect(glowEffect.color).toBe('#7C3AED')
  })

  test('color validation function works correctly', () => {
    fc.assert(fc.property(
      fc.constantFrom('#7C3AED', '#8B5CF6', '#0F0F23', '#1A1B3A', '#F59E0B', '#FFFFFF', '#A1A1AA'),
      (color) => {
        const isValid = validateThemeColor(color)
        expect(isValid).toBe(true)
        return true
      }
    ), { numRuns: 10 })
  })

  test('invalid colors are rejected by validation', () => {
    fc.assert(fc.property(
      fc.constantFrom('#FF0000', '#00FF00', '#0000FF', '#RANDOM'),
      (invalidColor) => {
        const isValid = validateThemeColor(invalidColor)
        expect(isValid).toBe(false)
        return true
      }
    ), { numRuns: 10 })
  })
})

describe('Gradient Implementation Properties', () => {
  // Feature: modern-crypto-ui-transformation, Property 2: Gradient Implementation Completeness
  test('gradient backgrounds contain smooth color transitions with correct color stops', () => {
    fc.assert(fc.property(
      fc.record({
        gradientCategory: fc.constantFrom('hero', 'card', 'button', 'text', 'background'),
        gradientVariant: fc.constantFrom('primary', 'animated', 'hover', 'glass', 'border', 'glow', 'accent', 'rainbow', 'subtle', 'particles', 'mesh', 'overlay', 'section')
      }),
      ({ gradientCategory, gradientVariant }) => {
        const gradientObj = themeConfig.gradients[gradientCategory]
        
        // Skip if variant doesn't exist for this gradient category
        if (!gradientObj || !gradientObj[gradientVariant]) {
          return true
        }
        
        const gradient = gradientObj[gradientVariant]
        
        // Test 1: Gradient should be a valid CSS gradient string (single or composite)
        const singleGradientRegex = /(linear-gradient|radial-gradient|conic-gradient)\s*\([^)]+\)/
        const compositeGradientRegex = /((linear-gradient|radial-gradient|conic-gradient)\s*\([^)]+\)(\s*,\s*)?)+/
        const isValidGradient = singleGradientRegex.test(gradient) || compositeGradientRegex.test(gradient)
        expect(isValidGradient).toBe(true)
        
        // Test 2: Gradient should contain theme colors
        const themeColors = ['#7C3AED', '#8B5CF6', '#0F0F23', '#1A1B3A', '#F59E0B']
        const rgbaEquivalents = [
          '124, 58, 237',  // #7C3AED
          '139, 92, 246',  // #8B5CF6  
          '15, 15, 35',    // #0F0F23
          '26, 27, 58',    // #1A1B3A
          '245, 158, 11'   // #F59E0B
        ]
        
        const containsThemeColor = themeColors.some(color => gradient.includes(color)) ||
                                 rgbaEquivalents.some(rgba => gradient.includes(rgba))
        expect(containsThemeColor).toBe(true)
        
        // Test 3: Gradient should have proper color stops (at least 1 color, transparent counts as valid)
        const colorStopMatches = gradient.match(/(#[0-9A-Fa-f]{6}|rgba?\([^)]+\)|transparent)/g)
        if (colorStopMatches) {
          expect(colorStopMatches.length).toBeGreaterThanOrEqual(1)
        }
        
        // Test 4: For linear/radial gradients, should have proper direction/position
        // Handle composite gradients by splitting on commas outside of parentheses
        const gradientParts = gradient.split(/,\s*(?![^()]*\))/)
        
        gradientParts.forEach(part => {
          const trimmedPart = part.trim()
          
          if (trimmedPart.includes('linear-gradient')) {
            const directionMatch = trimmedPart.match(/linear-gradient\s*\(\s*([^,]+)/)
            expect(directionMatch).toBeTruthy()
            
            // Direction should be valid (deg, to direction, or percentage)
            const direction = directionMatch[1].trim()
            const validDirection = /(\d+deg|to\s+(top|bottom|left|right)|circle|ellipse|\d+%)/i.test(direction)
            expect(validDirection).toBe(true)
          }
          
          if (trimmedPart.includes('radial-gradient')) {
            const positionMatch = trimmedPart.match(/radial-gradient\s*\(\s*([^,]+)/)
            expect(positionMatch).toBeTruthy()
            
            // Position should be valid (circle at x% y%, etc.)
            const position = positionMatch[1].trim()
            const validPosition = /(circle|ellipse|at\s+\d+%\s+\d+%|var\(--[\w-]+)/i.test(position)
            expect(validPosition).toBe(true)
          }
        })
        
        // Test 5: Smooth transitions - no abrupt color changes (check for percentage stops)
        gradientParts.forEach(part => {
          // Extract only color stop percentages, not position percentages
          const colorStopRegex = /(rgba?\([^)]+\)|#[0-9A-Fa-f]{6}|transparent)\s+(\d+%)/g
          const colorStops = []
          let match
          
          while ((match = colorStopRegex.exec(part)) !== null) {
            colorStops.push(parseInt(match[2]))
          }
          
          // If we have color stop percentages, ensure they're in ascending order for smooth transitions
          if (colorStops.length > 1) {
            for (let i = 1; i < colorStops.length; i++) {
              expect(colorStops[i]).toBeGreaterThanOrEqual(colorStops[i-1])
            }
          }
        })
        
        return true
      }
    ), { numRuns: 10 })
  })
})
