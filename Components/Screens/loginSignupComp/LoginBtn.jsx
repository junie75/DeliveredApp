// creates a button component for login and signup screens

import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

//given button text, navigation, and string to navigate to
const LoginBtn = ({ btnTxt, navigation, navigateString }) => {
  return (
    <TouchableOpacity
      style={styles.loginBtn}
      onPress={() => navigation.navigate(navigateString)}
    >
      <Text style={styles.loginBtnTxt}>{btnTxt}</Text>
    </TouchableOpacity>
  );
};

export default LoginBtn;

const styles = StyleSheet.create({
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
});
