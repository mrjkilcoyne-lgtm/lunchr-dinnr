import React from 'react';
import { Share2, Sparkles, X } from 'lucide-react';
import { AuraVisual } from './AuraVisual';
import { ScentProfile, Provenance } from '../types';

interface ResultProps {
  values: ScentProfile;
  provenance: Provenance;
  label: string;
  description: string;
  onReset: () => void;
  uploadedImage: string | null;
}

export const Result: React.FC<ResultProps> = ({ 
  values, provenance, label, description, onReset, uploadedImage 
}) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-950 relative overflow-hidden">
      <button 
        onClick={onReset}
        className="absolute top-6 right-6 z-50 p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white"
      >
        <X size={24} />
      </button>

      {/* Background Aura (Expanded) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none blur-3xl scale-150">
        <AuraVisual profile={values} provenance={provenance} size="large" />
      </div>

      <div className="z-10 flex flex-col items-center w-full max-w-sm">
        <h2 className="text-sm font-mono text-slate-400 mb-6 tracking-widest uppercase">Identity Generated</h2>
        
        {/* The Main Card to Share */}
        <div className="w-full aspect-[4/5] bg-slate-900/90 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 flex flex-col items-center justify-between shadow-2xl relative overflow-hidden group">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-600/20 rounded-full blur-3xl"></div>
          
          {/* Visual */}
          <div className="w-48 h-48 relative flex items-center justify-center mt-8">
            <AuraVisual profile={values} provenance={provenance} size="medium" />
            <div className="absolute z-20 group-hover:scale-105 transition-transform duration-500">
              {uploadedImage ? (
                <img src={uploadedImage} alt="scanned" className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-xl" />
              ) : (
                <div className="text-6xl">🍊</div>
              )}
            </div>
          </div>

          {/* Data */}
          <div className="text-center space-y-2 mb-8 relative z-20 w-full px-2">
            <h1 className="text-3xl font-black text-white tracking-tight">{label}</h1>
            <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
              {provenance === 'Local/Wild' && (
                <span className="bg-green-900/50 text-green-400 border border-green-700/50 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                  <Sparkles size={10} /> Wild Harvest
                </span>
              )}
              <span className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide">
                {values.intensity > 70 ? '⚡ High Volatility' : '🌊 Low Volatility'}
              </span>
            </div>
            
            {/* Scent Profile Bars */}
            <div className="mt-6 space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-20 text-left text-slate-500">Sweet</span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                    style={{ width: `${values.sweetness}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 text-left text-slate-500">Warm</span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                    style={{ width: `${values.warmth}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-20 text-left text-slate-500">Sharp</span>
                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                    style={{ width: `${values.texture}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            {description && (
              <div className="mt-6 pt-6 border-t border-slate-700/50">
                <p className="text-xs text-slate-300 italic font-medium leading-relaxed">
                  "{description}"
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="w-full flex justify-between items-center text-xs text-slate-500 border-t border-slate-800 pt-4">
            <span className="font-bold">FOOD-E</span>
            <span className="font-mono">#{Math.floor(Math.random() * 9999).toString().padStart(4, '0')}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 w-full mt-8">
          <button 
            onClick={onReset}
            className="flex-1 py-4 rounded-2xl bg-slate-800 text-slate-300 font-bold text-sm hover:bg-slate-700 transition-colors"
          >
            Scan Another
          </button>
          <button className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-purple-900/40">
            Share <Share2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};