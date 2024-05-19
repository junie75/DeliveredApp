// This file contains  the screen that is displayed when the user wants to log in to the app.
// It contains the login box component that contains the input fields and login button.
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

//receives the navigation prop
const Login = ({ navigation }) => {
  //image name for the hero image
  const imageName = "signInHero";

  //failed attempt to handle image load
  const handleImageLoad = () => {
    console.log("hello");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Header showMenu={false} />
        <KeyboardAwareScrollView behavior="position">
          <Hero imageName={imageName} onImageLoad={handleImageLoad} />
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

  newHere: {
    textAlign: "center",
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
