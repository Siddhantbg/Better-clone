import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AnimatedText, TypewriterText, GlitchText, EnhancedAnimatedText } from '../components/ReactBitsText';

describe('AnimatedText Component', () => {
  it('renders children correctly', () => {
    render(<AnimatedText>Test Content</AnimatedText>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<AnimatedText className="custom-class">Test Content</AnimatedText>);
    const element = screen.getByText('Test Content');
    expect(element).toHaveClass('custom-class');
  });

  it('applies transition classes', () => {
    render(<AnimatedText>Test Content</AnimatedText>);
    const element = screen.getByText('Test Content');
    expect(element).toHaveClass('transition-all');
  });

  it('applies correct animation type classes initially', () => {
    render(<AnimatedText animationType="fadeInLeft">Test Content</AnimatedText>);
    const element = screen.getByText('Test Content');
    expect(element).toHaveClass('opacity-0');
  });
});

describe('TypewriterText Component', () => {
  it('renders with correct className', () => {
    render(<TypewriterText text="Hello" className="typewriter-class" />);
    const element = screen.getByText('', { selector: 'span' });
    expect(element).toHaveClass('typewriter-class');
  });

  it('handles empty text gracefully', () => {
    render(<TypewriterText text="" />);
    const element = screen.getByText('', { selector: 'span' });
    expect(element).toBeInTheDocument();
  });

  it('accepts speed and delay props', () => {
    render(<TypewriterText text="Test" speed={100} delay={200} />);
    const element = screen.getByText('', { selector: 'span' });
    expect(element).toBeInTheDocument();
  });

  it('accepts onComplete callback prop', () => {
    const onComplete = vi.fn();
    render(<TypewriterText text="Hi" onComplete={onComplete} />);
    const element = screen.getByText('', { selector: 'span' });
    expect(element).toBeInTheDocument();
  });
});

describe('GlitchText Component', () => {
  it('renders children correctly', () => {
    render(<GlitchText>Glitch Text</GlitchText>);
    expect(screen.getByText('Glitch Text')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<GlitchText className="glitch-class">Test</GlitchText>);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('glitch-class');
  });

  it('applies relative positioning class', () => {
    render(<GlitchText>Test</GlitchText>);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('relative', 'inline-block');
  });

  it('accepts intensity prop', () => {
    render(<GlitchText intensity="high">High Intensity</GlitchText>);
    const element = screen.getAllByText('High Intensity')[0];
    expect(element).toBeInTheDocument();
  });

  it('accepts trigger prop', () => {
    render(<GlitchText trigger="click">Click Text</GlitchText>);
    const element = screen.getByText('Click Text');
    expect(element).toBeInTheDocument();
  });
});

describe('EnhancedAnimatedText Component', () => {
  it('renders children correctly', () => {
    render(<EnhancedAnimatedText>Enhanced Text</EnhancedAnimatedText>);
    expect(screen.getByText('Enhanced Text')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<EnhancedAnimatedText className="enhanced-class">Test</EnhancedAnimatedText>);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('enhanced-class');
  });

  it('handles string children for word splitting', () => {
    render(<EnhancedAnimatedText splitBy="word" stagger={100}>Hello World</EnhancedAnimatedText>);
    
    // Should create separate spans for each word/character
    const hSpan = screen.getByText('H');
    const eSpan = screen.getByText('e');
    expect(hSpan).toBeInTheDocument();
    expect(eSpan).toBeInTheDocument();
  });

  it('applies transition classes', () => {
    render(<EnhancedAnimatedText>Test</EnhancedAnimatedText>);
    const element = screen.getByText('Test');
    expect(element).toHaveClass('transition-all');
  });

  it('accepts animation prop', () => {
    render(<EnhancedAnimatedText animation="scale">Scale Text</EnhancedAnimatedText>);
    const element = screen.getByText('Scale Text');
    expect(element).toBeInTheDocument();
  });
});

describe('React Bits Text Integration', () => {
  it('components work together in complex layouts', () => {
    render(
      <div>
        <AnimatedText>
          <GlitchText intensity="low">
            Animated Glitch
          </GlitchText>
        </AnimatedText>
        <TypewriterText text="Typewriter" />
      </div>
    );
    
    // Both components should render
    expect(screen.getByText('Animated Glitch')).toBeInTheDocument();
    expect(screen.getByText('', { selector: 'span' })).toBeInTheDocument();
  });

  it('maintains accessibility with proper text content', () => {
    render(
      <AnimatedText>
        <GlitchText>
          Accessible Text
        </GlitchText>
      </AnimatedText>
    );
    
    // Text should be accessible to screen readers
    expect(screen.getByText('Accessible Text')).toBeInTheDocument();
  });

  it('handles nested components correctly', () => {
    render(
      <EnhancedAnimatedText>
        <AnimatedText>
          Nested Components
        </AnimatedText>
      </EnhancedAnimatedText>
    );
    
    expect(screen.getByText('Nested Components')).toBeInTheDocument();
  });

  it('applies CSS classes correctly across components', () => {
    render(
      <div>
        <AnimatedText className="animated-class">Animated</AnimatedText>
        <GlitchText className="glitch-class">Glitch</GlitchText>
        <TypewriterText text="Type" className="type-class" />
      </div>
    );
    
    expect(screen.getByText('Animated')).toHaveClass('animated-class');
    expect(screen.getByText('Glitch')).toHaveClass('glitch-class');
    expect(screen.getByText('', { selector: 'span' })).toHaveClass('type-class');
  });
});
