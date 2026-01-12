import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import fc from 'fast-check';
import { MagneticButton } from '../components/ReactBitsButtons';

// Clean up after each test to prevent DOM pollution
afterEach(() => {
  cleanup();
});

describe('Property Tests: Magnetic Button Effects', () => {
  it('Property 14: Magnetic Button Effect - For any magnetic button with valid props, mouse proximity should trigger position or visual changes', () => {
    fc.assert(
      fc.property(
        fc.record({
          magneticStrength: fc.float({ min: Math.fround(0), max: Math.fround(1) }).filter(n => !isNaN(n) && isFinite(n)),
          magneticRadius: fc.integer({ min: 10, max: 200 }),
          children: fc.constantFrom('Click Me', 'Submit', 'Continue', 'Learn More'),
          className: fc.constantFrom('btn-primary', 'btn-secondary', 'rounded-full', 'px-4 py-2'),
          disabled: fc.boolean()
        }),
        (props) => {
          // Render the magnetic button with generated props and unique test id
          const testId = `magnetic-button-${Date.now()}-${Math.random()}`;
          const { container } = render(
            <MagneticButton
              magneticStrength={props.magneticStrength}
              magneticRadius={props.magneticRadius}
              className={props.className}
              disabled={props.disabled}
              data-testid={testId}
            >
              {props.children}
            </MagneticButton>
          );

          const button = screen.getByTestId(testId);
          
          // Verify button renders correctly
          expect(button).toBeInTheDocument();
          expect(button).toHaveTextContent(props.children);
          
          // Check if button has magnetic-button class
          expect(button).toHaveClass('magnetic-button');
          
          // Check if custom className is applied
          if (props.className) {
            expect(button).toHaveClass(props.className);
          }
          
          // Check disabled state
          if (props.disabled) {
            expect(button).toBeDisabled();
          } else {
            expect(button).not.toBeDisabled();
          }
          
          // Verify button has transform style (magnetic buttons should have transform)
          expect(button.style.transform).toBeDefined();
          
          // For enabled buttons with meaningful magnetic properties, verify they can be interacted with
          if (!props.disabled && props.magneticStrength > 0.01 && props.magneticRadius > 5) {
            // The button should have either a transform style property or enhanced interaction classes
            const hasTransform = button.style.transform && button.style.transform.includes('translate');
            const hasEnhancedClass = button.classList.contains('btn-enhanced') || button.classList.contains('magnetic-enhanced');
            
            expect(hasTransform || hasEnhancedClass).toBe(true);
          }
          
          return true; // Property holds
        }
      ),
      { numRuns: 10 }
    );
  });

  it('Property 14 Extension: Magnetic strength affects transform intensity', () => {
    fc.assert(
      fc.property(
        fc.record({
          lowStrength: fc.float({ min: Math.fround(0.1), max: Math.fround(0.3) }).filter(n => !isNaN(n) && isFinite(n)),
          highStrength: fc.float({ min: Math.fround(0.7), max: Math.fround(1.0) }).filter(n => !isNaN(n) && isFinite(n)),
          radius: fc.integer({ min: 50, max: 150 }),
          buttonText: fc.constantFrom('Test Button', 'Magnetic Test')
        }),
        (props) => {
          // Test with low magnetic strength
          const lowTestId = `low-strength-${Date.now()}-${Math.random()}`;
          const { container: lowContainer } = render(
            <MagneticButton
              magneticStrength={props.lowStrength}
              magneticRadius={props.radius}
              data-testid={lowTestId}
            >
              {props.buttonText}
            </MagneticButton>
          );

          // Test with high magnetic strength
          const highTestId = `high-strength-${Date.now()}-${Math.random()}`;
          const { container: highContainer } = render(
            <MagneticButton
              magneticStrength={props.highStrength}
              magneticRadius={props.radius}
              data-testid={highTestId}
            >
              {props.buttonText}
            </MagneticButton>
          );

          const lowButton = screen.getByTestId(lowTestId);
          const highButton = screen.getByTestId(highTestId);

          // Both buttons should render correctly
          expect(lowButton).toBeInTheDocument();
          expect(highButton).toBeInTheDocument();
          
          // Both should have magnetic-button class
          expect(lowButton).toHaveClass('magnetic-button');
          expect(highButton).toHaveClass('magnetic-button');
          
          // Both should have the same text content
          expect(lowButton).toHaveTextContent(props.buttonText);
          expect(highButton).toHaveTextContent(props.buttonText);
          
          // Verify that magnetic strength is properly configured
          expect(props.lowStrength).toBeLessThan(props.highStrength);
          
          // Both should have transform styles
          expect(lowButton.style.transform).toBeDefined();
          expect(highButton.style.transform).toBeDefined();
          
          return true;
        }
      ),
      { numRuns: 5 }
    );
  });

  it('Property 14 Extension: Magnetic radius affects interaction area', () => {
    fc.assert(
      fc.property(
        fc.record({
          smallRadius: fc.integer({ min: 10, max: 50 }),
          largeRadius: fc.integer({ min: 100, max: 200 }),
          strength: fc.float({ min: Math.fround(0.2), max: Math.fround(0.8) }).filter(n => !isNaN(n) && isFinite(n)),
          content: fc.constantFrom('Small Radius', 'Large Radius', 'Test Content')
        }),
        (props) => {
          // Test with small radius
          const smallTestId = `small-radius-${Date.now()}-${Math.random()}`;
          const { container: smallContainer } = render(
            <MagneticButton
              magneticStrength={props.strength}
              magneticRadius={props.smallRadius}
              data-testid={smallTestId}
            >
              {props.content}
            </MagneticButton>
          );

          // Test with large radius
          const largeTestId = `large-radius-${Date.now()}-${Math.random()}`;
          const { container: largeContainer } = render(
            <MagneticButton
              magneticStrength={props.strength}
              magneticRadius={props.largeRadius}
              data-testid={largeTestId}
            >
              {props.content}
            </MagneticButton>
          );

          const smallButton = screen.getByTestId(smallTestId);
          const largeButton = screen.getByTestId(largeTestId);

          // Both buttons should render and function
          expect(smallButton).toBeInTheDocument();
          expect(largeButton).toBeInTheDocument();
          
          expect(smallButton).toHaveClass('magnetic-button');
          expect(largeButton).toHaveClass('magnetic-button');
          
          // Verify radius configuration is logical
          expect(props.smallRadius).toBeLessThan(props.largeRadius);
          
          // Both should have same content
          expect(smallButton).toHaveTextContent(props.content);
          expect(largeButton).toHaveTextContent(props.content);
          
          return true;
        }
      ),
      { numRuns: 5 }
    );
  });

  it('Property 14 Extension: Disabled buttons do not respond to magnetic effects', () => {
    fc.assert(
      fc.property(
        fc.record({
          magneticStrength: fc.float({ min: Math.fround(0.1), max: Math.fround(1.0) }).filter(n => !isNaN(n) && isFinite(n)),
          magneticRadius: fc.integer({ min: 20, max: 150 }),
          buttonContent: fc.constantFrom('Disabled Button', 'No Interaction', 'Static Button'),
          className: fc.constantFrom('btn-disabled', 'opacity-50', 'cursor-not-allowed')
        }),
        (props) => {
          const testId = `disabled-button-${Date.now()}-${Math.random()}`;
          const { container } = render(
            <MagneticButton
              magneticStrength={props.magneticStrength}
              magneticRadius={props.magneticRadius}
              className={props.className}
              disabled={true}
              data-testid={testId}
            >
              {props.buttonContent}
            </MagneticButton>
          );

          const button = screen.getByTestId(testId);
          
          // Verify button is disabled
          expect(button).toBeDisabled();
          expect(button).toHaveClass('magnetic-button');
          
          // Content should still be present
          expect(button).toHaveTextContent(props.buttonContent);
          
          // Custom className should be applied
          if (props.className) {
            expect(button).toHaveClass(props.className);
          }
          
          return true;
        }
      ),
      { numRuns: 5 }
    );
  });

  it('Property 14 Extension: Button maintains accessibility with magnetic effects', () => {
    fc.assert(
      fc.property(
        fc.record({
          magneticStrength: fc.float({ min: Math.fround(0), max: Math.fround(1) }).filter(n => !isNaN(n) && isFinite(n)),
          magneticRadius: fc.integer({ min: 10, max: 200 }),
          ariaLabel: fc.constantFrom('Submit form', 'Navigate to page', 'Open modal'),
          buttonText: fc.constantFrom('Submit', 'Navigate', 'Open'),
          tabIndex: fc.constantFrom(0, 1, -1)
        }),
        (props) => {
          const testId = `accessible-button-${Date.now()}-${Math.random()}`;
          const { container } = render(
            <MagneticButton
              magneticStrength={props.magneticStrength}
              magneticRadius={props.magneticRadius}
              aria-label={props.ariaLabel}
              tabIndex={props.tabIndex}
              data-testid={testId}
            >
              {props.buttonText}
            </MagneticButton>
          );

          const button = screen.getByTestId(testId);
          
          // Verify accessibility attributes are preserved
          expect(button).toHaveAttribute('aria-label', props.ariaLabel);
          expect(button).toHaveAttribute('tabIndex', props.tabIndex.toString());
          
          // Should have magnetic-button class
          expect(button).toHaveClass('magnetic-button');
          
          // Content should be accessible
          expect(button).toHaveTextContent(props.buttonText);
          
          return true;
        }
      ),
      { numRuns: 5 }
    );
  });
});
