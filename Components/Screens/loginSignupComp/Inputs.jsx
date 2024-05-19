//component for input boxes in login and signup screens
import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

//takes in a label for the input box
const Inputs = ({ boxLabel }) => {
  return (
    <View style={styles.inputBoxes}>
      <Text style={styles.inputLabel}>{boxLabel}</Text>
      <TextInput style={styles.inputBox} />
    </View>
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
  },
  inputBox: {
    borderRadius: 10,
    borderWidth: 1,
    height: 60,
  },
});
