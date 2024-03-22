import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback } from "react";
import Header from "../Screens/homeComp/Header";
import { imageLookup } from "../imageLookup";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const AdminHome = ({ navigation }) => {
  imageName1 = "storageIcon";
  imageName2 = "mailIcon";
  imageName3 = "issuesIcon";
  imageName4 = "dbIcon";
  const [fontsLoaded, fontError] = useFonts({
    "FragmentMono-Regular": require("../../assets/fonts/FragmentMono-Regular.ttf"),
    "FragmentMono-Italic": require("../../assets/fonts/FragmentMono-Italic.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header navigation={navigation} showMenu={false} />
        <View style={styles.body}>
          <Text style={styles.portalTxt}>Admin Portal</Text>
          <View style={styles.btnContainer}>
            <View style={styles.btn}>
              <TouchableOpacity style={styles.btnbackground}>
                <Image source={imageLookup[imageName1]} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.btnTxt}>Storage Management</Text>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity style={styles.btnbackground}>
                <Image source={imageLookup[imageName2]} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.btnTxt}>Mail Management</Text>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity style={styles.btnbackground}>
                <Image source={imageLookup[imageName3]} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.btnTxt}>Resolve Issues</Text>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity style={styles.btnbackground}>
                <Image source={imageLookup[imageName4]} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.btnTxt}>Database Management</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.logout}>
            <Text style={styles.logoutTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
    // borderColor: "red",
    // borderWidth: 1,
  },

  body: {
    flex: 1,
    // borderColor: "green",
    // borderWidth: 1,
    // marginBottom: 80,
  },

  portalTxt: {
    marginTop: 0,
    textAlign: "center",
    fontSize: 25,
    fontFamily: "FragmentMono-Regular",
  },

  btnContainer: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    // alignContent: "stretch",
    // borderColor: "yellow",
    // borderWidth: 1,
    // height: 500,
    // width: 300,
    marginHorizontal: 20,
    // marginVertical: 0,
    height: 500,
    columnGap: 20,
  },

  btn: {
    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "blue",
    // borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 20,
    // margin: 30,
    padding: 10,
  },

  btnbackground: {
    // backgroundColor: "#007AFF",
    backgroundColor: "#fff",
    // borderRadius: 8, // Border radius for rounded corners (adjust as needed)
    // shadowColor: "#000",
    // // shadowColor: "#007AFF",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3, // Shadow opacity (adjust as needed)
    // // shadowRadius: 4, // Shadow radius (adjust as needed)
    // elevation: 5, //android specific, no effect on ios
    borderRadius: 10,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  icon: {
    width: 80,
    height: 80,
    // shadowColor: "#000",
    // // shadowColor: "#007AFF",
    // shadowOffset: { width: 0, height: 0 },
    // shadowOpacity: 0.1,
  },

  btnTxt: {
    textAlign: "center",
    width: 120,
    fontFamily: "FragmentMono-Regular",
  },

  footer: {
    // borderColor: "blue",
    // borderWidth: 1,
    // height: 50,
    // alignItems: "center",
  },

  logout: {
    backgroundColor: "#007AFF",
    borderRadius: 25,
    marginHorizontal: 40,
    padding: 10,
    marginBottom: 80,
    shadowColor: "#000",
    // shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3, // Shadow opacity (adjust as needed)
    // shadowRadius: 4, // Shadow radius (adjust as needed)
  },

  logoutTxt: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
  },
});
