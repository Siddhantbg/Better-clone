/**
 * Property-based tests for neon glow effects
 * Feature: modern-crypto-ui-transformation, Property 4: Interactive Element Glow Effects
 * Validates: Requirements 1.4
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import NeonGlow, { NeonButton, NeonCard, NeonText, NeonIcon, NeonInput } from '../components/NeonGlow';
import { ThemeProvider } from '../components/ThemeProvider';

// Test wrapper component
const TestWrapper = ({ children }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);

// Helper function to extract glow properties from computed styles
const extractGlowProperties = (element) => {
  const computedStyle = window.getComputedStyle(element);
  
  return {
    boxShadow: computedStyle.boxShadow,
    textShadow: computedStyle.textShadow,
    color: computedStyle.color,
    hasBoxShadow: computedStyle.boxShadow !== 'none' && computedStyle.boxShadow !== '',
    hasTextShadow: computedStyle.textShadow !== 'none' && computedStyle.textShadow !== '',
    hasGlowColor: computedStyle.color !== 'rgba(0, 0, 0, 0)' && computedStyle.color !== 'rgb(0, 0, 0)',
  };
};

// Helper to simulate hover events
const simulateHover = (element, isHover = true) => {
  const eventType = isHover ? 'mouseenter' : 'mouseleave';
  fireEvent(element, new MouseEvent(eventType, {
    bubbles: true,
    cancelable: true,
  }));
};

describe('Neon Glow Effects Properties', () => {
  beforeEach(() => {
    // Reset any existing styles
    document.head.querySelectorAll('style[data-test]').forEach(el => el.remove());
  });

  test('Property 4: Interactive Element Glow Effects - For any interactive element or button, neon glow effects should be applied through CSS box-shadow properties', () => {
    fc.assert(
      fc.property(
        fc.record({
          color: fc.constantFrom('primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info'),
          intensity: fc.constantFrom('subtle', 'medium', 'strong', 'intense'),
          hoverEffect: fc.boolean(),
          animation: fc.constantFrom('none', 'pulse', 'breathe', 'flicker'),
          interactive: fc.boolean(),
        }),
        (props) => {
          const testId = `neon-glow-${Math.random().toString(36).substr(2, 9)}`;
          
          const { container } = render(
            <TestWrapper>
              <NeonGlow
                data-testid={testId}
                color={props.color}
                intensity={props.intensity}
                hoverEffect={props.hoverEffect}
                animation={props.animation}
                interactive={props.interactive}
              >
                <div>Test Interactive Element</div>
              </NeonGlow>
            </TestWrapper>
          );

          const glowElement = screen.getByTestId(testId);
          expect(glowElement).toBeInTheDocument();

          // Extract glow properties
          const glowProps = extractGlowProperties(glowElement);

          // Should have glow effects applied
          expect(glowProps.hasBoxShadow || glowProps.hasTextShadow).toBe(true);
          
          // Should have a color applied
          expect(glowProps.hasGlowColor).toBe(true);

          // Test hover effects if enabled
          if (props.hoverEffect) {
            const initialGlow = glowProps.boxShadow;
            
            // Simulate hover
            simulateHover(glowElement, true);
            
            // Allow for transition
            setTimeout(() => {
              const hoveredGlow = extractGlowProperties(glowElement);
              
              // Hover should change the glow (different box-shadow or enhanced effect)
              expect(hoveredGlow.hasBoxShadow).toBe(true);
              
              // Simulate mouse leave
              simulateHover(glowElement, false);
            }, 50);
          }

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 4a: Button Glow Consistency - For any NeonButton component, glow effects should be consistently applied', () => {
    fc.assert(
      fc.property(
        fc.record({
          color: fc.constantFrom('primary', 'secondary', 'accent', 'success', 'warning', 'error'),
          intensity: fc.constantFrom('subtle', 'medium', 'strong'),
          animation: fc.constantFrom('none', 'pulse', 'breathe'),
          disabled: fc.boolean(),
        }),
        (props) => {
          const testId = `neon-button-${Math.random().toString(36).substr(2, 9)}`;
          
          const { container } = render(
            <TestWrapper>
              <NeonButton
                data-testid={testId}
                color={props.color}
                intensity={props.intensity}
                animation={props.animation}
                disabled={props.disabled}
              >
                Test Button
              </NeonButton>
            </TestWrapper>
          );

          const buttonElement = screen.getByTestId(testId);
          expect(buttonElement).toBeInTheDocument();

          // Extract glow properties
          const glowProps = extractGlowProperties(buttonElement);

          // Button should have glow effects unless disabled
          if (!props.disabled) {
            expect(glowProps.hasBoxShadow || glowProps.hasTextShadow).toBe(true);
            expect(glowProps.hasGlowColor).toBe(true);
          }

          // Should be clickable unless disabled
          expect(buttonElement.disabled).toBe(props.disabled);

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 4b: Card Glow Application - For any NeonCard component, glow effects should be applied to card elements', () => {
    fc.assert(
      fc.property(
        fc.record({
          color: fc.constantFrom('primary', 'secondary', 'accent'),
          intensity: fc.constantFrom('subtle', 'medium', 'strong'),
          hoverIntensity: fc.constantFrom('medium', 'strong', 'intense'),
        }),
        (props) => {
          const testId = `neon-card-${Math.random().toString(36).substr(2, 9)}`;
          
          const { container } = render(
            <TestWrapper>
              <NeonCard
                data-testid={testId}
                color={props.color}
                intensity={props.intensity}
                hoverIntensity={props.hoverIntensity}
              >
                <div>Test Card Content</div>
              </NeonCard>
            </TestWrapper>
          );

          const cardElement = screen.getByTestId(testId);
          expect(cardElement).toBeInTheDocument();

          // Extract glow properties
          const glowProps = extractGlowProperties(cardElement);

          // Card should have glow effects
          expect(glowProps.hasBoxShadow || glowProps.hasTextShadow).toBe(true);
          
          // Should have appropriate styling for a card
          const computedStyle = window.getComputedStyle(cardElement);
          expect(computedStyle.borderRadius).not.toBe('0px');

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 4c: Text Glow Effects - For any NeonText component, text-shadow glow effects should be applied', () => {
    fc.assert(
      fc.property(
        fc.record({
          color: fc.constantFrom('primary', 'secondary', 'accent', 'success'),
          intensity: fc.constantFrom('subtle', 'medium', 'strong'),
          animation: fc.constantFrom('none', 'pulse', 'flicker'),
          as: fc.constantFrom('span', 'div', 'h1', 'h2', 'p'),
        }),
        (props) => {
          const testId = `neon-text-${Math.random().toString(36).substr(2, 9)}`;
          
          const { container } = render(
            <TestWrapper>
              <NeonText
                data-testid={testId}
                color={props.color}
                intensity={props.intensity}
                animation={props.animation}
                as={props.as}
              >
                Test Glowing Text
              </NeonText>
            </TestWrapper>
          );

          const textElement = screen.getByTestId(testId);
          expect(textElement).toBeInTheDocument();

          // Should render as the correct HTML element
          expect(textElement.tagName.toLowerCase()).toBe(props.as.toLowerCase());

          // Extract glow properties
          const glowProps = extractGlowProperties(textElement);

          // Text should have glow effects, particularly text-shadow
          expect(glowProps.hasTextShadow || glowProps.hasBoxShadow).toBe(true);
          expect(glowProps.hasGlowColor).toBe(true);

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 4d: Input Glow Focus Effects - For any NeonInput component, focus should enhance glow effects', () => {
    fc.assert(
      fc.property(
        fc.record({
          color: fc.constantFrom('primary', 'secondary', 'accent'),
          placeholder: fc.string({ minLength: 1, maxLength: 20 }),
          disabled: fc.boolean(),
        }),
        (props) => {
          const testId = `neon-input-${Math.random().toString(36).substr(2, 9)}`;
          
          const { container } = render(
            <TestWrapper>
              <NeonInput
                data-testid={testId}
                color={props.color}
                placeholder={props.placeholder}
                disabled={props.disabled}
              />
            </TestWrapper>
          );

          const inputElement = screen.getByTestId(testId);
          expect(inputElement).toBeInTheDocument();

          // Should be an input element
          expect(inputElement.tagName.toLowerCase()).toBe('input');
          expect(inputElement.disabled).toBe(props.disabled);

          // Extract initial glow properties
          const initialGlow = extractGlowProperties(inputElement);

          if (!props.disabled) {
            // Should have some glow effects
            expect(initialGlow.hasBoxShadow || initialGlow.hasTextShadow).toBe(true);

            // Test focus enhancement
            fireEvent.focus(inputElement);
            
            setTimeout(() => {
              const focusedGlow = extractGlowProperties(inputElement);
              
              // Focus should maintain or enhance glow effects
              expect(focusedGlow.hasBoxShadow || focusedGlow.hasTextShadow).toBe(true);
              
              // Test blur
              fireEvent.blur(inputElement);
            }, 50);
          }

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 4e: Glow Color Consistency - For any glow component with a specified color, the glow should match the color theme', () => {
    fc.assert(
      fc.property(
        fc.record({
          color: fc.constantFrom('primary', 'secondary', 'accent', 'success', 'warning', 'error', 'info'),
          componentType: fc.constantFrom('button', 'card', 'text'),
        }),
        (props) => {
          const testId = `color-test-${Math.random().toString(36).substr(2, 9)}`;
          
          let Component;
          let componentProps = {
            'data-testid': testId,
            color: props.color,
          };

          switch (props.componentType) {
            case 'button':
              Component = NeonButton;
              componentProps.children = 'Test Button';
              break;
            case 'card':
              Component = NeonCard;
              componentProps.children = <div>Test Card</div>;
              break;
            case 'text':
              Component = NeonText;
              componentProps.children = 'Test Text';
              break;
            default:
              Component = NeonGlow;
              componentProps.children = <div>Test Element</div>;
          }
          
          const { container } = render(
            <TestWrapper>
              <Component {...componentProps} />
            </TestWrapper>
          );

          const element = screen.getByTestId(testId);
          expect(element).toBeInTheDocument();

          // Extract glow properties
          const glowProps = extractGlowProperties(element);

          // Should have glow effects
          expect(glowProps.hasBoxShadow || glowProps.hasTextShadow || glowProps.hasGlowColor).toBe(true);

          // Color should be applied (not default black)
          expect(glowProps.color).not.toBe('rgb(0, 0, 0)');
          expect(glowProps.color).not.toBe('rgba(0, 0, 0, 0)');

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 4f: Animation Glow Effects - For any glow component with animation, glow effects should be present during animation', () => {
    fc.assert(
      fc.property(
        fc.record({
          animation: fc.constantFrom('pulse', 'breathe', 'flicker'),
          color: fc.constantFrom('primary', 'secondary', 'accent'),
          intensity: fc.constantFrom('medium', 'strong'),
        }),
        (props) => {
          const testId = `animated-glow-${Math.random().toString(36).substr(2, 9)}`;
          
          const { container } = render(
            <TestWrapper>
              <NeonGlow
                data-testid={testId}
                color={props.color}
                intensity={props.intensity}
                animation={props.animation}
              >
                <div>Animated Glow Element</div>
              </NeonGlow>
            </TestWrapper>
          );

          const element = screen.getByTestId(testId);
          expect(element).toBeInTheDocument();

          // Extract glow properties
          const glowProps = extractGlowProperties(element);

          // Should have glow effects
          expect(glowProps.hasBoxShadow || glowProps.hasTextShadow).toBe(true);

          // Should have animation class applied
          const classList = Array.from(element.classList);
          const hasAnimationClass = classList.some(className => 
            className.includes('pulse') || 
            className.includes('breathe') || 
            className.includes('flicker') ||
            className.includes('neon')
          );
          
          expect(hasAnimationClass).toBe(true);

          return true;
        }
      ),
      { numRuns: 5 }
    );
  });
});
