import React, { useState } from 'react';
import { Search, Camera, Award, Sparkles } from 'lucide-react';
import { Onboarding } from './components/Onboarding';
import { Feed } from './components/Feed';
import { Discover } from './components/Discover';
import { Profile } from './components/Profile';
import { CameraView } from './components/CameraView';
import { Tuner } from './components/Tuner';
import { Result } from './components/Result';
import { analyzeFoodImage } from './services/geminiService';
import { submitLabelledData } from './services/databaseService';
import { ScentProfile, Post, ViewState, Provenance, CommunityNote } from './types';

// --- Mock Data ---
const MOCK_FEED: Post[] = [
  {
    id: '1',
    user: 'TruffleHunter_LDN',
    userAvatar: '🎩',
    image: '🍄',
    item: 'Wild White Truffle Pasta',
    location: 'Padella, London',
    scentProfile: { intensity: 90, warmth: 80, texture: 20, sweetness: 40 },
    provenance: 'Local/Wild',
    likes: 240,
    comments: 18,
    description: "Earthy funk, literally smells like damp forest floor. Intense garlic notes that linger for hours.",
    timestamp: '2h ago',
    isLiked: false,
    communityNotes: []
  },
  {
    id: '2',
    user: 'CitrusKing',
    userAvatar: '👑',
    image: '🍊',
    item: 'Yuzu Sorbet',
    location: 'Kyoto Speciality',
    scentProfile: { intensity: 95, warmth: 10, texture: 90, sweetness: 60 },
    provenance: 'Local/Wild',
    likes: 112,
    comments: 7,
    description: "Sharp enough to cut glass. Super floral finish with hints of bergamot and mandarin.",
    timestamp: '5h ago',
    isLiked: true,
    communityNotes: [
        { id: 'c1', user: 'ChefMiko', note: 'I found it more sweet than sharp personally, really depends on the season.', timestamp: '1h ago' }
    ]
  },
  {
    id: '3',
    user: 'VanillaVault',
    userAvatar: '🏺',
    image: '🍦',
    item: 'Madagascar Vanilla Ice Cream',
    location: 'Amorino, Paris',
    scentProfile: { intensity: 70, warmth: 65, texture: 15, sweetness: 85 },
    provenance: 'Industrial',
    likes: 324,
    comments: 29,
    description: "Rich, creamy, with those black specks that tell you it's the real deal. Warm caramel undertones.",
    timestamp: '1d ago',
    isLiked: false,
    communityNotes: []
  },
  {
    id: '4',
    user: 'SpiceRoute_Trader',
    userAvatar: '🧭',
    image: '🌶️',
    item: 'Ghost Pepper Hot Sauce',
    location: 'Home Kitchen, Mumbai',
    scentProfile: { intensity: 98, warmth: 95, texture: 85, sweetness: 20 },
    provenance: 'Local/Wild',
    likes: 89,
    comments: 43,
    description: "Violent. Absolutely violent. Fruity top notes before the heat bomb drops. Smoky finish that haunts you.",
    timestamp: '2d ago',
    isLiked: true,
    communityNotes: []
  }
];

