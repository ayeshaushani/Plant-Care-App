import api from "./config/api"
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
import { FIREBASE_DB } from "@/firebaseConfig"
import { Reminder } from "@/types/reminder"

// reminders
export const remindersRef = collection(FIREBASE_DB, "reminders")

export const getAllReminderByUserId = async (userId: string) => {
  const q = query(remindersRef, where("userId", "==", userId))

  const querySnapshot = await getDocs(q)
  const reminderList = querySnapshot.docs.map((reminderRef) => ({
    id: reminderRef.id,
    ...reminderRef.data()
  })) as Reminder[]
  return reminderList
}

export const createReminder = async (reminder: Reminder) => {
  const docRef = await addDoc(remindersRef, reminder)
  return docRef.id
}

export const getAllReminder = async () => {
  const snapshot = await getDocs(remindersRef)
  return snapshot.docs.map((reminder) => ({
    id: reminder.id,
    ...reminder.data()
  })) as Reminder[]
}

export const getReminderById = async (id: string) => {
  const reminderDocRef = doc(FIREBASE_DB, "reminders", id)
  const snapshot = await getDoc(reminderDocRef)
  return snapshot.exists()
    ? ({
        id: snapshot.id,
        ...snapshot.data()
      } as Reminder)
    : null
}

export const deleteReminder = async (id: string) => {
  const reminderDocRef = doc(FIREBASE_DB, "reminders", id)
  return deleteDoc(reminderDocRef)
}

export const updateReminder = async (id: string, reminder: Reminder) => {
  const reminderDocRef = doc(FIREBASE_DB, "reminders", id)
  const { id: _id, ...reminderData } = reminder // remove id
  return updateDoc(reminderDocRef, reminderData)
}

export const getReminders = async () => {
  const response = await api.get("/reminders")
  return response.data
}

export const addReminder = async (reminder: {
  title: string
  description?: string
}) => {
  const res = await api.post("/reminders", reminder)
  return res.data
}
