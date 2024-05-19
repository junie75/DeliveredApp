//holds the signup box component that contains the input fields and login button
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { insertAccount } from "../../../databaseHelper";
import Inputs from "./Inputs";
import UserContext from "../../../context/UserContext";

//receives an array of strings to be used as labels for the input boxes
const SignUpBox = ({ arr, navigation, btnTxt }) => {
  //holds the input labels
  const inputs = arr;
  //receive the function to update the user in the context
  const { updateUser } = useContext(UserContext);

  //hold the user inputted data
  const [userData, setUserData] = useState({
    name: "",
    lname: "",
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

  //handle signup button press
  const insertData = async (
    fname = userData.name,
    lname = userData.lname,
    email = userData.email,
    password = userData.password
  ) => {
    try {
      //insert the user into the database
      await insertAccount(fname, lname, email, password);
      console.log("Account inserted successfuly");
      //navigate to the login screen
      navigation.navigate("Login");
    } catch (e) {
      Alert.alert(`Error inserting ${fname}`, e.message);
    }
  };

  return (
    <View style={styles.signupBox}>
      <View style={styles.inputBoxes}>
        <Text style={styles.inputLabel}>First Name</Text>
        <TextInput
          style={styles.inputBox}
          value={userData.name}
          onChangeText={(value) => handleChangeText("name", value)}
        />
      </View>
      <View style={styles.inputBoxes}>
        <Text style={styles.inputLabel}>Last Name</Text>
        <TextInput
          style={styles.inputBox}
          value={userData.lname}
          onChangeText={(value) => handleChangeText("lname", value)}
        />
      </View>
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
      <TouchableOpacity style={styles.signupBtn} onPress={() => insertData()}>
        <Text style={styles.signupBtnTxt}>{btnTxt}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpBox;

const styles = StyleSheet.create({
  signupBox: {
    justifyContent: "center",
    marginHorizontal: 20,
  },
  signupBtn: {
    flex: 1,
    flexShrink: 2,
    marginVertical: 8,
    backgroundColor: "#007AFF",
    alignSelf: "center",
    width: "100%",
    borderRadius: 30,
  },
  signupBtnTxt: {
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
