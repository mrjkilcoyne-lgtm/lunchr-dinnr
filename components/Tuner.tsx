import React, { useState } from 'react';
import { Wind, Zap, Droplet, Check, PenTool, Mic, StopCircle } from 'lucide-react';
import { ScentProfile, Provenance } from '../types';
import { AuraVisual } from './AuraVisual';
import { SliderControl } from './SliderControl';

interface TunerProps {
  initialLabel: string;
  onComplete: () => void;
  values: ScentProfile;
  setValues: (val: ScentProfile) => void;
  provenance: Provenance;
  setProvenance: (prov: Provenance) => void;
  refinedLabel: string;
  setRefinedLabel: (lbl: string) => void;
  isSuperDescriber: boolean;
  setIsSuperDescriber: (is: boolean) => void;
  description: string;
  setDescription: (desc: string) => void;
  uploadedImage: string | null;
  isAnalyzing: boolean;
}

export const Tuner: React.FC<TunerProps> = ({ 
  initialLabel, 
  onComplete, 
  values, 
  setValues, 
  provenance, 
  setProvenance, 
  refinedLabel, 
  setRefinedLabel,
  isSuperDescriber,
  setIsSuperDescriber,
  description,
  setDescription,
  uploadedImage,
  isAnalyzing
}) => {
  const [isListening, setIsListening] = useState(false);

  const update = (key: keyof ScentProfile, value: number) => {
    setValues({ ...values, [key]: value });
  };

  const toggleDictation = () => {
    if (isListening) {
      setIsListening(false);
      // Logic handled by onend usually, but we force stop here
      // Note: Actual SpeechRecognition instance management is simplified here for React state
      return; 
    }

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setDescription(description ? `${description} ${transcript}` : transcript);
      };

      recognition.start();
    } else {
      alert("Dictation is not supported in this browser. Please try Chrome or Safari.");
    }
  };

  if (isAnalyzing) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-slate-950 p-8 text-center space-y-6">
        <div className="relative w-32 h-32">
           <div className="absolute inset-0 bg-purple-500 rounded-full animate-ping opacity-20"></div>
           <div className="absolute inset-0 border-4 border-t-purple-500 border-r-pink-500 border-b-orange-500 border-l-transparent rounded-full animate-spin"></div>
           {uploadedImage && <img src={uploadedImage} className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] rounded-full object-cover opacity-50" />}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Consulting the Oracle...</h2>
          <p className="text-slate-400 text-sm">Gemini is analyzing the texture, provenance, and flavor profile of your image.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-slate-950">
      {/* Live Preview */}
      <div className="p-8 border-b border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="relative h-48 flex items-center justify-center">
          <AuraVisual profile={values} provenance={provenance} size="medium" />
          <div className="absolute z-20">
            {uploadedImage ? (
              <img src={uploadedImage} alt="scanned" className="w-20 h-20 rounded-full object-cover border-4 border-white/20 shadow-lg" />
            ) : (
              <span className="text-6xl">🍊</span>
            )}
          </div>
        </div>
        <div className="text-center mt-4 relative z-10">
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">Live Preview</p>
          <p className="text-sm text-slate-400">Adjust sliders to match your perception</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar pb-32">
        {/* Label Correction */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-300">Detected: {refinedLabel || initialLabel}</span>
            <button 
              onClick={() => setIsSuperDescriber(!isSuperDescriber)}
              className={`text-xs px-3 py-1 rounded-full font-bold transition-all ${
                isSuperDescriber 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-slate-800 text-slate-500 hover:bg-slate-700'
              }`}
            >
              {isSuperDescriber ? 'Done' : 'Edit Name'}
            </button>
          </div>
          {isSuperDescriber && (
            <input 
              value={refinedLabel}
              onChange={(e) => setRefinedLabel(e.target.value)}
              placeholder="Enter more specific name..."
              className="w-full bg-slate-800 text-slate-200 px-4 py-3 rounded-xl border border-slate-700 focus:outline-none focus:border-purple-500 transition-colors text-sm placeholder:text-slate-600"
            />
          )}
        </div>

        {/* Provenance Toggle */}
        <div className="space-y-2">
          <div className="font-bold text-sm text-slate-300 mb-3">Provenance</div>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setProvenance('Industrial')}
              className={`p-4 rounded-xl font-bold text-sm transition-all ${
                provenance === 'Industrial'
                  ? 'bg-slate-700 text-white border-2 border-slate-600'
                  : 'bg-slate-800/50 text-slate-500 border-2 border-transparent hover:border-slate-700'
              }`}
            >
              🏭 Industrial
            </button>
            <button 
              onClick={() => setProvenance('Local/Wild')}
              className={`p-4 rounded-xl font-bold text-sm transition-all ${
                provenance === 'Local/Wild'
                  ? 'bg-green-900/50 text-green-400 border-2 border-green-700'
                  : 'bg-slate-800/50 text-slate-500 border-2 border-transparent hover:border-slate-700'
              }`}
            >
              🌿 Local/Wild
            </button>
          </div>
        </div>

        {/* Scent Sliders */}
        <div className="space-y-6">
          <SliderControl 
            label="Sweetness" 
            leftLabel="Bone Dry" 
            rightLabel="Syrupy" 
            value={values.sweetness} 
            onChange={(v) => update('sweetness', v)}
            icon={<Droplet size={16}/>}
          />
          <SliderControl 
            label="Warmth" 
            leftLabel="Ice Cold" 
            rightLabel="Fire Hot" 
            value={values.warmth} 
            onChange={(v) => update('warmth', v)}
            icon={<Wind size={16}/>}
          />
          <SliderControl 
            label="Texture" 
            leftLabel="Round" 
            rightLabel="Sharp" 
            value={values.texture} 
            onChange={(v) => update('texture', v)}
            icon={<Check size={16}/>}
          />
          <SliderControl 
            label="Intensity" 
            leftLabel="Whisper" 
            rightLabel="Shout" 
            value={values.intensity} 
            onChange={(v) => update('intensity', v)}
            icon={<Zap size={16}/>}
          />
        </div>

        {/* Description Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-bold text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <PenTool size={16} /> <span>Tasting Notes</span>
            </div>
            <button 
              onClick={toggleDictation}
              className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs transition-all ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse border border-red-500/50' : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'}`}
            >
              {isListening ? <StopCircle size={12} /> : <Mic size={12} />}
              {isListening ? 'Listening...' : 'Dictate'}
            </button>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="AI suggestion loading..."
            className="w-full bg-slate-800 text-slate-200 p-4 rounded-xl border border-slate-700 focus:outline-none focus:border-purple-500 transition-colors text-sm placeholder:text-slate-600 resize-none font-mono"
            rows={4}
          />
        </div>

        <button 
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white font-bold py-4 rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2 shadow-lg shadow-purple-500/30"
        >
          Confirm Aura <Zap size={18} className="fill-white" />
        </button>
      </div>
    </div>
  );
};