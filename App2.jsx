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

// import SQLite from "react-native-sqlite-storage";
// import { FileSystem } from "expo-file-system";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Deliveries" component={DeliveriesScreen} />
        <Stack.Screen name="Mailroom Map" component={MailMapScreen} />
        <Stack.Screen name="How-To Page" component={HowToScreen} />
        {/* <Home></Home> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
