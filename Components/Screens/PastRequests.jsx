//this displays all the past requests made by the user
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { getUserCheckRequestsByID } from "../../databaseHelper";

const PastRequests = () => {
  //get the user from the context
  const { user } = useContext(UserContext);
  const [userRequests, setUserRequests] = useState([]);

  useEffect(() => {
    //get all the check requests belonging to the user upon load
    getUserCheckRequestsByID(user.AccID, setUserRequests);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          //map through all the user's requests and display them from newest to oldest
          userRequests.reverse().map((request, index) => {
            //convert dates to proper format
            const formattedExpectedDate = new Date(
              request.ExpectedDate + "Z"
            ).toLocaleDateString();
            const formattedDateOfRequest = new Date(
              request.DateOfRequest + "Z"
            ).toLocaleDateString();

            return (
              <View style={styles.box} key={index}>
                <View style={styles.boxHeader}>
                  <Text style={{ fontWeight: 200 }}>
                    Check {request.MailType} Request
                  </Text>
                </View>

                <View style={styles.boxBody}>
                  <View style={styles.userInfo}>
                    <Text style={styles.txt}>
                      <Text style={styles.label}>Request Date:</Text>{" "}
                      {formattedDateOfRequest}
                    </Text>
                    <Text style={styles.txt}>
                      <Text style={styles.label}>Expected Date:</Text>{" "}
                      {formattedExpectedDate}
                    </Text>
                    <Text style={styles.txt}>
                      <Text style={styles.label}>Extra Info:</Text>{" "}
                      {request.ExtraInfo}
                    </Text>
                  </View>

                  <View style={styles.adminInfo}>
                    <Text style={styles.txt}>
                      <Text style={styles.label}>Status:</Text> {request.Status}
                    </Text>
                    <Text style={styles.txt}>
                      <Text style={styles.label}>Decision: </Text>
                      {request.Decision ? request.Decision : "Pending"}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        }
      </ScrollView>
    </View>
  );
};

export default PastRequests;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  box: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    borderBottomColor: "#BBB0C1",
    borderBottomWidth: 1,
    paddingVertical: 15,
    marginBottom: 5,
    marginHorizontal: 10,
  },
  boxHeader: {
    marginBottom: 5,
  },
  label: {
    fontWeight: "bold",
  },
  boxBody: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userInfo: {
    flex: 1,
  },
  adminInfo: {
    flex: 1,
    alignItems: "center",
  },
  txt: {
    fontSize: 10,
  },
});
