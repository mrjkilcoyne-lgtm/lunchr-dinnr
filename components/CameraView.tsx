import React, { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';

interface CameraViewProps {
  onCapture: (img: string) => void;
  onCancel: () => void;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture, onCancel }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmCapture = () => {
    if (imagePreview) {
      onCapture(imagePreview);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-slate-950 relative overflow-hidden">
      <button 
        onClick={onCancel}
        className="absolute top-6 left-6 z-50 p-2 bg-slate-800 rounded-full text-slate-400"
      >
        <X size={24} />
      </button>

      {/* Viewfinder Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 border-2 border-purple-500/30 m-12"></div>
        <div className="absolute top-12 left-12 w-8 h-8 border-l-4 border-t-4 border-purple-500"></div>
        <div className="absolute top-12 right-12 w-8 h-8 border-r-4 border-t-4 border-purple-500"></div>
        <div className="absolute bottom-12 left-12 w-8 h-8 border-l-4 border-b-4 border-purple-500"></div>
        <div className="absolute bottom-12 right-12 w-8 h-8 border-r-4 border-b-4 border-purple-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-sm space-y-6">
        {/* Preview Area */}
        <div className="aspect-square bg-slate-900 border-2 border-dashed border-slate-700 rounded-3xl overflow-hidden flex items-center justify-center relative">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center p-8">
              <Camera size={48} className="mx-auto mb-4 text-slate-600" />
              <p className="text-slate-500 text-sm">No image selected</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="text-center">
          <h2 className="text-xl font-black text-white mb-2">Capture Your Scent</h2>
          <p className="text-slate-400 text-sm">Upload or take a photo of what you're smelling for AI Analysis.</p>
        </div>

        {/* Upload Buttons */}
        <div className="space-y-3">
          <label className="block w-full">
            <input 
              type="file" 
              accept="image/*" 
              capture="environment"
              className="hidden" 
              onChange={handleImageUpload}
            />
            <div className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-4 rounded-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-900/40">
              <Camera size={20} /> Take Photo
            </div>
          </label>
          
          <label className="block w-full">
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleImageUpload}
            />
            <div className="w-full bg-slate-800/50 border border-slate-700 text-slate-300 font-bold py-4 rounded-2xl hover:bg-slate-700/50 transition-colors flex items-center justify-center gap-2 cursor-pointer">
              <Upload size={20} /> Upload from Gallery
            </div>
          </label>
        </div>

        {/* Continue Button */}
        {imagePreview && (
          <button 
            onClick={confirmCapture}
            className="w-full bg-white text-slate-900 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-colors animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-xl"
          >
            Analyze with Gemini ✨
          </button>
        )}
      </div>
    </div>
  );
};
