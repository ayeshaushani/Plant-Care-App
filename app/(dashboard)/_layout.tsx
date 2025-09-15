import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const tabs = [
  { label: "Home", name: "home", icon: "home-filled" },
  { label: "Plants", name: "plants", icon: "local-florist" },
  { label: "Reminders", name: "reminders", icon: "check-circle" },
  { label: "Settings", name: "settings", icon: "settings" }
] as const;

export default function DashboardLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0ae86e",
        tabBarInactiveTintColor: "#999",
        headerShown: false,
        tabBarStyle: { backgroundColor: "#ccc" },
      }}
    >
      {tabs.map(({ name, icon, label }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: label,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name={icon} color={color} size={size} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
