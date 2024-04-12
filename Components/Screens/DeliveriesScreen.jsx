import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getUserDeliveries, getUserDeliveriesByID } from "../../databaseHelper";

import UserContext from "../../context/UserContext";

const DeliveriesScreen = () => {
  const { user } = useContext(UserContext);
  const [userDeliveries, setUserDeliveries] = useState([]);
  const [userHasDel, setUserHasDel] = useState(false);

  useEffect(() => {
    getUserDeliveriesByID(user.AccID, setUserDeliveries);
  }, []);

  // const getDeliveries = async () => {
  //   console.log("test");
  //   const deliveries = await getUserDeliveries(user.AccID);
  //   return deliveries;
  // };

  const convertDateReceived = (dateReceived) => {
    const dateObject = new Date(dateReceived); // Convert DateTime string to JavaScript Date object

    // Format date
    const dateString = dateObject.toLocaleDateString(); // Get date string in local format

    // Format time
    const options = { hour: "numeric", minute: "numeric", hour12: true };
    const timeString = dateObject.toLocaleTimeString([], options); // Get time string in local format

    return { dateString, timeString }; // Return object containing formatted date and time strings
  };

  const showDeliveries = () => {
    // const deliveries = getDeliveries();
    // const deliveries = await getUserDeliveries(user.AccID);
    // console.log(deliveries);

    // if (!Array.isArray(deliveries) || deliveries.length === 0) {
    //   return (
    //     <View style={{ justifyContent: "center", alignItems: "center" }}>
    //       <Text>No deliveries to show</Text>
    //     </View>
    //   );
    // }
    return userDeliveries.map((delivery, index) => {
      const { dateString, timeString } = convertDateReceived(
        delivery.DateReceived
      );

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
            Tracking Number: {delivery.TrackingNum}
          </Text>
          <Text style={styles.location}>Location: Treadaway Mailroom</Text>
        </View>
      );
    });
  };

  // const showDeliveries = async () => {
  //   try {
  //     const deliveries = await getUserDeliveries(user.AccID);

  //     if (!Array.isArray(deliveries) || deliveries.length === 0) {
  //       return (
  //         <View style={{ justifyContent: "center", alignItems: "center" }}>
  //           <Text>No deliveries to show</Text>
  //         </View>
  //       );
  //     }

  //     return (
  //       <View>
  //         <Text>Test</Text>
  //         {/* {deliveries.map((delivery, index) => (
  //           <View key={index} style={styles.deliveryBox}>
  //             <Text style={styles.headerName}>{delivery.MailType}</Text>
  //             <Text style={styles.details}>
  //               Received: {delivery.DateReceived}
  //             </Text>
  //             <Text style={styles.details}>
  //               Tracking Number: {delivery.TrackingNum || "N/A"}
  //             </Text>
  //             <Text style={styles.details}>Location: {delivery.Location}</Text>
  //           </View>
  //         ))} */}
  //       </View>
  //     );
  //   } catch (error) {
  //     console.error("Error fetching deliveries:", error);
  //     return (
  //       <View style={{ justifyContent: "center", alignItems: "center" }}>
  //         <Text>Error fetching deliveries</Text>
  //       </View>
  //     );
  //   }
  // };

  // return deliveries;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.boxContainer}>
            {/* delivery box */}
            {/* {userHasDel ? (
              showDeliveries()
            ) : (
              <Text>No deliveries to show.</Text>
            )} */}
            {showDeliveries()}
          </View>

          <View style={styles.footer}>
            <Text style={styles.expecting}>Expecting a delivery?</Text>
            <TouchableOpacity>
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
    // backgroundColor: "#fff",
    // borderWidth: 10,
    // borderColor: "blue",
    // alignItems: "center",
  },

  boxContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    flex: 1,
    marginBottom: 80,
    // justifyContent: "center",
  },

  deliveryBox: {
    flexDirection: "column",
    // borderWidth: 1,
    // borderColor: "black",
    height: 100,
    // marginBottom: 15,
    justifyContent: "space-evenly",
    borderBottomColor: "#BBB0C1",
    borderBottomWidth: 1,
    marginBottom: 5,
  },

  deliveryHeader: {
    // borderWidth: 1,
    // borderColor: "black",
    flexDirection: "row",
    justifyContent: "space-between",
    // justifyContent: "center",
  },

  headerName: {
    // borderWidth: 1,
    // borderColor: "black",
    alignSelf: "flex-start",
    fontWeight: "bold",
  },

  headerDetails: {
    // borderWidth: 1,
    // borderColor: "black",
    flexDirection: "row",
    width: 190,
    // alignSelf: "center",
    justifyContent: "space-around",
    // alignItems: "stretch",
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
});
