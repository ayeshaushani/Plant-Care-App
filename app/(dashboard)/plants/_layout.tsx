import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function PlantLayout() {
  const router = useRouter();

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ title: "My Plants", headerTitleAlign: "center" }}
        />
        <Stack.Screen
          name="[id]"
          options={{ title: "Plant Details", headerBackTitle: "Back" }}
        />
      </Stack>

      {/* Floating Add Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("./plant/index.tsx")} // relative path inside plants
      >
        <MaterialIcons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#0ae86e",
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
});
