//this is the admin home screen
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useContext } from "react";
import Header from "../Screens/homeComp/Header";
import { imageLookup } from "../imageLookup";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import UserContext from "../../context/UserContext";

const AdminHome = ({ navigation }) => {
  //icon images
  imageName1 = "storageIcon";
  imageName2 = "mailIcon";
  imageName3 = "issuesIcon";
  imageName4 = "dbIcon";

  //load fonts
  const [fontsLoaded, fontError] = useFonts({
    "FragmentMono-Regular": require("../../assets/fonts/FragmentMono-Regular.ttf"),
    "FragmentMono-Italic": require("../../assets/fonts/FragmentMono-Italic.ttf"),
  });

  //get the update user function from the context
  const { updateUser } = useContext(UserContext);

  //check if fonts have loaded
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  //render the screen
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header navigation={navigation} showMenu={false} />
        <View style={styles.body}>
          <Text style={styles.portalTxt}>Admin Portal</Text>
          {/*navigation buttons*/}
          <View style={styles.btnContainer}>
            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.btnbackground}
                onPress={() => {
                  navigation.navigate("Storage Screen");
                }}
              >
                <Image source={imageLookup[imageName1]} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.btnTxt}>Storage Management</Text>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.btnbackground}
                onPress={() => {
                  navigation.navigate("Scan Mail");
                }}
              >
                <Image source={imageLookup[imageName2]} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.btnTxt}>Mail Management</Text>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity
                style={styles.btnbackground}
                onPress={() => navigation.navigate("Resolve Issues")}
              >
                <Image source={imageLookup[imageName3]} style={styles.icon} />
              </TouchableOpacity>
              <Text style={styles.btnTxt}>Resolve Issues</Text>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.logout}
            onPress={() => {
              // remove the saved user to logout and navigate to the login screen
              updateUser(null);
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.logoutTxt}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminHome;

//style the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  body: {
    flex: 1,
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
    marginHorizontal: 20,
    height: 500,
    columnGap: 20,
  },

  btn: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    marginVertical: 20,
    padding: 10,
  },

  btnbackground: {
    backgroundColor: "#fff",
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
  },

  btnTxt: {
    textAlign: "center",
    width: 120,
  },

  footer: {},

  logout: {
    backgroundColor: "#007AFF",
    borderRadius: 25,
    marginHorizontal: 40,
    padding: 10,
    marginBottom: 80,
  },

  logoutTxt: {
    textAlign: "center",
    fontSize: 20,
    color: "#fff",
  },
});
