import React from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Platform,
  Alert,
} from "react-native";

const Hero = ({ imageURL }) => {
  return (
    <ImageBackground
      source={require("../../../assets/signInHero.png")}
      imageStyle={styles.welcomeBackground}
    >
      <View style={styles.welcomeBox}>
        {/* <Text style={styles.welcomeText}>Welcome to {"\n"}Delivered.</Text>
    {/* <Text style={styles.welcomeDelivered}>Delivered.</Text> /}
    <Image
      source={require("../../assets/deliveredCheck.png")}
      style={styles.welcomeImage}
    /> */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  //container holding welcome sign
  welcomeBox: {
    height: 300,
    // borderColor: "black",
    // borderWidth: 10,
    borderRadius: 10,
    // flexWrap: "wrap",
    // textAlign: "center",
    marginHorizontal: 12,
    // backgroundColor: "rgba(52, 152, 219, 0.2)",
    justifyContent: "center",
    alignItems: "flex-start",
  },

  //   //welcome to delivered text
  //   welcomeText: {
  //     fontSize: 50,
  //     fontWeight: "bold",
  //     lineHeight: 80,
  //     // fontFamily: "System",
  //     // color: "lightblue",
  //     // color: logoColor,
  //   },

  // welcomeDelivered: {
  //   fontSize: 50,
  //   fontWeight: "bold",
  //   lineHeight: 80,
  //   // fontFamily: "System",
  // },

  //delivered-check
  welcomeImage: {
    display: "none",
    height: 65,
    width: 65,
    position: "absolute",
    //change location based on device, default is hidden
    ...Platform.select({
      ios: {
        top: 189,
        left: 260,
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

  //background image behind text
  welcomeBackground: {
    marginHorizontal: 10,
  },
});

export default Hero;
