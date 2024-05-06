//component for the header which contains the logo and menu buttons
import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  Platform,
  Text,
} from "react-native";
const Header = ({ navigation, showMenu }) => {
  return (
    <View style={styles.header}>
      {/*Header*/}
      {showMenu ? (
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.toggleDrawer()}
        >
          {/*menu button*/}

          <Image
            source={{
              uri: /* "https://icons8.com/icon/3096/menu",*/ "https://img.icons8.com/ios/50/menu--v1.png",
            }}
            style={styles.menu}
          />

          {/*icon*/}
        </TouchableOpacity>
      ) : (
        <View></View>
      )}

      {/*DELIVERED logo*/}
      <TouchableOpacity>
        <Image
          source={require("../../../assets/logotexttrans.png")}
          style={styles.logoImageText}
        />
      </TouchableOpacity>

      {/* Extra view used for layout*/}
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    //edit margins based on ios or android platform
    margin: Platform.OS === "ios" ? 20 : 10,
    marginTop: Platform.OS === "ios" ? 0 : 70,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoImageText: {
    width: 150,
    height: 50,
  },
  menu: {
    width: 20,
    height: 20,
  },
  logOutBtn: {
    padding: 3,
    borderRadius: 8,
  },
  logOutBtnTxt: {
    color: "#007AFF",
    textDecorationLine: "underline",
  },
});

export default Header;
