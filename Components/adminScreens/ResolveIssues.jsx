//this page is for the admin to view and resolve issues

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import { CheckBox, SearchBar } from "react-native-elements";
import { imageLookup } from "../imageLookup";
import { useState } from "react";
import { getCheckMailRequests } from "../../databaseHelper";
import { useFocusEffect } from "@react-navigation/native";

const ResolveIssues = ({ navigation }) => {
  //icon images for priority
  let redIcon = "alertRed";
  let orangeIcon = "alertOrange";
  let greenIcon = "alertGreen";

  const [helpTickets, setHelpTickets] = useState([]);
  const [helpTicketsFound, setHelpTicketsFound] = useState(false);
  const currentDate = new Date();

  useFocusEffect(
    React.useCallback(() => {
      // This function will be called every time the screen comes into focus
      // You can put any logic here that you want to execute when the screen comes into focus
      // console.log('First Component is focused'); // For testing purposes

      getCheckMailRequests((tickets) => {
        // Calculate priority for each ticket
        const updatedTickets = tickets.map(calculatePriority);
        setHelpTickets(updatedTickets);
      });
    }, [])
  );

  useEffect(() => {
    if (helpTickets.length > 0) {
      setHelpTicketsFound(true);
    }
  }, [helpTickets]);

  //high priority: Urgent & require immediate attention // time > 72 hrs
  //medium priority: Moderately urgent // 72hrs > time > 48 hrs
  //low priority: Not urgent // 48 hrs > time > 24hrs
  const calculatePriority = (ticket) => {
    //convert expected date into a date object
    const expectedDate = new Date(ticket.ExpectedDate + "Z");

    //calculate difference between expected date of arrival and current date in milliseconds
    const timeDifference = currentDate.getTime() - expectedDate.getTime();

    //convert the time difference to days
    const daysDifference = (timeDifference / (1000 * 3600 * 24)).toFixed(2);

    let imageName = "";
    let priority = "";

    if (daysDifference >= 3) {
      priority = "High";
      imageName = redIcon;
    } else if (daysDifference < 3 && daysDifference >= 2) {
      priority = "Medium";
      imageName = orangeIcon;
    } else {
      priority = "Low";
      imageName = greenIcon;
    }

    const newTicket = {
      ...ticket,
      daysDifference: daysDifference,
      imageName: imageName,
      priority: priority,
    };

    return newTicket;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ marginVertical: 10 }}>
          {/* <SearchBar
            placeholder="Search"
            lightTheme
            round
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchBar}
            inputStyle={styles.searchBarTxt}
          /> */}
        </View>

        <View style={styles.labelHolder}>
          <Text style={[styles.txt, styles.label]}>User</Text>
          <Text style={[styles.txt, styles.label]}>Type</Text>
          <Text style={[styles.txt, styles.label]}>Date</Text>
          <Text style={[styles.txt, styles.label]}>Priority</Text>
          <Text style={[styles.txt, styles.label]}>Status</Text>
        </View>
        {/*Display each help ticket */}

        {helpTicketsFound ? (
          <View style={styles.rows}>
            {helpTickets.map((ticket, index) => {
              //format Expecteded date
              const formattedExpectedDate = new Date(
                ticket.ExpectedDate + "Z"
              ).toLocaleDateString();

              //format date of request
              const formattedDateOfRequest = new Date(
                ticket.DateOfRequest + "Z"
              ).toLocaleDateString();

              // calculatePriority(ticket);
              console.log(ticket);

              return (
                <TouchableOpacity
                  style={styles.requestBox}
                  key={index}
                  onPress={() => {
                    navigation.navigate("Request Details", { ticket });
                  }}
                >
                  <View style={styles.content}>
                    <View style={styles.contentItem}>
                      <Text style={[styles.txt, { fontSize: 9 }]}>
                        {ticket.Fname} {ticket.Lname}
                      </Text>
                    </View>
                    <View style={styles.contentItem}>
                      <Text style={styles.txt}>{ticket.MailType}</Text>
                    </View>
                    <View style={styles.contentItem}>
                      <Text style={styles.txt}>{formattedDateOfRequest}</Text>
                    </View>
                    <View style={styles.contentItem}>
                      <Image
                        source={imageLookup[ticket.imageName]}
                        style={styles.alertIcon}
                      />
                    </View>
                    <View style={styles.contentItem}>
                      <Text style={styles.txt}>{ticket.Status}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        ) : (
          <Text
            style={{
              color: "gray",
              marginHorizontal: 10,
              textAlign: "center",
              marginTop: "50%",
            }}
          >
            No issues found
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResolveIssues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderBlockColor: "#fff",
    marginBottom: 30,
  },
  searchBar: {
    marginHorizontal: 10,
    height: 10,
    backgroundColor: "lightgray",
    alignContent: "center",
  },
  searchBarTxt: {
    fontSize: 10,
    // fontFamily: "FragmentMono-Regular",
    // textAlign: "center",
  },
  rows: {
    // marginHorizontal: 10,
  },
  labelHolder: {
    // marginHorizontal: 10,
    // alignSelf: "flex-end",
    flexDirection: "row",
    // borderBlockColor: "yellow",
    // borderWidth: 1,
    // width: "82%",
    justifyContent: "space-evenly",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  label: {
    flex: 1,
    textAlign: "center",
  },
  txt: {
    fontSize: 10,
    // fontFamily: "FragmentMono-Regular",
  },
  requestBox: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    // borderBlockColor: "yellow",
    // borderWidth: 1,
    alignItems: "center",
    // textAlign: "center",

    // justifyContent: "space-between",
  },
  contentItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 30,
    // borderColor: "yellow",
    // borderWidth: 1,
  },
  alertIcon: {
    height: 30,
    width: 30,
    alignSelf: "center",
    // borderColor: "yellow",
    // borderWidth: 1,
  },
});