export default function App() {
  const [view, setView] = useState<ViewState>('onboarding');
  const [userArchetype, setUserArchetype] = useState<string | null>(null);
  const [feed, setFeed] = useState<Post[]>(MOCK_FEED);
  
  // Scanned Item State
  const [detectedLabel, setDetectedLabel] = useState<string>('Orange');
  const [refinedLabel, setRefinedLabel] = useState<string>('Satsuma');
  const [isSuperDescriber, setIsSuperDescriber] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Scent Data Entry
  const [scentValues, setScentValues] = useState<ScentProfile>({
    intensity: 50,
    warmth: 50,
    texture: 50,
    sweetness: 50
  });
  const [provenance, setProvenance] = useState<Provenance>('Industrial');
  const [description, setDescription] = useState('');

  const finishOnboarding = (archetype: string) => {
    setUserArchetype(archetype);
    setView('feed');
  };

  const startScan = () => {
    setDetectedLabel('');
    setScentValues({ intensity: 50, warmth: 50, texture: 50, sweetness: 50 });
    setProvenance('Industrial');
    setDescription('');
    setUploadedImage(null);
    setRefinedLabel('');
    setIsSuperDescriber(false);
    setView('camera');
  };

  const handleCapture = async (img: string) => {
    setUploadedImage(img);
    setView('tuner');
    setIsAnalyzing(true);
    
    // Call Gemini Service
    const analysis = await analyzeFoodImage(img);
    
    setDetectedLabel(analysis.label);
    setRefinedLabel(analysis.label);
    setScentValues(analysis.scentProfile);
    setProvenance(analysis.provenance);
    setDescription(analysis.description);
    
    setIsAnalyzing(false);
  };

  const handleLike = (postId: string) => {
    setFeed(feed.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    ));
  };

  const handleAddNote = (postId: string, noteText: string) => {
    setFeed(feed.map(post => {
      if (post.id === postId) {
        const newNote: CommunityNote = {
          id: Date.now().toString(),
          user: 'You',
          note: noteText,
          timestamp: 'Just now'
        };
        return { ...post, communityNotes: [...post.communityNotes, newNote] };
      }
      return post;
    }));
  };

  const handleFinishCreation = async () => {
    const finalLabel = refinedLabel || detectedLabel;
    
    // Submit anonymous data to training DB
    submitLabelledData({
      image: uploadedImage || '',
      label: finalLabel,
      scentProfile: scentValues,
      provenance: provenance,
      description: description,
      anonymisedUserId: 'anon_' + Math.floor(Math.random() * 10000)
    });

    const newPost: Post = {
        id: Date.now().toString(),
        user: 'You',
        userAvatar: '👤',
        image: uploadedImage || '🥘',
        item: finalLabel,
        location: 'Unknown',
        scentProfile: scentValues,
        provenance: provenance,
        likes: 0,
        comments: 0,
        description: description,
        timestamp: 'Just now',
        isLiked: false,
        communityNotes: []
    };
    setFeed([newPost, ...feed]);
    setView('result');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-purple-950/20 text-white font-sans selection:bg-purple-500 overflow-hidden flex flex-col items-center justify-center">
      <div className="w-full max-w-md h-full min-h-[100dvh] bg-slate-900/90 backdrop-blur-xl shadow-2xl relative flex flex-col border-x border-slate-800/50">
        
        {/* Top Bar (except for onboarding/camera/result) */}
        {['feed', 'discover', 'profile'].includes(view) && (
          <div className="h-16 border-b border-slate-800/50 flex items-center justify-between px-5 z-10 bg-slate-900/95 backdrop-blur-xl sticky top-0">
            <button 
              onClick={() => setView('feed')} 
              className="font-black text-2xl tracking-tighter bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent hover:scale-105 transition-transform"
            >
              FOOD-E.
            </button>
            <div className="flex gap-3 items-center">
              <div className="relative">
                <Sparkles size={20} className="text-purple-400 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>
              </div>
              <span className="text-xs font-bold font-mono text-slate-400 border border-purple-500/30 bg-purple-500/10 px-3 py-1.5 rounded-full">
                {userArchetype || 'GUEST'}
              </span>
            </div>
          </div>
        )}

        {/* VIEW ROUTING */}
        <div className="flex-1 overflow-y-auto relative no-scrollbar">
          {view === 'onboarding' && <Onboarding onComplete={finishOnboarding} />}
          {view === 'feed' && <Feed feed={feed} onScan={startScan} onLike={handleLike} onAddNote={handleAddNote} />}
          {view === 'discover' && <Discover />}
          {view === 'profile' && <Profile archetype={userArchetype} />}
          {view === 'camera' && <CameraView onCapture={handleCapture} onCancel={() => setView('feed')} />}
          {view === 'tuner' && (
            <Tuner 
              initialLabel={detectedLabel}
              onComplete={handleFinishCreation}
              values={scentValues}
              setValues={setScentValues}
              provenance={provenance}
              setProvenance={setProvenance}
              refinedLabel={refinedLabel}
              setRefinedLabel={setRefinedLabel}
              isSuperDescriber={isSuperDescriber}
              setIsSuperDescriber={setIsSuperDescriber}
              description={description}
              setDescription={setDescription}
              uploadedImage={uploadedImage}
              isAnalyzing={isAnalyzing}
            />
          )}
          {view === 'result' && (
            <Result 
              values={scentValues} 
              provenance={provenance} 
              label={isSuperDescriber ? refinedLabel : detectedLabel}
              description={description}
              onReset={() => setView('feed')}
              uploadedImage={uploadedImage}
            />
          )}
        </div>

        {/* Bottom Nav (visible on Feed, Discover, Profile) */}
        {['feed', 'discover', 'profile'].includes(view) && (
          <div className="h-20 border-t border-slate-800/50 bg-slate-900/95 backdrop-blur-xl flex items-center justify-around px-6 pb-2 shrink-0 z-50">
            <button 
              onClick={() => setView('discover')}
              className={`flex flex-col items-center gap-1 transition-all ${view === 'discover' ? 'text-purple-400 scale-110' : 'text-slate-500 hover:text-white'}`}
            >
              <Search size={24} />
              <span className="text-[10px] font-bold">Discover</span>
            </button>
            <button 
              onClick={startScan}
              className="w-16 h-16 bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-900/50 hover:scale-110 transition-all active:scale-95 relative -mt-8"
            >
              <Camera size={28} color="white" />
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-400 to-pink-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            </button>
            <button 
              onClick={() => setView('profile')}
              className={`flex flex-col items-center gap-1 transition-all ${view === 'profile' ? 'text-purple-400 scale-110' : 'text-slate-500 hover:text-white'}`}
            >
              <Award size={24} />
              <span className="text-[10px] font-bold">Profile</span>
            </button>
          </div>
        )}
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}