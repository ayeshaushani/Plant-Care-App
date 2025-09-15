import { child, get, push, ref, remove, set, update } from "firebase/database";
import { FIREBASE_DB } from "../firebaseConfig"; // oyage Firebase config import karanna

// 🔹 Plant type
export type Plant = {
  id: string;
  name: string;
  type: string;
  addedAt: number;
};

// 🔹 Reminder type
export type Reminder = {
  id: string;
  title: string;
  date: string;
  done: boolean;
};

/* ======================
    PLANT CRUD
====================== */

// ➕ Add Plant
export async function addPlant(uid: string, plant: Omit<Plant, "id">) {
  const dbRef = ref(FIREBASE_DB, `users/${uid}/plants`);
  const newRef = push(dbRef);
  await set(newRef, { ...plant, id: newRef.key });
}

// 📖 Get All Plants
export async function getPlants(uid: string): Promise<Record<string, Plant>> {
  const snapshot = await get(child(ref(FIREBASE_DB), `users/${uid}/plants`));
  return snapshot.exists() ? (snapshot.val() as Record<string, Plant>) : {};
}

// ✏️ Update Plant
export async function updatePlant(uid: string, plantId: string, data: Partial<Plant>) {
  await update(ref(FIREBASE_DB, `users/${uid}/plants/${plantId}`), data);
}

// ❌ Delete Plant
export async function deletePlant(uid: string, plantId: string) {
  await remove(ref(FIREBASE_DB, `users/${uid}/plants/${plantId}`));
}

/* ======================
   ⏰ REMINDER CRUD
====================== */

// ➕ Add Reminder
export async function addReminder(uid: string, plantId: string, reminder: Omit<Reminder, "id">) {
  const dbRef = ref(FIREBASE_DB, `users/${uid}/plants/${plantId}/reminders`);
  const newRef = push(dbRef);
  await set(newRef, { ...reminder, id: newRef.key });
}

// 📖 Get Reminders
export async function getReminders(uid: string, plantId: string): Promise<Record<string, Reminder>> {
  const snapshot = await get(child(ref(FIREBASE_DB), `users/${uid}/plants/${plantId}/reminders`));
  return snapshot.exists() ? (snapshot.val() as Record<string, Reminder>) : {};
}

// ✏️ Update Reminder
export async function updateReminder(uid: string, plantId: string, reminderId: string, data: Partial<Reminder>) {
  await update(ref(FIREBASE_DB, `users/${uid}/plants/${plantId}/reminders/${reminderId}`), data);
}

// ❌ Delete Reminder
export async function deleteReminder(uid: string, plantId: string, reminderId: string) {
  await remove(ref(FIREBASE_DB, `users/${uid}/plants/${plantId}/reminders/${reminderId}`));
}
