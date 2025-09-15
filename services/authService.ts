import { FIREBASE_AUTH } from "@/firebaseConfig"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth"

export const register = (email: string, password: string) => {
  return createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
}

export const login = (email: string, password: string) => {
  return signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
}

export const logout = () => {
  return signOut(FIREBASE_AUTH)
}
