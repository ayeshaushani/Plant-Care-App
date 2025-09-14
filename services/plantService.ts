import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where
} from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { FIREBASE_DB, FIREBASE_STORAGE } from "@/firebaseConfig"
import { Plant } from "@/types/plant"

export const plantsRef = collection(FIREBASE_DB, "plants")

// ✅ Upload plant image to Firebase Storage
export const uploadPlantImage = async (uri: string, userId: string) => {
  const response = await fetch(uri)
  const blob = await response.blob()

  const storageRef = ref(FIREBASE_STORAGE, `plants/${userId}/${Date.now()}.jpg`)
  await uploadBytes(storageRef, blob)

  return await getDownloadURL(storageRef) // ✅ return image URL
}

// ✅ Create new plant with optional image
export const createPlant = async (plant: Plant) => {
  const docRef = await addDoc(plantsRef, plant)
  return docRef.id
}

export const getAllPlantsByUserId = async (userId: string) => {
  const q = query(plantsRef, where("userId", "==", userId))
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((plantRef) => ({
    id: plantRef.id,
    ...plantRef.data()
  })) as Plant[]
}

export const getPlantById = async (id: string) => {
  const plantDocRef = doc(FIREBASE_DB, "plants", id)
  const snapshot = await getDoc(plantDocRef)
  return snapshot.exists()
    ? ({ id: snapshot.id, ...snapshot.data() } as Plant)
    : null
}

export const deletePlant = async (id: string) => {
  const plantDocRef = doc(FIREBASE_DB, "plants", id)
  return deleteDoc(plantDocRef)
}

export const updatePlant = async (id: string, plant: Plant) => {
  const plantDocRef = doc(FIREBASE_DB, "plants", id)
  const { id: _id, ...plantData } = plant
  return updateDoc(plantDocRef, plantData)
}
