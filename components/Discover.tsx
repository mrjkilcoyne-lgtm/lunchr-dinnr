import React, { useState } from 'react';
import { Search, TrendingUp, Sparkles } from 'lucide-react';

export const Discover: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'wild' | 'trending'>('all');
  
  const categories = [
    { emoji: '🍊', name: 'Citrus', count: 234 },
    { emoji: '🌶️', name: 'Spicy', count: 189 },
    { emoji: '🍄', name: 'Earthy', count: 156 },
    { emoji: '🍰', name: 'Sweet', count: 312 },
    { emoji: '🧀', name: 'Umami', count: 145 },
    { emoji: '🌿', name: 'Herbal', count: 198 }
  ];

  return (
    <div className="min-h-full p-6 space-y-8">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input 
          type="text"
          placeholder="Search flavors, ingredients, locations..."
          className="w-full bg-slate-800/50 border border-slate-700 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-600"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
        <button 
          onClick={() => setActiveFilter('all')}
          className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
            activeFilter === 'all' 
              ? 'bg-purple-600 text-white' 
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
          }`}
        >
          All
        </button>
        <button 
          onClick={() => setActiveFilter('trending')}
          className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeFilter === 'trending' 
              ? 'bg-purple-600 text-white' 
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
          }`}
        >
          <TrendingUp size={14} /> Trending
        </button>
        <button 
          onClick={() => setActiveFilter('wild')}
          className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
            activeFilter === 'wild' 
              ? 'bg-green-600 text-white' 
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50'
          }`}
        >
          <Sparkles size={14} /> Wild Only
        </button>
      </div>

      {/* Categories Grid */}
      <div>
        <h2 className="text-lg font-black mb-4 text-slate-200">Browse by Category</h2>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              className="bg-gradient-to-br from-slate-800/80 to-slate-800/50 border border-slate-700/50 p-6 rounded-2xl hover:border-purple-500/50 transition-all hover:scale-105 group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.emoji}</div>
              <div className="text-left">
                <div className="font-bold text-slate-200">{cat.name}</div>
                <div className="text-xs text-slate-500">{cat.count} posts</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Trending Hashtags */}
      <div>
        <h2 className="text-lg font-black mb-4 text-slate-200">Trending Now</h2>
        <div className="flex flex-wrap gap-2">
          {['#TruffleEconomics', '#CitrusRevolution', '#UmamiBlast', '#WildForage', '#LocalHarvest', '#FermentationNation'].map((tag, idx) => (
            <button 
              key={idx}
              className="bg-slate-800/50 border border-slate-700/50 px-4 py-2 rounded-full text-xs font-bold text-purple-400 hover:bg-purple-900/30 hover:border-purple-500/50 transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
