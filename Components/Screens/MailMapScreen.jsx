import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { imageLookup } from "../imageLookup";

const MailMapScreen = () => {
  const mapName = "schoolMap";
  const halls = [
    "Treadaway Hall (Mailroom)",
    "Andrew Cremer Hall",
    "Perigeaux Hall",
    "Founders Hall",
    "Chaminade Hall",
    "Marian Hall",
    "Lourdes Hall",
  ];

  const showMarkers = () => {
    return halls.map((hallName, index) => (
      <View key={index} style={styles.markerContainer}>
        <View style={styles.markerBox}></View>
        <Text style={styles.markerName}>{hallName}</Text>
      </View>
    ));
  };

  // inputs.map((boxLabel, index) => <Inputs key={index} boxLabel={boxLabel} />);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.wrapper}>
          <View>
            <Image style={styles.map} source={imageLookup[mapName]} />
          </View>
          {/* {halls.map((hallName) => {
            <View>
              <View>box</View>
              <Text>{hallName}</Text>
            </View>;
          })} */}
          {showMarkers()}
        </View>
      </ScrollView>
    </View>
  );
};

export default MailMapScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },

  wrapper: {
    marginHorizontal: 15,
  },

  map: {
    height: 400,
    width: "auto",
    // borderWidth: 3,
    // borderColor: "black",
  },

  markerContainer: {
    // borderWidth: 3,
    // borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 3,
    height: 50,
    width: "80%",
    marginBottom: 8,
  },

  markerBox: {
    height: 20,
    width: 20,
    backgroundColor: "navy",
  },
});
