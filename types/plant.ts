// types.ts
export interface Plant {
  id?: string;               // Firestore document ID
  name: string;
  type: string;
  photoUrl: string;
  wateringFrequency: number; // in days
  lastWatered?: string;      // ISO date string
  createdAt?: string;        // ISO date string
}
