import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Hero from "./homeComp/Hero";

const HowToScreen = () => {
  imageName = "howToImage";
  return (
    <View style={styles.container}>
      <ScrollView>
        <Hero imageName={imageName} />
        <View style={styles.textContainers}>
          <Text style={styles.textHeader}>General Information</Text>
          <Text>
            Mail is delivered Monday through Friday to each residence hall
            before 5 p.m. There is no delivery on Saturday, Sunday, holidays,
            break periods, or when the University is closed.{" "}
          </Text>
        </View>

        {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}> */}
        <View style={styles.textContainers}>
          <Text style={styles.textHeader}>Hours</Text>
          <Text>
            Monday: 8am-5pm {"\n"}
            Tuesday: 8am-5pm {"\n"}
            Wednesday: 8am-5pm {"\n"}
            Thursday: 8am-5pm {"\n"}
            Friday: 8am-5pm
            {"\n"}Saturday: Closed {"\n"}Sunday: Closed
          </Text>
        </View>
        <View style={styles.textContainers}>
          <Text style={styles.textHeader}>Location</Text>
          <Text>
            The St. Mary's University Mailroom is located in the mailroom on the
            1st floor of Treadaway Hall.
          </Text>
        </View>
        {/* </View> */}
        <View style={styles.textContainers}>
          <Text style={styles.textHeader}>Dorm Addressing</Text>
          <Text style={{ fontStyle: "italic" }}>
            Name of Resident{"\n"}St. Mary’s University {"\n"}1 Camino Santa
            Maria {"\n"}Hall Abbreviation and Room Number {"\n"}San Antonio, TX,
            Zip Code
          </Text>
        </View>

        {/*ADD TABLE WITH BUILDING CODES AND ZIPCODES HERE */}
      </ScrollView>
    </View>
  );
};

export default HowToScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },

  textContainers: {
    marginVertical: 10,
  },

  textHeader: {
    fontWeight: "bold",
    fontSize: 18,
    color: "navy",
    color: "#007AFF",
  },
});
