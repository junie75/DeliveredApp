import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import Header from "./homeComp/Header";
import Hero from "./homeComp/Hero";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Inputs from "./loginSignupComp/Inputs";
import LoginBtn from "./loginSignupComp/LoginBtn";
import LoginBox from "./loginSignupComp/LoginBox";
import { imageLookup } from "../imageLookup";

const Login = ({ navigation }) => {
  const imageName = "signInHero";

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header showMenu={false} />
        <KeyboardAwareScrollView behavior="position">
          <Hero imageName={imageName} />
          <LoginBox
            arr={["Email", "Password"]}
            navigation={navigation}
            btnTxt={"Login"}
          />
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.newHere}>New here? Create Account</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // loginBox: {
  //   // marginTop: "50%",
  //   justifyContent: "center",
  //   marginHorizontal: 20,
  // },
  // inputBoxes: {
  //   paddingVertical: 10,
  // },
  // inputLabel: {
  //   fontSize: 15,
  //   paddingBottom: 5,
  //   marginLeft: 10,
  //   // color: "lightgray",
  // },
  // inputBox: {
  //   // borderColor: "lightgray",
  //   borderRadius: 10,
  //   borderWidth: 1,
  //   // backgroundColor: "#fff",
  //   height: 60,
  //   // shadowColor: "#000",
  //   // shadowOffset: { width: 0, height: 2 },
  //   // shadowOpacity: 0.3, // Shadow opacity (adjust as needed)
  //   // // shadowRadius: 4, // Shadow radius (adjust as needed)
  //   // elevation: 5, //android specific, no effect on ios
  // },
  // loginBtn: {
  //   marginVertical: 8,
  //   backgroundColor: "#007AFF",
  //   alignSelf: "center",
  //   // textAlign: "center",
  //   width: "100%",
  //   borderRadius: 30,
  // },

  // loginTxt: {
  //   color: "white",
  //   textAlign: "center",
  //   fontSize: 20,
  //   paddingVertical: 10,
  // },

  newHere: {
    textAlign: "center",
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
