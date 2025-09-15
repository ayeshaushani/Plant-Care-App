import { Stack } from "expo-router";

export default function PlantLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "My Plants" }} />
      <Stack.Screen name="add" options={{ title: "Add Plant" }} />
      <Stack.Screen name="[id]" options={{ title: "Plant Details" }} />
    </Stack>
  );
}
