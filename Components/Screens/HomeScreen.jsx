import React, { useEffect, useState, useContext } from "react";
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
  Button,
} from "react-native";
import Header from "./homeComp/Header";
import Hero from "./homeComp/Hero";
import NavBtnBox from "./homeComp/NavBtnBox";
import { createDrawerNavigator } from "@react-navigation/drawer";
// import DeliveredDB from "../../DeliveredDB";
//navigation prop used to navigate between pages
import { getAccounts, insertAccount } from "../../databaseHelper";
import UserContext from "../../context/UserContext";

const Home = ({ navigation }) => {
  const [newDelivery, setNewDelivery] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const { user } = useContext(UserContext);

  //useEffect checks state of newDelivery and displays the alert
  useEffect(() => {
    if (newDelivery) {
      createAlert();
      setNewDelivery(false);
    }

    getAccounts(setAccounts);
  }, []);

  //same blue color as the check
  const logoColor = "#007AFF";

  //UNNEEDED, used to test alert
  // const displayAlert = () => {
  //   if (newDelivery) {
  //     createAlert();
  //     setNewDelivery(false);
  //   }
  // };

  const insertData = async (fname = "juni", lname = "ejere") => {
    try {
      await insertAccount(fname, lname);
    } catch (e) {
      Alert.alert(`Error inserting ${fname}`, e.message);
    }
  };

  //creates the alert pop up for if user logs in and they have received a new delivery
  const createAlert = () => {
    Alert.alert(
      "New Delivery",
      "You've got mail! Visit the Deliveries page to view your mail.",
      //array for the buttons displayed on the alert
      [
        {
          text: "Close",
          onPress: () => {
            console.log("close pressed");
          },
          style: "cancel",
        },
        {
          text: "Deliveries",
          onPress: () => {
            console.log("deliveries pressed");
            // console.log(myDB);
            // console.log(accounts);
            navigation.navigate("Deliveries");
          },
          isPreferred: "true",
        },
      ]
    );
  };

  const showAccounts = () => {
    //map the names to a row
    return accounts.map((accounts, index) => {
      //builds list of components based off of array
      return (
        //for each name, create this component
        <View key={index} style={styles.row}>
          <Text>AccID: {accounts.AccID}</Text>
          <Text>First Name: {accounts.Fname}</Text>
          <Text>Last Name: {accounts.Lname}</Text>
          <Text>Address: {accounts.Address}</Text>
          <Text>Email: {accounts.Email}</Text>
          <Text>Password: {accounts.Password}</Text>
          <Text>Phone: {accounts.Phone}</Text>
          <Text>isAdmin: {accounts.isAdmin}</Text>
          <Text />

          {/* <Button
              title="Update"
              onPress={() => updateName(name.id) /*console.log(name.id)/}
            /> */}
        </View>
      );
    });
  };

  // const imageName = "homeHero";
  const imageName = "onBoardHero";
  // const Drawer = createDrawerNavigator();
  return (
    // <ImageBackground
    //   source={require("../assets/AppBackground.png")}
    //   style={{
    //     height: "100%",
    //     width: "auto",
    //     margin: 0,
    //     justifyContent: "flex-start",
    //     flex: 1,
    //     resizeMode: "stretch",
    //     backgroundColor: "blue",
    //   }}
    // >
    // <Drawer.Navigator>
    // <>
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header showMenu={true} navigation={navigation} />
        {/* <Text style={styles.welcomeTxt}>Welcome, {user.Fname}</Text> */}
        <Hero imageName={imageName} />
        <NavBtnBox navigation={navigation} />
        {/* <Button title="test" onPress={() => insertData()} />
        <Button title="try" onPress={() => console.log(accounts)} />*/}
        {showAccounts()}
      </ScrollView>
    </SafeAreaView>
    // </>
    //* </Drawer.Navigator> */}
    // </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    backgroundColor: "#fff",
  },
  welcomeTxt: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 15,
    // alignContent: "center",
    // textAlign: "center",
    color: "#BBB0C1",
  },
  // header: {
  //   // borderColor: "black",
  //   // borderWidth: 1,
  //   margin: Platform.OS === "ios" ? 20 : 10,
  //   marginTop: Platform.OS === "ios" ? 0 : 70,
  //   // height: 100,
  //   flexDirection: "row",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  // },
  // logoText: {
  //   fontSize: 20,
  //   fontFamily: "System",
  //   // marginHorizontal: 10,
  //   fontWeight: "bold",
  //   marginRight: 10,
  // },
  // logoImage: {
  //   width: 60,
  //   height: 60,
  //   // alignItems: "center",
  // },
  // logoImageText: {
  //   width: 150,
  //   height: 50,
  // },
  // menu: {
  //   // alignItems: "flex-start",
  //   // left: -40,
  //   width: 20,
  //   height: 20,
  // },

  // //container holding welcome sign
  // welcomeBox: {
  //   height: 300,
  //   // borderColor: "black",
  //   // borderWidth: 10,
  //   borderRadius: 10,
  //   // flexWrap: "wrap",
  //   // textAlign: "center",
  //   marginHorizontal: 12,
  //   // backgroundColor: "rgba(52, 152, 219, 0.2)",
  //   justifyContent: "center",
  //   alignItems: "flex-start",
  // },

  // //welcome to delivered text
  // welcomeText: {
  //   display: "none",
  //   fontSize: 50,
  //   fontWeight: "bold",
  //   lineHeight: 80,
  //   // fontFamily: "System",
  //   // color: "lightblue",
  //   // color: logoColor,
  // },

  // // welcomeDelivered: {
  // //   fontSize: 50,
  // //   fontWeight: "bold",
  // //   lineHeight: 80,
  // //   // fontFamily: "System",
  // // },

  // //delivered-check
  // welcomeImage: {
  //   display: "none",
  //   height: 65,
  //   width: 65,
  //   position: "absolute",
  //   //change location based on device, default is hidden
  //   ...Platform.select({
  //     ios: {
  //       top: 189,
  //       left: 260,
  //     },
  //     android: {
  //       top: 170,
  //       left: 190,
  //     },
  //     default: {
  //       display: "none",
  //     },
  //   }),
  // },

  // //background image behind text
  // welcomeBackground: {
  //   marginHorizontal: 10,
  // },

  // navButtons: {
  //   // borderColor: "black",
  //   // borderWidth: 1,
  //   borderRadius: 10,
  //   backgroundColor: "#fff",
  //   // borderRadius: 8, // Border radius for rounded corners (adjust as needed)
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.3, // Shadow opacity (adjust as needed)
  //   // shadowRadius: 4, // Shadow radius (adjust as needed)
  //   elevation: 5, //android specific, no effect on ios
  //   paddingVertical: 10,
  //   paddingHorizontal: 10,
  //   marginHorizontal: 20,
  //   marginVertical: 5,
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "flexStart",
  //   flexDirection: "row",
  // },

  // navButtonText: {
  //   // fontFamily: "System",
  //   marginLeft: 10,
  // },

  // navButtonBox: {
  //   // borderColor: "black",
  //   // borderWidth: 1,
  //   height: 300,
  // },

  // navIcon: {
  //   width: 64,
  //   height: 64,
  // },
});
