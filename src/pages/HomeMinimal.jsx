import React from 'react';

const HomeMinimal = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #7C3AED 0%, #8B5CF6 50%, #0F0F23 100%)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '800px' }}>
        <h1 style={{ 
          fontSize: '4rem', 
          fontWeight: 'bold', 
          marginBottom: '2rem',
          background: 'linear-gradient(90deg, #A855F7, #EC4899)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Crypto Payment
        </h1>
        <h2 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '2rem' }}>
          made simple
        </h2>
        <p style={{ fontSize: '1.5rem', marginBottom: '3rem', opacity: 0.8 }}>
          Experience the future of digital payments
        </p>
        <button style={{
          background: 'linear-gradient(45deg, #7C3AED, #8B5CF6)',
          color: 'white',
          padding: '15px 30px',
          borderRadius: '25px',
          border: 'none',
          fontSize: '1.2rem',
          cursor: 'pointer',
          boxShadow: '0 10px 25px rgba(124, 58, 237, 0.3)'
        }}>
          Start my approval
        </button>
      </div>
    </div>
  );
};

export default HomeMinimal;