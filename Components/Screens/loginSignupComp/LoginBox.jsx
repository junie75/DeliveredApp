//holds the login box component that contains the input fields and login button
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useContext } from "react";
import Inputs from "./Inputs";
import LoginBtn from "./LoginBtn";
import { authenticateUser, deleteAccount } from "../../../databaseHelper";
import UserContext from "../../../context/UserContext";

//receives an array of strings to be used as labels for the input boxes
const LoginBox = ({ arr, navigation, btnTxt }) => {
  //holds the input labelss
  const inputs = arr;

  //receive the function to update the user in the context
  const { updateUser } = useContext(UserContext);

  //hold the user inputted data
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // Update the userData state with the new value for the specified key
  const handleChangeText = (key, value) => {
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  //handle login button press
  const handleLogin = async () => {
    try {
      //authenticate the user in the database
      const user = await authenticateUser(userData.email, userData.password);

      //if a user is found
      if (user) {
        //if user is found, update the user in the context with the user object
        updateUser(user);

        // Successful login, navigate to the next screen or perform other actions
        console.log("Login successful:", user);

        // navigate to the appropriate screen based on the user's role
        user.isAdmin == 1
          ? navigation.navigate("Admin Home")
          : navigation.navigate("DrawerScreens");
      } else {
        // Display error message for invalid credentials
        Alert.alert(
          "Invalid Credentials",
          "Please check your username and password."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      Alert.alert(
        "Error",
        "An error occurred during login. Please try again later."
      );
    }
  };

  //function used to test deletion of accounts
  const handleDelete = async (id) => {
    try {
      await deleteAccount(id);
      Alert.alert("Success", "Account successfully deleted");
    } catch (error) {
      Alert.alert("Error", "Failed to delete account");
      console.error("Error deleting account:", error);
    }
  };

  return (
    <View style={styles.loginBox}>
      <View style={styles.inputBoxes}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.inputBox}
          value={userData.email}
          onChangeText={(value) => handleChangeText("email", value)}
        />
      </View>
      <View style={styles.inputBoxes}>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          style={styles.inputBox}
          secureTextEntry={true}
          value={userData.password}
          onChangeText={(value) => handleChangeText("password", value)}
        />
      </View>

      {/*login button */}
      <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
        <Text style={styles.loginBtnTxt}>{btnTxt}</Text>
      </TouchableOpacity>

      {/*delete button used for debugging*/}
      {/* <TouchableOpacity
        onPress={() => {
          for (let accID = 2; accID < 22; accID++) {
            handleDelete(accID);
          }
        }}
      >
        <Text>Delete account</Text>
      </TouchableOpacity> */}
    </View>
  );
};

export default LoginBox;

const styles = StyleSheet.create({
  loginBox: {
    justifyContent: "center",
    marginHorizontal: 20,
  },
  loginBtn: {
    flex: 1,
    flexShrink: 2,
    marginVertical: 8,
    backgroundColor: "#007AFF",
    alignSelf: "center",
    width: "100%",
    borderRadius: 30,
  },
  loginBtnTxt: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10,
  },
  inputBoxes: {
    paddingVertical: 10,
  },
  inputLabel: {
    fontSize: 15,
    paddingBottom: 5,
    marginLeft: 10,
  },
  inputBox: {
    borderRadius: 10,
    borderWidth: 1,
    height: 60,
    paddingLeft: 5,
  },
});
