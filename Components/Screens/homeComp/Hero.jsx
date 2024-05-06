//component that displays a hero of whatever image name is passed to it using imageLookup.js

import React, { useState } from "react";
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
import { imageLookup } from "../../imageLookup";

const Hero = ({ imageName }) => {
  return (
    <ImageBackground
      source={imageLookup[imageName]}
      imageStyle={styles.welcomeBackground}
    >
      <View style={styles.welcomeBox}></View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  //container holding welcome sign
  welcomeBox: {
    height: 300,
    borderRadius: 10,
    marginHorizontal: 12,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  //background image behind text
  welcomeBackground: {
    marginHorizontal: 10,
  },
});

export default Hero;
