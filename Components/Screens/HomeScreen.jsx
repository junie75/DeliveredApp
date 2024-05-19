//component that displays the client interface home page upon login
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
  ActivityIndicator,
} from "react-native";
import Header from "./homeComp/Header";
import Hero from "./homeComp/Hero";
import NavBtnBox from "./homeComp/NavBtnBox";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { getAccounts, insertAccount } from "../../databaseHelper";
import UserContext from "../../context/UserContext";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

//receives the navigation prop from the stack navigator
const Home = ({ navigation }) => {
  const [newDelivery, setNewDelivery] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const { user } = useContext(UserContext);

  //used to display loading screen while waiting for images to load
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalImages, setTotalImages] = useState(1); // Update this with the total number of images

  //useEffect checks state of newDelivery and displays the alert
  useEffect(() => {
    checkForAlert();
    //USED FOR VIEWING ACCOUNTS IN DATABASE DEBUGGING
    getAccounts(setAccounts);
  }, []);

  //failed attempt at loading screen
  const handleImageLoad = () => {
    // setLoading(false); // Set loading to false when the image is loaded
    setLoadedCount((prevCount) => prevCount + 1);
  };

  //will result in "true"  when all the images are loaded
  const allImagesLoaded = loadedCount === totalImages;

  //same blue color as the check
  const logoColor = "#007AFF";

  //DEBUGGING   //inserts a new account into the database
  // const insertData = async (fname = "juni", lname = "ejere") => {
  //   try {
  //     await insertAccount(fname, lname);
  //   } catch (e) {
  //     Alert.alert(`Error inserting ${fname}`, e.message);
  //   }
  // };

  //check if user's ACCID is set in secure storage with a 1 value signifying a new delivery
  const checkForAlert = async () => {
    //check value of newDelivery in secure storage
    const isAlert = await AsyncStorage.getItem(`${user.AccID}`);

    //if newDelivery is true, create the alert
    if (isAlert && isAlert == "true") {
      createAlert();

      //resets the newDelivery alert to false so alert only appears once
      await AsyncStorage.setItem(`${user.AccID}`, "false");
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

  //DEBUGGING  //displays the accounts in the database
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

  //image name for the hero image
  const imageName = "onBoardHero";
  return (
    <SafeAreaView style={styles.container}>
      {/* {allImagesLoaded ? ( */}
      <ScrollView>
        <Header showMenu={true} navigation={navigation} />
        {/* <Text style={styles.welcomeTxt}>Welcome, {user.Fname}</Text> */}
        <Hero imageName={imageName} /*onImageLoad={handleImageLoad}*/ />
        <NavBtnBox navigation={navigation} />
        {/* <Button title="test" onPress={() => insertData()} />
        <Button title="try" onPress={() => console.log(accounts)} />*/}
        {/* {showAccounts()} */}
      </ScrollView>
      {/* ) : ( */}
      {/* <ActivityIndicator size="large" color="#007AFF" /> */}
      {/* )} */}
    </SafeAreaView>
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
    color: "#BBB0C1",
  },
});
