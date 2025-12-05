export type ScentProfile = {
  intensity: number; // 0-100 (Quiet -> Loud)
  warmth: number;    // 0-100 (Cold/Fresh -> Warm/Spicy)
  texture: number;   // 0-100 (Round/Creamy -> Spiky/Acidic)
  sweetness: number; // 0-100 (Dry -> Sweet)
};

export type Provenance = 'Industrial' | 'Local/Wild';

export interface CommunityNote {
  id: string;
  user: string;
  note: string;
  timestamp: string;
}

export type Post = {
  id: string;
  user: string;
  userAvatar: string;
  image: string; // Emoji or URL
  item: string;
  location: string;
  scentProfile: ScentProfile;
  provenance: Provenance;
  likes: number;
  comments: number;
  description?: string;
  timestamp: string;
  isLiked?: boolean;
  communityNotes: CommunityNote[];
};

export type ViewState = 'onboarding' | 'feed' | 'discover' | 'profile' | 'camera' | 'tuner' | 'result';

export interface AnalysisResult {
  label: string;
  provenance: Provenance;
  scentProfile: ScentProfile;
  description: string;
}