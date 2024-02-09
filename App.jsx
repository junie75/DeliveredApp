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
import Header from "./Components/Screens/homeComp/Header";
import Hero from "./Components/Screens/homeComp/Hero";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
export default function App() {
  return (
    <SafeAreaView>
      <View>
        <Header showMenu={false} />

        <KeyboardAwareScrollView behavior="position">
          <Hero imageURL={"../../../assets/signInHero.png"} />
          {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
          <View style={styles.loginBox}>
            <View style={styles.inputBoxes}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput style={styles.inputBox} />
            </View>

            <View style={styles.inputBoxes}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput style={styles.inputBox} />
            </View>
            <TouchableOpacity style={styles.loginBtn}>
              <Text style={styles.loginTxt}>Login</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity>
            <Text style={styles.newHere}>New here? Create Account</Text>
          </TouchableOpacity>
          {/* </TouchableWithoutFeedback> */}
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginBox: {
    // marginTop: "50%",
    justifyContent: "center",
    marginHorizontal: 20,
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
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3, // Shadow opacity (adjust as needed)
    // // shadowRadius: 4, // Shadow radius (adjust as needed)
    // elevation: 5, //android specific, no effect on ios
  },
  loginBtn: {
    marginVertical: 8,
    backgroundColor: "#007AFF",
    alignSelf: "center",
    // textAlign: "center",
    width: "100%",
    borderRadius: 30,
  },

  loginTxt: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10,
  },

  newHere: {
    textAlign: "center",
    color: "#007AFF",
  },
});
