import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";
import { userService } from "@/services/userService";
import { User } from "@/types/User";

export default function UserList() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = auth.currentUser;
      if (!currentUser) return;

      // Assuming Firestore user doc ID is same as auth UID
      const data = await userService.getUserById(currentUser.uid);
      if (data) setUser(data);
    };
    fetchCurrentUser();
  }, []);

  if (!user) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Phone: {user.phone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 16 },
});
