import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/context/AuthContext";
import { LoaderProvider } from "@/context/LoaderContext";

export default function RootLayout() {
  return (
    <LoaderProvider>
      <AuthProvider>
        {/* Stack gives navigation context */}
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </LoaderProvider>
  );
}
