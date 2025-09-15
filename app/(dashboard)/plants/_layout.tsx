// app/(dashboard)/plants/_layout.tsx
import { Stack } from "expo-router";

export default function PlantLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "My Plants",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          title: "Plant Details",
          headerBackTitle: "Back",
        }}
      />
    </Stack>
  );
}
