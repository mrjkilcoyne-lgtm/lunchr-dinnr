import { ScentProfile, Provenance } from '../types';

interface LabelledDataPayload {
  image: string; // Base64 or URL
  label: string;
  scentProfile: ScentProfile;
  provenance: Provenance;
  description: string;
  anonymisedUserId: string;
  timestamp: number;
}

/**
 * Simulates submitting anonymised labelled data to a training database.
 * We capture the image and the human-verified descriptors to improve future models.
 */
export async function submitLabelledData(data: Omit<LabelledDataPayload, 'timestamp'>): Promise<boolean> {
  // In a real app, this would be a POST request to your backend /api/dataset/contribute
  const payload: LabelledDataPayload = {
    ...data,
    timestamp: Date.now()
  };

  console.group("📡 Food-E Knowledge Base Submission");
  console.log("Status: Uploading anonymised labelled data...");
  console.log("Image Length:", payload.image.length);
  console.log("Label:", payload.label);
  console.log("Descriptors:", payload.scentProfile);
  console.log("User Notes:", payload.description);
  console.groupEnd();

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return true;
}