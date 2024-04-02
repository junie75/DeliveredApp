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

const LoginBox = ({ arr, navigation, btnTxt }) => {
  const inputs = arr;
  //receive the function to update the user in the context
  const { updateUser } = useContext(UserContext);
  //hold the user inputted data
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChangeText = (key, value) => {
    // Update the userData state with the new value for the specified key
    setUserData({
      ...userData,
      [key]: value,
    });
  };

  const handleLogin = async () => {
    try {
      const user = await authenticateUser(userData.email, userData.password);
      if (user) {
        //if user is found, update the user in the context with the user object
        updateUser(user);
        // Successful login, navigate to the next screen or perform other actions
        console.log("Login successful:", user);

        // navigation.navigate("DrawerScreens");
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
      {/* {inputs.map((boxLabel, index) => (
        <Inputs key={index} boxLabel={boxLabel} />
      ))} */}
      {/* <Inputs boxLabel="Email" />
      <Inputs boxLabel="Password" /> */}
      {/* <LoginBtn
        btnTxt={btnTxt}
        navigation={navigation}
        navigateString={"Home"}
      /> */}
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
    // flex: 0.1,
    // flexShrink: 0,
    // marginTop: "50%",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  loginBtn: {
    flex: 1,
    flexShrink: 2,
    marginVertical: 8,
    backgroundColor: "#007AFF",
    alignSelf: "center",
    // textAlign: "center",
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
    // color: "lightgray",
  },
  inputBox: {
    // borderColor: "lightgray",
    borderRadius: 10,
    borderWidth: 1,
    // backgroundColor: "#fff",
    height: 60,
    paddingLeft: 5,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3, // Shadow opacity (adjust as needed)
    // // shadowRadius: 4, // Shadow radius (adjust as needed)
    // elevation: 5, //android specific, no effect on ios
  },
});
