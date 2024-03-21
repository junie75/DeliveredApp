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

      {/* {logOutBtn ? (
        <TouchableOpacity style={styles.logOutBtn}>
          <Text style={styles.logOutBtnTxt}>Logout</Text>
        </TouchableOpacity>
      ) : ( */}
      <View></View>
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // borderColor: "black",
    // borderWidth: 1,
    margin: Platform.OS === "ios" ? 20 : 10,
    marginTop: Platform.OS === "ios" ? 0 : 70,
    // height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoImageText: {
    width: 150,
    height: 50,
  },
  menu: {
    // alignItems: "flex-start",
    // left: -40,
    width: 20,
    height: 20,
  },
  logOutBtn: {
    // backgroundColor: "#007AFF",
    padding: 3,
    borderRadius: 8,
  },
  logOutBtnTxt: {
    // fontSize: 10,
    color: "#007AFF",
    textDecorationLine: "underline",
  },
  // menuButton: {
  //   display: none ,
  // },
});

export default Header;
