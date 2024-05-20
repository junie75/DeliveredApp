//the screen that displays the user's deliveries.
//It fetches the user's deliveries from the database and displays them in a list.
//It also contains a button that allows the user to submit a check mail request if they are expecting a delivery.
import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getUserDeliveriesByID } from "../../databaseHelper";

import UserContext from "../../context/UserContext";

const DeliveriesScreen = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const [userDeliveries, setUserDeliveries] = useState([]);
  const [userHasDel, setUserHasDel] = useState(false);

  //get the user's deliveries from the database
  useEffect(() => {
    getUserDeliveriesByID(user.AccID, setUserDeliveries);
  }, []);

  useEffect(() => {
    if (userDeliveries.length > 0) {
      setUserHasDel(true);
    }
  }, [userDeliveries]);

  //converts the date received string to a date object and formats it to a string
  const convertDateReceived = (dateReceived) => {
    // Convert DateTime string to JavaScript Date object, appends Z to indicate UTC timezone
    const dateObject = new Date(dateReceived + "Z");

    // Format date
    const dateString = dateObject.toLocaleDateString(); // Get date string in local format

    // Format time
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const timeString = dateObject.toLocaleTimeString([], options); // Get time string in local format

    // Return object containing formatted date and time strings
    return { dateString, timeString };
  };

  //displays the user's deliveries in a list
  const showDeliveries = () => {
    //put deliveries in order from newest to oldest
    const reversedDeliveries = [...userDeliveries].reverse();

    //for each delivery, create a delivery box and display the delivery
    return reversedDeliveries.map((delivery, index) => {
      //convert the date received
      const { dateString, timeString } = convertDateReceived(
        delivery.DateReceived
      );

      //render the delivery box
      return (
        <View key={index} style={styles.deliveryBox}>
          <View style={styles.deliveryHeader}>
            <Text style={styles.headerName}>{delivery.MailType}</Text>

            <View style={styles.headerDetails}>
              <Text style={styles.details}>{dateString}</Text>
              <Text style={styles.details}>{timeString}</Text>
            </View>
          </View>

          <Text style={styles.trackNum}>
            Tracking Number:{" "}
            {delivery.TrackingNum != "null" ? delivery.TrackingNum : "N/A"}
          </Text>
          <Text style={styles.location}>
            Location:{" "}
            {
              //if it is a package delivery, display the mailroom location, otherwise display user's dorm
              delivery.MailType === "Package"
                ? "Treadaway Mailroom"
                : user.Address
            }
          </Text>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.boxContainer}>
            {/* delivery box */}
            {userHasDel ? (
              showDeliveries()
            ) : (
              <Text style={styles.noDel}>No deliveries to show.</Text>
            )}
            {/* {showDeliveries()} */}
          </View>

          <View style={styles.footer}>
            <Text style={styles.expecting}>Expecting a delivery?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Check Mail Request Form");
              }}
            >
              <Text style={styles.submit}>Submit a Check Mail Request</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DeliveriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  boxContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
    marginBottom: 80,
  },

  deliveryBox: {
    flexDirection: "column",
    height: 120,
    justifyContent: "space-evenly",
    borderBottomColor: "#BBB0C1",
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginBottom: 5,
  },

  deliveryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  headerName: {
    alignSelf: "flex-start",
    fontWeight: "bold",
  },

  headerDetails: {
    flexDirection: "row",
    width: 190,
    justifyContent: "space-around",
  },

  footer: {
    height: 50,
    alignItems: "center",
  },

  submit: {
    color: "blue",
    textDecorationLine: "underline",
  },

  details: {
    color: "gray",
  },

  noDel: {
    textAlign: "center",
    fontSize: 15,
    marginTop: "50%",
    color: "gray",
  },
});
