import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect, useContext } from "react";
import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import * as SQLite from "expo-sqlite";
// import * as Sharing from "expo-sharing";
// import * as FileSystem from "expo-file-system";
// import * as DocumentPicker from "expo-document-picker";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
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
import ProfileScreen from "./Components/Screens/ProfileScreen";
import { openDatabase, createTables } from "./databaseHelper";
import UserContext, { UserProvider } from "./context/UserContext";
import StorageManagement from "./Components/adminScreens/StorageManagement";
import ResolveIssues from "./Components/adminScreens/ResolveIssues";
import ScanMail from "./Components/adminScreens/ScanMail";
import CheckMailRequest from "./Components/Screens/CheckMailRequest";
import NewRequestForm from "./Components/Screens/NewRequestForm";
import PastRequests from "./Components/Screens/PastRequests";
import RequestDetails from "./Components/adminScreens/RequestDetails";

// import SQLite from "react-native-sqlite-storage";
// import { FileSystem } from "expo-file-system";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
// function ProfileScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Profile Screen</Text>
//       <Button title="Go back" onPress={() => navigation.goBack()} />
//     </View>
//   );
// }

function DrawerContent({ navigation }) {
  const { updateUser } = useContext(UserContext);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 50,
        alignItems: "flex-start",
      }}
    >
      <Button title="Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
      <Button
        title="Check Mail Request"
        onPress={() => navigation.navigate("Check Mail Request Form")}
      />
      <Button
        style={{ color: "#BBB0C1" }}
        title="Logout"
        onPress={() => {
          // Implement your logout logic here
          // For example, clearing user session or token
          updateUser(null);
          navigation.navigate("Login");
        }}
      />
    </View>
  );
}

function DrawerScreens() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
      // screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: true }}
      />
      <Drawer.Screen
        name="Check Mail Request Form"
        component={CheckMailRequest}
        options={{ headerShown: true, title: "Check Mail Request" }}
      />
      {/* <Drawer.Screen name="Deliveries" component={DeliveriesScreen} />
      <Drawer.Screen name="Mailroom Map" component={MailMapScreen} />
      <Drawer.Screen name="How-To Page" component={HowToScreen} />
      <Drawer.Screen name="Admin Home" component={AdminHome} /> */}
    </Drawer.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    //open db when the app starts
    const database = openDatabase();
    console.log("database opened succdessfully");
    //create tables if they don't exist
    createTables();
    console.log("tables created succdessfully");
    // return async () => {
    //   //optionally close the db when the app is unmounted
    //   await database.closeAsync();
    //   console.log("database closed successfully");
    // };
  }, []);
  return (
    <NavigationContainer>
      <UserProvider>
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
            name="DrawerScreens"
            component={DrawerScreens}
            options={{ headerShown: false, title: "Home" }}
          />

          {/* <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen name="Deliveries" component={DeliveriesScreen} />
          <Stack.Screen name="Mailroom Map" component={MailMapScreen} />
          <Stack.Screen name="How-To Page" component={HowToScreen} />
          <Stack.Screen name="New Request" component={NewRequestForm} />
          <Stack.Screen name="Past Requests" component={PastRequests} />

          <Stack.Screen
            name="Admin Home"
            component={AdminHome}
            options={{ headerShown: false, title: "Home" }}
          />
          <Stack.Screen
            name="Storage Screen"
            component={StorageManagement}
            options={{ title: "Storage Management" }}
          />
          <Stack.Screen
            name="Resolve Issues"
            component={ResolveIssues}
            options={{ title: "Check Mail Requests", headerBackTitle: "Back" }}
          />
          <Stack.Screen
            name="Scan Mail"
            component={ScanMail}
            options={{ title: "Mail Management" }}
          />
          <Stack.Screen
            name="Request Details"
            component={RequestDetails}
            options={{ headerBackTitle: "Back" }}
          />
        </Stack.Navigator>
      </UserProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
