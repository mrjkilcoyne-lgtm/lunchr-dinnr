import React from 'react';
import { ScentProfile, Provenance } from '../types';

interface AuraVisualProps {
  profile: ScentProfile;
  provenance: Provenance;
  size?: 'small' | 'medium' | 'large';
}

export const AuraVisual: React.FC<AuraVisualProps> = ({ profile, provenance, size = 'small' }) => {
  // Color Mapping logic
  let color1, color2;
  
  if (profile.warmth > 70) {
    color1 = profile.texture > 50 ? '#ef4444' : '#fb923c'; // Red/Orange
  } else if (profile.warmth < 30) {
    color1 = profile.texture > 50 ? '#22d3ee' : '#3b82f6'; // Cyan/Blue
  } else {
    color1 = '#8b5cf6'; // Violet
  }

  color2 = profile.sweetness > 60 ? '#f472b6' : '#a3e635'; // Pink/Lime

  // Shape Mapping (Texture determines border radius)
  const borderRadius = profile.texture > 70 
    ? '30% 70% 70% 30% / 30% 30% 70% 70%' // Spiky/Sharp
    : profile.texture > 40 
      ? '40% 60% 60% 40% / 60% 40% 60% 40%' // Balanced
      : '50%'; // Round/Creamy
  
  // Animation Speed based on Intensity
  const animSpeed = `${Math.max(0.5, 3 - (profile.intensity / 40))}s`;
  
  // Visual Filters based on Provenance
  const filter = provenance === 'Local/Wild' ? 'contrast(1.3) brightness(1.2) saturate(1.2)' : 'none';

  const sizeClass = size === 'small' ? 'w-full h-full' : size === 'medium' ? 'w-40 h-40' : 'w-80 h-80';
  const blurAmount = size === 'small' ? '8px' : size === 'medium' ? '20px' : '50px';
  const secondaryBlur = size === 'small' ? '12px' : size === 'medium' ? '30px' : '70px';

  return (
    <div className={`${sizeClass} relative flex items-center justify-center`}>
      {/* Main Core */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${color1}, ${color2})`,
          borderRadius: borderRadius,
          filter: `blur(${blurAmount}) ${filter}`,
          animation: `pulse ${animSpeed} infinite alternate`,
          opacity: 0.9
        }}
      />
      
      {/* Secondary Layer for Depth */}
      <div 
        className="absolute inset-0 transition-all duration-1000 ease-out"
        style={{
          background: `radial-gradient(circle at 70% 70%, ${color2}, transparent)`,
          borderRadius: borderRadius,
          filter: `blur(${secondaryBlur})`,
          animation: `pulse ${animSpeed} infinite alternate-reverse`,
          opacity: 0.5,
          animationDelay: '0.3s'
        }}
      />
      
      {/* The "Wild" Factor - Extra Layer for provenance */}
      {provenance === 'Local/Wild' && (
        <div 
          className="absolute inset-0 border-2 border-white/20 opacity-50"
          style={{ 
            borderRadius: borderRadius,
            borderStyle: 'dashed',
            animation: 'spin-slow 8s linear infinite'
          }} 
        />
      )}
      
      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(1.1); opacity: 1; }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
