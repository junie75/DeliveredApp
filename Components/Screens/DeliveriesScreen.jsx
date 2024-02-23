import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DeliveriesScreen = () => {
  const showDeliveries = () => {
    let deliveries = [];
    for (let i = 0; i < 5; i++) {
      deliveries.push(
        <View key={i} style={styles.deliveryBox}>
          <View style={styles.deliveryHeader}>
            <Text style={styles.headerName}>Package</Text>

            <View style={styles.headerDetails}>
              <Text style={styles.details}>11/21/23</Text>
              <Text style={styles.details}>12:45pm</Text>
            </View>
          </View>

          <Text style={styles.trackNum}>Tracking Number: 834982092004</Text>
          <Text style={styles.location}>Location: Treadaway Mailroom</Text>
        </View>
      );
    }

    return deliveries;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <View style={styles.boxContainer}>
            {/* delivery box */}
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
