import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import UserContext from "../../context/UserContext";
import DateTimePicker from "@react-native-community/datetimepicker";

const NewRequestForm = ({ navigation }) => {
  const { user } = useContext(UserContext);
  const currentDate = new Date();
  const [request, setRequest] = useState({
    AccID: user.AccID,
    Fname: user.Fname,
    Lname: user.Lname,
    MailType: null,
    DateOfRequest: currentDate,
    ExpectedDate: null,
    Status: "Unopened",
    Decision: null,
    ExtraInfo: "",
  });
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView style={styles.fieldsContainer}>
        <View style={styles.fieldsBox}>
          <Text style={styles.fieldName}>First Name</Text>
          <TextInput
            style={styles.input}
            value={request.Fname}
            editable={false}
            // onChangeText={(value) => setRequest({ ...request, Fname: value })}
          />
          <Text style={styles.fieldName}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={request.Lname}
            editable={false}
            // onChangeText={(value) => setRequest({ ...request, Lname: value })}
          />
          <Text style={styles.fieldName}>
            Are you expecting a package or a letter?
          </Text>
          <TextInput style={styles.input} value={request.MailType} />
          <Text style={styles.fieldName}>Today's Date</Text>
          <TextInput
            style={styles.input}
            value={currentDate.toLocaleDateString()}
            editable={false}
          />
          <Text style={styles.fieldName}>Expected Date of Arrival</Text>
          <DateTimePicker
            mode="date"
            value={new Date()}
            display="spinner"
            onChange={(value) =>
              setRequest({ ...request, ExpectedDate: value })
            }
          />
          <Text style={styles.fieldName}>
            Relevant information {"(Tracking number, etc.)"}
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
  },
  fieldName: {
    fontWeight: "300",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
});
