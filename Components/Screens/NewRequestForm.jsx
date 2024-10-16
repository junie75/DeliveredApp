// Purpose: This file contains the form for the user to submit a new check mail request.
//The user can select whether they are expecting a package or a letter, the expected date of arrival,
//and any relevant information.
//The user can submit the form, which will insert the request into the database and
//send the user to the "view recent check mail requests screen".
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UserContext from "../../context/UserContext";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { insertCheckMailRequest } from "../../databaseHelper";

const NewRequestForm = ({ navigation }) => {
  //get the user from the context
  const { user } = useContext(UserContext);
  //get the current date
  const currentDate = new Date();
  //state to hold the request data
  const [request, setRequest] = useState({
    AccID: user.AccID,
    MailType: "Package",
    DateOfRequest: currentDate,
    ExpectedDate: new Date(),
    Status: "Unopened",
    Decision: null,
    ExtraInfo: "",
  });

  //insert the request into the database
  const insertRequest = async () => {
    //format date of request and expected date
    const formattedDateOfRequest = request.DateOfRequest.toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const formattedExpectedDate = request.ExpectedDate.toISOString()
      .slice(0, 19)
      .replace("T", " ");

    //insert into check mail request database
    try {
      await insertCheckMailRequest(
        request.AccID,
        request.MailType,
        formattedDateOfRequest,
        formattedExpectedDate,
        request.Status,
        request.Decision,
        request.ExtraInfo
      );
      //confirmation to the user
      Alert.alert(
        "Request Submitted",
        "Your Check Mail Request has been successfully submitted."
      );
      //send user to "view recent check mail requests screen"
      // navigation.navigate("Past Requests");
      navigation.replace("Past Requests");
    } catch (e) {
      Alert.alert(`Error inserting`, e.message);
    }
  };

  //handle the change in the date picker
  const handleDateChange = (event, selectedDate) => {
    if (selectedDate !== undefined) {
      setRequest({ ...request, ExpectedDate: selectedDate });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView style={styles.fieldsContainer}>
        <View style={styles.fieldsBox}>
          <Text style={styles.fieldName}>
            Are you expecting a package or a letter?
          </Text>
          <Picker
            selectedValue={request.MailType}
            onValueChange={(selectedValue) =>
              setRequest({ ...request, MailType: selectedValue })
            }
          >
            <Picker.Item label="Package" value="Package" />
            <Picker.Item label="Letter" value="Letter" />
          </Picker>
          <Text style={styles.fieldName}>Expected Date of Arrival</Text>
          <DateTimePicker
            style={{
              width: 100,
              alignSelf: "flex-start",
              marginBottom: 10,
              borderColor: "#007AFF",
              borderWidth: 1,
              borderRadius: 10,
            }}
            mode="date"
            value={request.ExpectedDate}
            minimumDate={new Date(2024, 0, 1)}
            maximumDate={currentDate}
            onChange={handleDateChange}
          />
          <Text style={styles.fieldName}>
            Relevant information {"(Tracking number, Sender, etc.)"}
          </Text>
          <TextInput
            style={[styles.input, { height: 150 }]}
            value={request.ExtraInfo}
            multiline={true}
            onChangeText={(value) =>
              setRequest({ ...request, ExtraInfo: value })
            }
          />
        </View>
        <View style={{ alignItems: "flex-end", marginHorizontal: 10 }}>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => {
              console.log(request);
              insertRequest();
            }}
          >
            <Text style={styles.submitTxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default NewRequestForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  fieldsContainer: {
    marginHorizontal: 20,
  },
  fieldsBox: {
    marginVertical: 10,
    marginTop: 20,
  },
  fieldName: {
    fontWeight: "300",
    marginVertical: 10,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  submit: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 10,
  },
  submitTxt: {
    color: "#Fff",
  },
});
