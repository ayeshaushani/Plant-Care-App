// import { doc, getDoc } from "firebase/firestore";
// import { FIREBASE_DB } from "@/firebaseConfig";
// import { User } from "@/types/User";

// export const userService = {
//   // Get a user by ID (Firestore document ID)
//   async getUserById(id: string): Promise<User | null> {
//     const docRef = doc(FIREBASE_DB, "users", id);
//     const snapshot = await getDoc(docRef);
//     if (snapshot.exists()) {
//       return { id: snapshot.id, ...snapshot.data() } as User;
//     }
//     return null;
//   },
// };
