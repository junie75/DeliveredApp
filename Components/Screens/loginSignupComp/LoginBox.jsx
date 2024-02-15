import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Inputs from "./Inputs";
import LoginBtn from "./LoginBtn";

const LoginBox = ({ arr, navigation }) => {
  const inputs = arr;

  return (
    <View style={styles.loginBox}>
      {inputs.map((boxLabel, index) => (
        <Inputs key={index} boxLabel={boxLabel} />
      ))}
      {/* <Inputs boxLabel="Email" />
      <Inputs boxLabel="Password" /> */}
      <LoginBtn
        btnTxt={"Login"}
        navigation={navigation}
        navigateString={"Home"}
      />
    </View>
  );
};

export default LoginBox;

const styles = StyleSheet.create({
  loginBox: {
    // marginTop: "50%",
    justifyContent: "center",
    marginHorizontal: 20,
  },
});
