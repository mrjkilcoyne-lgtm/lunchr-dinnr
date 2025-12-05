import React from 'react';

interface SliderControlProps {
  label: string;
  leftLabel: string;
  rightLabel: string;
  value: number;
  onChange: (val: number) => void;
  icon: React.ReactNode;
}

export const SliderControl: React.FC<SliderControlProps> = ({ 
  label, leftLabel, rightLabel, value, onChange, icon 
}) => {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <span className="flex items-center gap-2 font-bold text-sm text-slate-300">
          {icon} {label}
        </span>
        <span className="text-xs font-mono text-purple-400 bg-purple-900/30 px-3 py-1 rounded-full border border-purple-500/30">
          {value}%
        </span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={value} 
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-3 bg-slate-800 rounded-full appearance-none cursor-pointer slider-custom"
        style={{
          background: `linear-gradient(to right, 
            rgb(168, 85, 247) 0%, 
            rgb(236, 72, 153) ${value}%, 
            rgb(30, 41, 59) ${value}%, 
            rgb(30, 41, 59) 100%)`
        }}
      />
      <div className="flex justify-between mt-2 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
      
      <style>{`
        .slider-custom::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(168, 85, 247), rgb(236, 72, 153));
          cursor: pointer;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
          border: 2px solid white;
        }
        .slider-custom::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgb(168, 85, 247), rgb(236, 72, 153));
          cursor: pointer;
          box-shadow: 0 0 10px rgba(168, 85, 247, 0.5);
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
};
