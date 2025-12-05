import React, { useState } from 'react';
import { MapPin, Heart, MessageCircle, Share2, Sparkles, Camera, Plus, CornerDownRight } from 'lucide-react';
import { Post } from '../types';
import { AuraVisual } from './AuraVisual';

interface FeedProps {
  feed: Post[];
  onScan: () => void;
  onLike: (id: string) => void;
  onAddNote: (postId: string, note: string) => void;
}

export const Feed: React.FC<FeedProps> = ({ feed, onScan, onLike, onAddNote }) => {
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  const submitNote = (postId: string) => {
    if (noteText.trim()) {
      onAddNote(postId, noteText);
      setNoteText('');
      setActiveNoteId(null);
    }
  };

  return (
    <div className="pb-4">
      {/* Header Section */}
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800/50 z-10 p-6">
        <h1 className="text-2xl font-black mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Feed</h1>
        <p className="text-xs text-slate-500">Latest scent discoveries</p>
      </div>

      {/* Feed Items */}
      <div className="space-y-6 p-4">
        {feed.map((post, idx) => (
          <div 
            key={post.id} 
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all hover:shadow-lg hover:shadow-purple-500/10 group"
            style={{ animationDelay: `${idx * 100}ms` }}
          >
            {/* User Header */}
            <div className="flex items-center gap-3 p-4 border-b border-slate-700/30">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-xl">
                {post.userAvatar}
              </div>
              <div className="flex-1">
                <div className="font-bold text-sm text-slate-200">{post.user}</div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MapPin size={12} />
                  <span>{post.location}</span>
                  <span>•</span>
                  <span>{post.timestamp}</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6 space-y-4">
              {/* Aura + Emoji */}
              <div className="relative h-48 flex items-center justify-center mb-4">
                <AuraVisual profile={post.scentProfile} provenance={post.provenance} size="medium" />
                <div className="absolute text-6xl z-20 group-hover:scale-110 transition-transform">
                  {post.image.startsWith('http') || post.image.startsWith('data') ? 
                    <img src={post.image} alt="food" className="w-16 h-16 rounded-full object-cover border-2 border-white/20" /> : 
                    post.image
                  }
                </div>
              </div>

              {/* Item Name */}
              <h3 className="text-xl font-black text-white">{post.item}</h3>

              {/* Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {post.provenance === 'Local/Wild' && (
                  <span className="bg-green-900/50 text-green-400 border border-green-700/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                    <Sparkles size={12} /> Wild Harvest
                  </span>
                )}
                <span className="bg-slate-700/50 text-slate-300 border border-slate-600/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                  {post.scentProfile.intensity > 70 ? '⚡ High Volatility' : '🌊 Subtle'}
                </span>
              </div>

              {/* Description */}
              {post.description && (
                <p className="text-sm text-slate-400 leading-relaxed italic">"{post.description}"</p>
              )}

              {/* Collaborative Notes Section */}
              <div className="pt-4 border-t border-slate-700/30">
                 <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles size={12} className="text-purple-400"/> Community Senses
                    </h4>
                    {activeNoteId !== post.id && (
                      <button 
                        onClick={() => setActiveNoteId(post.id)}
                        className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-bold"
                      >
                        <Plus size={12} /> Add Note
                      </button>
                    )}
                 </div>

                 {/* Existing Notes */}
                 <div className="space-y-2">
                   {post.communityNotes && post.communityNotes.length > 0 ? (
                     post.communityNotes.map((note) => (
                       <div key={note.id} className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/50 flex gap-3 text-xs">
                          <div className="w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center shrink-0">👤</div>
                          <div>
                            <span className="font-bold text-slate-300">{note.user}</span>
                            <p className="text-slate-400 mt-1">{note.note}</p>
                          </div>
                       </div>
                     ))
                   ) : (
                     <p className="text-xs text-slate-600 italic pl-2">No other impressions yet. Be the first.</p>
                   )}
                 </div>

                 {/* Add Note Input */}
                 {activeNoteId === post.id && (
                   <div className="mt-3 flex gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                     <div className="text-slate-500 pt-2"><CornerDownRight size={16} /></div>
                     <div className="flex-1">
                       <textarea 
                          value={noteText}
                          onChange={(e) => setNoteText(e.target.value)}
                          placeholder="What's your sense of this?"
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-purple-500 min-h-[80px]"
                          autoFocus
                       />
                       <div className="flex justify-end gap-2 mt-2">
                         <button 
                            onClick={() => { setActiveNoteId(null); setNoteText(''); }}
                            className="text-xs font-bold text-slate-500 hover:text-white px-3 py-2"
                         >
                           Cancel
                         </button>
                         <button 
                            onClick={() => submitNote(post.id)}
                            className="text-xs font-bold bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-500"
                         >
                           Post Sense
                         </button>
                       </div>
                     </div>
                   </div>
                 )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6 px-6 pb-4 pt-2 text-slate-400 border-t border-slate-700/30">
              <button 
                onClick={() => onLike(post.id)}
                className={`flex items-center gap-2 hover:text-pink-400 transition-colors group/like ${post.isLiked ? 'text-pink-500' : ''}`}
              >
                <Heart size={20} className={`${post.isLiked ? 'fill-pink-500' : ''} group-hover/like:scale-110 transition-transform`} />
                <span className="text-sm font-bold">{post.likes}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-purple-400 transition-colors group/comment">
                <MessageCircle size={20} className="group-hover/comment:scale-110 transition-transform" />
                <span className="text-sm font-bold">{post.comments}</span>
              </button>
              <button className="ml-auto hover:text-purple-400 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State CTA */}
      <div className="mt-8 p-8 text-center">
        <div className="text-4xl mb-4 opacity-50">👃</div>
        <p className="text-slate-500 text-sm mb-4">That's all for now!</p>
        <button 
          onClick={onScan}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform inline-flex items-center gap-2"
        >
          <Camera size={18} /> Add Your Own
        </button>
      </div>
    </div>
  );
};