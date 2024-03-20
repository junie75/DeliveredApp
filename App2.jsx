import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as SQLite from "expo-sqlite";
// import * as Sharing from "expo-sharing";
// import * as FileSystem from "expo-file-system";
// import * as DocumentPicker from "expo-document-picker";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Components/Screens/HomeScreen";
import DeliveriesScreen from "./Components/Screens/DeliveriesScreen";
import MailMapScreen from "./Components/Screens/MailMapScreen";
import HowToScreen from "./Components/Screens/HowToScreen";
import {
  Screen,
  ScreenStackHeaderConfig,
} from "react-native-screens/native-stack";
import Login from "./Components/Screens/LogInScreen";
import SignUp from "./Components/Screens/SignUpScreen";
import OnboardingScreen from "./Components/Screens/OnboardingScreen";
import AdminHome from "./Components/adminScreens/AdminHome";
import { openDatabase, createTables } from "./databaseHelper";

// import SQLite from "react-native-sqlite-storage";
// import { FileSystem } from "expo-file-system";

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    //open db when the app starts
    const database = openDatabase();
    console.log("database opened succdessfully");
    //create tables if they don't exist
    createTables();
    console.log("tables created succdessfully");
    return async () => {
      //optionally close the db when the app is unmounted
      await database.closeAsync();
      console.log("database closed successfully");
    };
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Onboard"
          component={OnboardingScreen}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          // options={{ title: "Create an Account" }}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Deliveries" component={DeliveriesScreen} />
        <Stack.Screen name="Mailroom Map" component={MailMapScreen} />
        <Stack.Screen name="How-To Page" component={HowToScreen} />
        <Stack.Screen name="Admin Home" component={AdminHome} />
        {/* <Home></Home> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
