import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';

// screens
import Login from './app/(dashboard)/Login';
import Dashboard from './app/(dashboard)/home'; // 👈 oyage Dashboard.tsx import karanna
//import ReminderScreen from './app/(dashboard)/reminders/index'

// 👇 Define type for your stack routes
export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  ReminderScreen: undefined;
  AddPlant: undefined;
  UserList: undefined;
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
          component={require('./app/(dashboard)/reminders/index').default}
          options={{ headerShown: true, title: "Plant Care Reminders" }}
        />
        <Stack.Screen
          name="AddPlant"
          component={require('./app/(dashboard)/plants/add').default}
          options={{ headerShown: true, title: "Add Plant" }}
        />
        <Stack.Screen
          name="UserList"
          component={require('./app/(dashboard)/(user)/user').default}
          options={{ headerShown: true, title: "User Profile" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
