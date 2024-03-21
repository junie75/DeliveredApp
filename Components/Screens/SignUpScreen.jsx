import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import SignUpBox from "./loginSignupComp/SignUpBox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Hero from "./homeComp/Hero";
import Header from "./homeComp/Header";

const SignUp = ({ navigation }) => {
  const imageName = "createAccImage";
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.container} behavior="position">
          <Header showMenu={false} />
          {/* <Text style={styles.headerText}>Create Account</Text> */}
          <Hero imageName={imageName} />
          <SignUpBox
            arr={[
              "First Name",
              "Last Name",
              "Password",
              // "Dorm Building",
              // "Room Number",
              // "Email",
              // "Phone Number",
            ]}
            navigation={navigation}
            btnTxt={"Create Account"}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.newHere}>Already have an account? Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  headerText: {
    fontSize: 18,
    fontFamily: "System",
    // alignSelf: "center",
    // marginTop: 20,
    // fontWeight: "bold",
    marginHorizontal: 20,
    // color: "#007AFF",
  },
  newHere: {
    textAlign: "center",
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});
