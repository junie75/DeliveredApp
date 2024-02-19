import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Hero from "./homeComp/Hero";
import Header from "./homeComp/Header";
import LoginBtn from "./loginSignupComp/LoginBtn";
import NavBtn from "./homeComp/NavBtn";

const OnboardingScreen = ({ navigation }) => {
  const imageName = "onBoardHero";
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          justifyContent: "space-around",
        }}
      >
        {/* <Header showMenu={false} /> */}
        <View style={styles.welcomeTxt}>
          <Text style={styles.h1}>Welcome to Delivered.</Text>
          <Image
            source={require("../../assets/deliveredCheck.png")}
            style={styles.welcomeImage}
          />
          <Text style={styles.h2}>
            Please login or create an account to continue using our app.
          </Text>
        </View>
        <Hero imageName={imageName} />

        {/* <LoginBtn
          btnTxt={"Get Started"}
          navigation={navigation}
          navigateString={"SignUp"}
        /> */}
        <View style={styles.navigation}>
          <TouchableOpacity
            style={styles.btnleft}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.btntxt}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnright}>
            <Text style={styles.btntxt}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcomeTxt: {
    marginBottom: 15,
  },
  // //delivered-check
  welcomeImage: {
    // display: "none",
    height: 40,
    width: 40,
    position: "absolute",
    //change location based on device, default is hidden
    ...Platform.select({
      ios: {
        top: 62,
        left: 160,
      },
      android: {
        top: 170,
        left: 190,
      },
      default: {
        display: "none",
      },
    }),
  },
  h1: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 15,
    // lineHeight: 80,
  },
  h2: {
    fontSize: 12,
    // color: "#BBB0C1",
  },

  navigation: {
    flexDirection: "row",
    justifyContent: "space-around",
  },

  btnleft: {
    borderRadius: 10,
    backgroundColor: "#BBB0C1",
    padding: 20,
    width: "45%",
  },

  btntxt: {
    color: "white",
    fontSize: 20,
    alignSelf: "center",
  },

  btnright: {
    borderRadius: 10,
    backgroundColor: "#007AFF",
    padding: 20,
    width: "45%",
  },
});
