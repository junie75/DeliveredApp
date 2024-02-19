import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Inputs from "./Inputs";
import LoginBtn from "./LoginBtn";

const LoginBox = ({ arr, navigation, btnTxt }) => {
  const inputs = arr;

  return (
    <View style={styles.loginBox}>
      {inputs.map((boxLabel, index) => (
        <Inputs key={index} boxLabel={boxLabel} />
      ))}
      {/* <Inputs boxLabel="Email" />
      <Inputs boxLabel="Password" /> */}
      <LoginBtn
        btnTxt={btnTxt}
        navigation={navigation}
        navigateString={"Home"}
      />
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
});
