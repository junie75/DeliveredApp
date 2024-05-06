//container for the nav buttons on the home screen
import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import NavBtn from "./NavBtn";

const NavBtnBox = ({ navigation }) => {
  //icon images
  imageName1 = "pckgIcon";
  imageName2 = "globeIcon";
  imageName3 = "aboutIcon";
  return (
    <View style={styles.navButtonBox}>
      {/*navigation buttons*/}
      <NavBtn
        navigation={navigation}
        navigateString={"Deliveries"}
        iconURI={
          "https://img.icons8.com/nolan/64/1A6DFF/C822FF/successful-delivery.png"
        }
        text={"See your recent deliveries"}
        imageName={imageName1}
      />
      <NavBtn
        navigation={navigation}
        navigateString={"Mailroom Map"}
        iconURI={"https://img.icons8.com/nolan/64/1A6DFF/C822FF/map-marker.png"}
        text={"View the interactive mail map"}
        imageName={imageName2}
      />
      <NavBtn
        navigation={navigation}
        navigateString={"How-To Page"}
        iconURI={"https://img.icons8.com/nolan/64/1A6DFF/C822FF/about.png"}
        text={"How does the mailroom work?"}
        imageName={imageName3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navButtonBox: {
    height: 300,
  },
});

export default NavBtnBox;
