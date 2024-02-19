import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import LoginBox from "./loginSignupComp/LoginBox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const SignUp = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={styles.container} behavior="position">
          <Text style={styles.headerText}>Create an Account</Text>
          <LoginBox
            arr={[
              "First Name",
              "Last Name",
              "Password",
              "Dorm Building",
              "Room Number",
              "Email",
              "Phone Number",
            ]}
            navigation={navigation}
            btnTxt={"Create Account"}
          />
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
    fontSize: 20,
    fontFamily: "System",
    marginTop: 10,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
