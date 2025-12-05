import React, { useState } from 'react';

interface OnboardingProps {
  onComplete: (arch: string) => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const handleCilantro = () => {
    setStep(1);
  };

  const handleComfort = (choice: string) => {
    const archetype = choice === 'Savory' ? 'UMAMI HUNTER' : 'SWEET SEEKER';
    onComplete(archetype);
  };

  return (
    <div className="h-full flex flex-col p-8 items-center justify-center text-center relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-purple-500"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
              filter: 'blur(40px)'
            }}
          />
        ))}
      </div>

      {step === 0 && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 w-full relative z-10">
          <div className="text-8xl mb-8 animate-float">🌿</div>
          <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">The Cilantro Test</h2>
          <p className="text-slate-400 mb-10 text-sm leading-relaxed max-w-sm mx-auto">
            We need to calibrate your sensors. When you eat fresh cilantro, what do you taste?
          </p>
          <div className="flex gap-4 w-full justify-center">
            <button 
              onClick={handleCilantro} 
              className="bg-gradient-to-br from-emerald-900/50 to-green-900/50 border-2 border-emerald-500/50 p-6 rounded-2xl flex-1 hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 transition-all group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">😋</div>
              <div className="font-bold text-emerald-400 text-sm">Fresh & Zesty</div>
              <div className="text-xs text-emerald-500/60 mt-1">Normal gene</div>
            </button>
            <button 
              onClick={handleCilantro} 
              className="bg-gradient-to-br from-pink-900/50 to-purple-900/50 border-2 border-pink-500/50 p-6 rounded-2xl flex-1 hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/20 transition-all group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🧼</div>
              <div className="font-bold text-pink-400 text-sm">Literally Soap</div>
              <div className="text-xs text-pink-500/60 mt-1">OR6A2 variant</div>
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 w-full relative z-10">
          <div className="text-8xl mb-8 animate-float" style={{ animationDelay: '0.5s' }}>🍽️</div>
          <h2 className="text-3xl font-black mb-4 bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Comfort Food</h2>
          <p className="text-slate-400 mb-10 text-sm leading-relaxed max-w-sm mx-auto">
            When you need comfort, what calls to you?
          </p>
          <div className="flex flex-col gap-4 w-full max-w-xs mx-auto">
            <button 
              onClick={() => handleComfort('Savory')}
              className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border-2 border-orange-500/50 p-5 rounded-2xl hover:border-orange-400 hover:shadow-lg hover:shadow-orange-500/20 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl group-hover:scale-110 transition-transform">🍜</div>
                <div className="text-left flex-1">
                  <div className="font-bold text-orange-400">Savory & Umami</div>
                  <div className="text-xs text-orange-500/60">Ramen, cheese, MSG</div>
                </div>
              </div>
            </button>
            <button 
              onClick={() => handleComfort('Sweet')}
              className="bg-gradient-to-r from-pink-900/50 to-purple-900/50 border-2 border-pink-500/50 p-5 rounded-2xl hover:border-pink-400 hover:shadow-lg hover:shadow-pink-500/20 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl group-hover:scale-110 transition-transform">🍰</div>
                <div className="text-left flex-1">
                  <div className="font-bold text-pink-400">Sweet & Rich</div>
                  <div className="text-xs text-pink-500/60">Chocolate, pastries, ice cream</div>
                </div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
