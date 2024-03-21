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
import UserContext from "../../../UserContext";

const SignUpBox = ({ arr, navigation, btnTxt }) => {
  const inputs = arr;
  const { updateUser } = useContext(UserContext);

  //hold the user inputted data
  const [userData, setUserData] = useState({
    name: "",
    lname: "",
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

  const insertData = async (
    fname = userData.name,
    lname = userData.lname,
    email = userData.email,
    password = userData.password
  ) => {
    try {
      await insertAccount(fname, lname, email, password);
      console.log("Account inserted successfuly");
      // updateUser(insertedUser);
      navigation.navigate("Login");
    } catch (e) {
      Alert.alert(`Error inserting ${fname}`, e.message);
    }
  };

  //   const insertData = async (userData) => {
  //     try {
  //       await insertAccount(
  //         userData.name,
  //         userData.lname,
  //         userData.email,
  //         userData.password
  //       );
  //       navigation.navigate("Home");
  //     } catch (e) {
  //       Alert.alert(`Error inserting ${fname}`, e.message);
  //     }
  //   };

  return (
    <View style={styles.signupBox}>
      {/* {inputs.map((boxLabel, index) => (
        <View key={index} style={styles.inputBoxes}>
          <Text style={styles.inputLabel}>{boxLabel}</Text>
          <TextInput style={styles.inputBox} />
        </View>
      ))} */}
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
      {/* <Inputs boxLabel="Email" />
      <Inputs boxLabel="Password" /> */}
      {/* <LoginBtn
        btnTxt={btnTxt}
        navigation={navigation}
        navigateString={"Home"}
      /> */}

      {/*login button */}
      <TouchableOpacity style={styles.signupBtn} onPress={() => insertData()}>
        <Text style={styles.signupBtnTxt}>{btnTxt}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpBox;

const styles = StyleSheet.create({
  signupBox: {
    // flex: 0.1,
    // flexShrink: 0,
    // marginTop: "50%",
    justifyContent: "center",
    marginHorizontal: 20,
  },
  signupBtn: {
    flex: 1,
    flexShrink: 2,
    marginVertical: 8,
    backgroundColor: "#007AFF",
    alignSelf: "center",
    // textAlign: "center",
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
