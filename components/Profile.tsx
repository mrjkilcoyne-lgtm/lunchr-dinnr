import React from 'react';
import { Camera, Heart, Sparkles } from 'lucide-react';

interface ProfileProps {
  archetype: string | null;
}

export const Profile: React.FC<ProfileProps> = ({ archetype }) => {
  const stats = [
    { label: 'Scans', value: '47', icon: <Camera size={16} /> },
    { label: 'Following', value: '123', icon: <Heart size={16} /> },
    { label: 'Followers', value: '891', icon: <Sparkles size={16} /> }
  ];

  return (
    <div className="min-h-full">
      {/* Profile Header */}
      <div className="relative h-40 bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-b border-slate-800">
        <div className="absolute inset-0 opacity-30">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-purple-500"
              style={{
                width: Math.random() * 60 + 20,
                height: Math.random() * 60 + 20,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                filter: 'blur(30px)'
              }}
            />
          ))}
        </div>
      </div>

      <div className="px-6 pb-6">
        {/* Avatar */}
        <div className="relative -mt-16 mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-6xl border-4 border-slate-900 shadow-xl">
            👤
          </div>
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-900"></div>
        </div>

        {/* User Info */}
        <div className="mb-6">
          <h1 className="text-2xl font-black text-white mb-2">YourUsername</h1>
          <p className="text-purple-400 font-bold text-sm mb-3 border border-purple-500/30 bg-purple-500/10 px-3 py-1 rounded-full inline-block">
            {archetype || 'GUEST'}
          </p>
          <p className="text-slate-400 text-sm leading-relaxed mt-2">
            Exploring the world one scent at a time. 🌍✨
            <br/>Truffle enthusiast • Fermentation nerd • Local forager
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center p-4 bg-slate-800/50 border border-slate-700/50 rounded-2xl">
              <div className="flex justify-center mb-2 text-purple-400">
                {stat.icon}
              </div>
              <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs text-slate-500 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-2xl hover:scale-105 transition-transform shadow-lg shadow-purple-900/20">
            Edit Profile
          </button>
          <button className="w-full bg-slate-800/50 border border-slate-700 text-slate-300 font-bold py-4 rounded-2xl hover:bg-slate-700/50 transition-colors">
            Share Profile
          </button>
        </div>

        {/* Recent Scans Preview */}
        <div className="mt-8">
          <h2 className="text-lg font-black mb-4 text-slate-200">Recent Scans</h2>
          <div className="grid grid-cols-3 gap-3">
            {['🍊', '🍄', '🌶️', '🍦', '🧀', '🍇'].map((emoji, idx) => (
              <div 
                key={idx}
                className="aspect-square bg-slate-800/50 border border-slate-700/50 rounded-2xl flex items-center justify-center text-4xl hover:scale-105 transition-transform cursor-pointer"
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
