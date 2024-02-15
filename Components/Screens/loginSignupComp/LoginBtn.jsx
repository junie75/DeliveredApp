import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

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
});
