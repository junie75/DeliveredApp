import React from "react";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import NavBtn from "./NavBtn";

const NavBtnBox = ({ navigation }) => {
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
      />
      <NavBtn
        navigation={navigation}
        navigateString={"Mailroom Map"}
        iconURI={"https://img.icons8.com/nolan/64/1A6DFF/C822FF/map-marker.png"}
        text={"View the interactive mail map"}
      />
      <NavBtn
        navigation={navigation}
        navigateString={"How-To Page"}
        iconURI={"https://img.icons8.com/nolan/64/1A6DFF/C822FF/about.png"}
        text={"How does the mailroom work?"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  navButtonBox: {
    // borderColor: "black",
    // borderWidth: 1,
    height: 300,
  },
});

export default NavBtnBox;
