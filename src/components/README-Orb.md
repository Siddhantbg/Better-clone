# Orb Component

A beautiful, interactive WebGL orb component built with OGL (OpenGL library) that creates stunning visual effects.

## Features

- **Interactive**: Responds to mouse hover with smooth animations
- **Customizable**: Adjustable hue, hover intensity, and rotation
- **WebGL Powered**: High-performance rendering using OGL
- **Responsive**: Automatically adapts to container size

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `hue` | number | 0 | Color hue in degrees (0-360) |
| `hoverIntensity` | number | 0.2 | Intensity of hover effects (0-1) |
| `rotateOnHover` | boolean | true | Whether to rotate on hover |
| `forceHoverState` | boolean | false | Force hover state always on |
| `backgroundColor` | string | '#000000' | Background color (hex, rgb, hsl) |

## Usage Examples

### Basic Usage
```jsx
import Orb from './components/Orb';

<Orb />
```

### Customized Orb
```jsx
<Orb
  hue={280}
  hoverIntensity={0.5}
  rotateOnHover={true}
  backgroundColor="#591c76"
/>
```

### As Background Element
```jsx
<div className="relative">
  <div className="absolute inset-0 opacity-30">
    <Orb hue={120} forceHoverState={true} />
  </div>
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</div>
```

## Integration in Landing Page

The Orb component has been integrated into the KrizPay landing page in two locations:

1. **Hero Section**: Purple-themed orb as background effect behind the main heading
2. **BentoGrid Section**: Green-themed orb in the top-right corner for visual interest

## Dependencies

- `ogl`: WebGL library for rendering
- `react`: For component lifecycle and refs

## Performance Notes

- Uses requestAnimationFrame for smooth animations
- Automatically handles WebGL context cleanup
- Responsive to window resize events
- Optimized for 60fps performance