//this is the screen that shows the details of a request ticket and
//allows the admin to update the status and decision of the request

import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { updateCheckMailRequest } from "../../databaseHelper";

const RequestDetails = ({ navigation, route }) => {
  //receive request ticket details
  const { ticket } = route.params;

  //state for updating the request
  const [updateRequest, setUpdateRequest] = useState(ticket);

  //format expected date
  const formattedExpectedDate = new Date(
    updateRequest.ExpectedDate
  ).toLocaleDateString();

  //format date of request
  const formattedDateOfRequest = new Date(
    updateRequest.DateOfRequest
  ).toLocaleDateString();

  //update the request in the database
  const updateHelpTicketInDB = async () => {
    try {
      const result = await updateCheckMailRequest(
        updateRequest.Status,
        updateRequest.Decision,
        updateRequest.RequestID
      );
      console.log(result);
      //   Alert.alert(
      //     "Update Successful",
      //     "Check Mail Request Updated Successfully"
      //   );
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          //   flex: 1,
          justifyContent: "flex-start",
          alignItems: "center",
          //   marginBottom: 300,
        }}
      >
        <View style={styles.card}>
          <Text style={styles.row}>
            <Text style={styles.label}>Request ID:</Text>{" "}
            {updateRequest.RequestID}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Owner:</Text> {updateRequest.Fname}{" "}
            {updateRequest.Lname}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Mail Type:</Text>{" "}
            {updateRequest.MailType}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Extra Info:</Text> {"\n"}
            {updateRequest.ExtraInfo}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Request Date:</Text>{" "}
            {formattedDateOfRequest}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Expected Arrival Date:</Text>{" "}
            {formattedExpectedDate}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Days Waiting:</Text>{" "}
            {updateRequest.daysDifference}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Priority:</Text> {updateRequest.priority}
          </Text>
          {/* <Text style={styles.row}> */}
          <Text style={styles.label}>Status:</Text>
          {/* </Text> */}
          <Picker
            selectedValue={updateRequest.Status}
            onValueChange={(selectedValue) =>
              setUpdateRequest({ ...updateRequest, Status: selectedValue })
            }
          >
            <Picker.Item label="Unopened" value="Unopened" />
            <Picker.Item label="In Progress" value="In Progress" />
            <Picker.Item label="Complete" value="Complete" />
          </Picker>
          {/* <Text style={styles.row}> */}
          <Text style={styles.label}>Decision:</Text>
          {/* </Text> */}
          <Picker
            selectedValue={updateRequest.Decision}
            onValueChange={(selectedValue) =>
              setUpdateRequest({ ...updateRequest, Decision: selectedValue })
            }
          >
            <Picker.Item label="Pending" value="Pending" />
            <Picker.Item label="Found" value="Found" />
            <Picker.Item label="Missing" value="Missing" />
          </Picker>
        </View>
        <View
          style={{
            alignSelf: "flex-end",
            marginHorizontal: 20,
            marginVertical: 5,
          }}
        >
          <TouchableOpacity
            style={styles.submit}
            onPress={() => {
              updateHelpTicketInDB();
            }}
          >
            <Text style={styles.submitTxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default RequestDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // justifyContent: "flex-start",
    // alignItems: "center",
  },
  card: {
    // height: "80%",
    width: "90%",
    marginTop: 50,
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
  label: {
    fontWeight: "bold",
  },
  row: {
    marginVertical: 5,
  },
  submit: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
    marginBottom: 50,
  },
  submitTxt: {
    color: "#Fff",
  },
});
