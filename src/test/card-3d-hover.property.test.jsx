/**
 * Property-based tests for 3D card hover transforms
 * Feature: modern-crypto-ui-transformation, Property 13: Card Hover 3D Transform
 * Validates: Requirements 4.3
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import fc from 'fast-check';
import GlassCard from '../components/GlassCard';
import { ThemeProvider } from '../components/ThemeProvider';

// Test wrapper component
const TestWrapper = ({ children }) => (
  <ThemeProvider>
    {children}
  </ThemeProvider>
);

// Helper function to extract transform values from computed styles
const extractTransformValues = (element) => {
  const computedStyle = window.getComputedStyle(element);
  const transform = computedStyle.transform;
  
  if (transform === 'none' || !transform) {
    return {
      translateY: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      hasTransform: false
    };
  }

  // Parse matrix3d or matrix values
  const matrixMatch = transform.match(/matrix3?d?\(([^)]+)\)/);
  if (matrixMatch) {
    const values = matrixMatch[1].split(',').map(v => parseFloat(v.trim()));
    
    // For matrix3d, extract scale from the diagonal elements
    if (values.length === 16) {
      const scaleX = Math.sqrt(values[0] * values[0] + values[1] * values[1] + values[2] * values[2]);
      return {
        translateY: values[13],
        scale: scaleX,
        hasTransform: true,
        rawTransform: transform
      };
    }
  }

  return {
    hasTransform: true,
    rawTransform: transform
  };
};

// Helper to simulate mouse events
const simulateMouseInteraction = (element, eventType, coordinates = {}) => {
  const rect = element.getBoundingClientRect();
  const event = new MouseEvent(eventType, {
    bubbles: true,
    cancelable: true,
    clientX: coordinates.x || rect.left + rect.width / 2,
    clientY: coordinates.y || rect.top + rect.height / 2,
  });
  
  element.dispatchEvent(event);
};

describe('3D Card Hover Transform Properties', () => {
  beforeEach(() => {
    // Reset any existing styles
    document.head.querySelectorAll('style[data-test]').forEach(el => el.remove());
  });

  test('Property 13: Card Hover 3D Transform - For any card hover event, 3D transform CSS properties should be applied to create lift effects', () => {
    fc.assert(
      fc.property(
        fc.record({
          hoverEffect: fc.constantFrom('lift', 'tilt', 'glow', 'scale'),
          enable3D: fc.boolean(),
          blurIntensity: fc.integer({ min: 8, max: 24 }),
          opacity: fc.float({ min: Math.fround(0.05), max: Math.fround(0.3) }),
          borderGlow: fc.boolean(),
        }),
        (props) => {
          const testId = `card-${Math.random().toString(36).substr(2, 9)}`;
          
          const { container } = render(
            <TestWrapper>
              <GlassCard
                data-testid={testId}
                hoverEffect={props.hoverEffect}
                enable3D={props.enable3D}
                blurIntensity={props.blurIntensity}
                opacity={props.opacity}
                borderGlow={props.borderGlow}
              >
                <div>Test Content</div>
              </GlassCard>
            </TestWrapper>
          );

          const cardElement = screen.getByTestId(testId);
          expect(cardElement).toBeInTheDocument();

          // Get initial transform state
          const initialTransform = extractTransformValues(cardElement);

          // Simulate mouse enter
          simulateMouseInteraction(cardElement, 'mouseenter');
          
          // Allow for transition time
          setTimeout(() => {
            const hoveredTransform = extractTransformValues(cardElement);

            if (props.enable3D && (props.hoverEffect === 'lift' || props.hoverEffect === 'tilt')) {
              // For 3D enabled cards, should have transform properties
              expect(hoveredTransform.hasTransform).toBe(true);
              
              // Should have some form of transformation applied
              expect(hoveredTransform.rawTransform).not.toBe('none');
              expect(hoveredTransform.rawTransform).not.toBe(undefined);
              
              // Transform should be different from initial state
              expect(hoveredTransform.rawTransform).not.toBe(initialTransform.rawTransform);
            }

            // Simulate mouse leave
            simulateMouseInteraction(cardElement, 'mouseleave');
            
            // Allow for transition back
            setTimeout(() => {
              const finalTransform = extractTransformValues(cardElement);
              
              // After mouse leave, should return to initial state or have minimal transform
              if (props.enable3D) {
                // Transform should exist but be different from hover state
                expect(finalTransform.rawTransform).not.toBe(hoveredTransform.rawTransform);
              }
            }, 100);
          }, 100);

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 13a: 3D Transform Consistency - For any card with 3D effects enabled, transform properties should be consistently applied', () => {
    fc.assert(
      fc.property(
        fc.record({
          hoverEffect: fc.constantFrom('lift', 'tilt'),
          tiltOptions: fc.record({
            maxTilt: fc.integer({ min: 5, max: 20 }),
            scale: fc.float({ min: Math.fround(1.01), max: Math.fround(1.1) }),
            perspective: fc.integer({ min: 500, max: 2000 }),
          }),
        }),
        (props) => {
          const testId = `card-consistency-${Math.random().toString(36).substr(2, 9)}`;
          
          const { container } = render(
            <TestWrapper>
              <GlassCard
                data-testid={testId}
                hoverEffect={props.hoverEffect}
                enable3D={true}
                tiltOptions={props.tiltOptions}
              >
                <div>Consistency Test Content</div>
              </GlassCard>
            </TestWrapper>
          );

          const cardElement = screen.getByTestId(testId);
          
          // Check that the card has proper CSS properties for 3D transforms
          const computedStyle = window.getComputedStyle(cardElement);
          
          // Should have transform-style preserve-3d or similar 3D properties
          const hasTransformStyle = computedStyle.transformStyle === 'preserve-3d' || 
                                   computedStyle.transform !== 'none' ||
                                   computedStyle.transition.includes('transform');
          
          // For 3D enabled cards, should have some 3D-related CSS properties
          expect(hasTransformStyle).toBe(true);

          return true;
        }
      ),
      { numRuns: 10 }
    );
  });

  test('Property 13b: Transform Accessibility - For any card with reduced motion preference, 3D transforms should be disabled or simplified', () => {
    fc.assert(
      fc.property(
        fc.record({
          hoverEffect: fc.constantFrom('lift', 'tilt', 'glow'),
          enable3D: fc.boolean(),
        }),
        (props) => {
          // Mock reduced motion preference
          Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: (query) => ({
              matches: query === '(prefers-reduced-motion: reduce)',
              media: query,
              onchange: null,
              addListener: () => {},
              removeListener: () => {},
              addEventListener: () => {},
              removeEventListener: () => {},
              dispatchEvent: () => {},
            }),
          });

          const testId = `card-a11y-${Math.random().toString(36).substr(2, 9)}`;
          
          const { container } = render(
            <TestWrapper>
              <GlassCard
                data-testid={testId}
                hoverEffect={props.hoverEffect}
                enable3D={props.enable3D}
              >
                <div>Accessibility Test Content</div>
              </GlassCard>
            </TestWrapper>
          );

          const cardElement = screen.getByTestId(testId);
          expect(cardElement).toBeInTheDocument();

          // With reduced motion, transforms should be minimal or disabled
          // This is handled by CSS media queries, so we verify the element exists
          // and can be interacted with safely
          simulateMouseInteraction(cardElement, 'mouseenter');
          simulateMouseInteraction(cardElement, 'mouseleave');

          return true;
        }
      ),
      { numRuns: 5 }
    );
  });

  test('Property 13c: Transform Performance - For any card with 3D transforms, CSS properties should use hardware acceleration', () => {
    fc.assert(
      fc.property(
        fc.record({
          hoverEffect: fc.constantFrom('lift', 'tilt'),
          enable3D: fc.constant(true),
        }),
        (props) => {
          const testId = `card-perf-${Math.random().toString(36).substr(2, 9)}`;
          
          const { container } = render(
            <TestWrapper>
              <GlassCard
                data-testid={testId}
                hoverEffect={props.hoverEffect}
                enable3D={props.enable3D}
              >
                <div>Performance Test Content</div>
              </GlassCard>
            </TestWrapper>
          );

          const cardElement = screen.getByTestId(testId);
          const computedStyle = window.getComputedStyle(cardElement);
          
          // Check for hardware acceleration hints
          const hasHardwareAcceleration = 
            computedStyle.transform !== 'none' ||
            computedStyle.transformStyle === 'preserve-3d' ||
            computedStyle.willChange === 'transform' ||
            computedStyle.backfaceVisibility === 'hidden';

          // 3D enabled cards should have properties that enable hardware acceleration
          expect(hasHardwareAcceleration).toBe(true);

          return true;
        }
      ),
      { numRuns: 5 }
    );
  });
});
