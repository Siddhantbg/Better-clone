import Orb from './Orb';

const OrbDemo = () => {
  return (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <Orb
        hoverIntensity={0.5}
        rotateOnHover={true}
        hue={0}
        forceHoverState={false}
      />
    </div>
  );
};

export default OrbDemo;