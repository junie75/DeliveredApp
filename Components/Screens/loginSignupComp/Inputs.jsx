import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const Inputs = ({ boxLabel }) => {
  return (
    <View style={styles.inputBoxes}>
      <Text style={styles.inputLabel}>{boxLabel}</Text>
      <TextInput style={styles.inputBox} />
    </View>

    // <View style={styles.inputBoxes}>
    //   <Text style={styles.inputLabel}>Password</Text>
    //   <TextInput style={styles.inputBox} />
    // </View>
  );
};

export default Inputs;

const styles = StyleSheet.create({
  inputBoxes: {
    paddingVertical: 10,
  },
  inputLabel: {
    fontSize: 15,
    paddingBottom: 5,
    marginLeft: 10,
    // color: "lightgray",
  },
  inputBox: {
    // borderColor: "lightgray",
    borderRadius: 10,
    borderWidth: 1,
    // backgroundColor: "#fff",
    height: 60,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3, // Shadow opacity (adjust as needed)
    // // shadowRadius: 4, // Shadow radius (adjust as needed)
    // elevation: 5, //android specific, no effect on ios
  },
});
