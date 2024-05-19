//piece of component for the navigation buttons on the home screen
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import React from "react";
import { imageLookup } from "../../imageLookup";

//sent navigation details, button text, and icon details
const NavBtn = ({ navigation, navigateString, iconURI, text, imageName }) => {
  return (
    <TouchableOpacity
      style={styles.navButtons}
      onPress={() => navigation.navigate(navigateString)}
    >
      <Image source={imageLookup[imageName]} style={styles.navIcon} />
      <Text style={styles.navButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  navButtons: {
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, // Shadow opacity (adjust as needed)
    elevation: 5, //android specific, no effect on ios
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    marginVertical: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "flexStart",
    flexDirection: "row",
  },

  navButtonText: {
    marginLeft: 10,
  },

  navIcon: {
    width: 58,
    height: 58,
  },
});

export default NavBtn;
