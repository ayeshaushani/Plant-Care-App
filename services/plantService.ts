// plantService.ts
import { collection, addDoc, doc, deleteDoc, getDoc, onSnapshot, serverTimestamp, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { FIREBASE_DB, FIREBASE_STORAGE } from "@/firebaseConfig";
import { Plant } from "../types/plant";

// Helper to get the user's plant collection
const getPlantCollection = (userId: string) => collection(FIREBASE_DB, "users", userId, "plants");

export const plantService = {
  // Create a new plant
  async addPlant(userId: string, plant: Omit<Plant, "id" | "photoUrl" | "createdAt">, photoFile: File) {
    // Upload photo to Firebase Storage
    const photoRef = ref(FIREBASE_STORAGE, `plants/${userId}/${photoFile.name}`);
    await uploadBytes(photoRef, photoFile);
    const photoUrl = await getDownloadURL(photoRef);

    // Save plant document to Firestore
    const docRef = await addDoc(getPlantCollection(userId), {
      ...plant,
      photoUrl,
      createdAt: serverTimestamp(),
    });

    return docRef.id;
  },

  // Read all plants (real-time listener)
  getPlants(userId: string, callback: (plants: Plant[]) => void) {
    const q = getPlantCollection(userId);
    return onSnapshot(q, (snapshot) => {
      const plants: Plant[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Plant),
      }));
      callback(plants);
    });
  },

  // Read single plant
  async getPlant(userId: string, plantId: string): Promise<Plant | null> {
    const docRef = doc(FIREBASE_DB, "users", userId, "plants", plantId);
    const snapshot = await getDoc(docRef); // ✅ Correct way in v9

    if (!snapshot.exists()) return null;
    return { id: snapshot.id, ...(snapshot.data() as Plant) };
  },

  // Update a plant
  async updatePlant(userId: string, plantId: string, updates: Partial<Plant>) {
    const docRef = doc(FIREBASE_DB, "users", userId, "plants", plantId);
    await updateDoc(docRef, updates);
  },

  // Delete a plant
  async deletePlant(userId: string, plantId: string, photoUrl: string) {
    // Delete Firestore document
    await deleteDoc(doc(FIREBASE_DB, "users", userId, "plants", plantId));

    // Delete photo from Storage
    const photoRef = ref(FIREBASE_STORAGE, photoUrl);
    await deleteObject(photoRef);
  },
};
