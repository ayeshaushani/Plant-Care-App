import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from './app/(screen)/Login';
import Dashboard from './app/(screen)/dashboard';  // 👈 oyage Dashboard.tsx import karanna
import ReminderScreen from './app/(dashboard)/reminders/index'

// 👇 Define type for your stack routes
export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  ReminderScreen: undefined; // add params if needed later
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#2e7d32" />
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="ReminderScreen"
          component={ReminderScreen}
          options={{ headerShown: true, title: "Plant Care Reminders" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
