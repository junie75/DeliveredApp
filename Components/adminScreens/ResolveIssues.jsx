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

const ResolveIssues = () => {
  let redIcon = "alertRed";
  let orangeIcon = "alertOrange";
  let greenIcon = "alertGreen";

  const [imageName, setImageName] = useState("");
  const [checked, setChecked] = useState(true);
  const toggleCheckbox = () => setChecked(!checked);

  const [helpTickets, setHelpTickets] = useState([]);
  const currentDate = new Date();

  useEffect(() => {
    //load all checkMailRequests upon loading
    getCheckMailRequests(setHelpTickets);
  }, []);

  //high priority: Urgent & require immediate attention // time > 72 hrs
  //medium priority: Moderately urgent // 72hrs > time > 48 hrs
  //low priority: Not urgent // 48 hrs > time > 24hrs
  const calculatePriority = (ticket) => {
    //convert expected date into a date object
    const expectedDate = new Date(ticket.ExpectedDate + "Z");

    //calculate difference between expected date of arrival and current date in milliseconds
    const timeDifference = currentDate.getTime() - expectedDate.getTime();

    //convert the time difference to days
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    if (daysDifference >= 3) return redIcon;
    else if (daysDifference < 3 && daysDifference >= 2) return orangeIcon;
    else return greenIcon;
    // console.log("Request ID:" + ticket.RequestID + "Day diff" + daysDifference);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <SearchBar
            placeholder="Search"
            lightTheme
            round
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchBar}
            inputStyle={styles.searchBarTxt}
          />
        </View>

        <View style={styles.labels}>
          <Text style={[styles.txt, { flex: 2, textAlign: "center" }]}>
            User{" "}
          </Text>
          <Text style={[styles.txt, { flex: 1 }]}>Request Date</Text>
          <Text style={[styles.txt, { flex: 1 }]}>Priority</Text>
        </View>
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

            //calculate priority
            // const priority = calculatePriority(ticket);
            // console.log(
            //   "Request ID:" + ticket.RequestID + " Priority:" + priority
            // );

            // switch (priority) {
            //   case "High":
            //     setImageName(redIcon);
            //   case "Medium":
            //     setImageName(orangeIcon);
            //   case "Low":
            //     setImageName(greenIcon);
            //   default:
            //     setImageName(null);
            // }
            // console.log("\n\n\n\n\n");
            // console.log("hi");

            return (
              <TouchableOpacity style={styles.requestBox} key={index}>
                <CheckBox
                  checked={false}
                  onPress={toggleCheckbox}
                  iconType="material-community"
                  checkedIcon="checkbox-marked"
                  uncheckedIcon={"checkbox-blank-outline"}
                />
                <View style={styles.content}>
                  <View style={styles.contentItem}>
                    <Text style={styles.txt}>
                      {ticket.Fname} {ticket.Lname}
                    </Text>
                  </View>
                  <View style={styles.contentItem}>
                    <Text style={styles.txt}>{formattedDateOfRequest}</Text>
                  </View>
                  <View style={styles.contentItem}>
                    <Image
                      source={imageLookup[calculatePriority(ticket)]}
                      style={styles.alertIcon}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Brock Olsen</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 03/12/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image
                  source={imageLookup[orangeIcon]}
                  style={styles.alertIcon}
                />
              </View>
            </View>
          </View>
          <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Josh Boston</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 03/20/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image
                  source={imageLookup[orangeIcon]}
                  style={styles.alertIcon}
                />
              </View>
            </View>
          </View>
          <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Riley Stewart</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 03/26/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image
                  source={imageLookup[orangeIcon]}
                  style={styles.alertIcon}
                />
              </View>
            </View>
          </View>

          <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Adam Norse</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 03/30/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image
                  source={imageLookup[greenIcon]}
                  style={styles.alertIcon}
                />
              </View>
            </View>
          </View>

          <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Terry Crews</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 03/30/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image
                  source={imageLookup[greenIcon]}
                  style={styles.alertIcon}
                />
              </View>
            </View>
          </View>

          <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Brett Foster</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 03/31/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image
                  source={imageLookup[greenIcon]}
                  style={styles.alertIcon}
                />
              </View>
            </View>
          </View>

          <View style={styles.requestBox}>
            <CheckBox
              checked={false}
              onPress={toggleCheckbox}
              iconType="material-community"
              checkedIcon="checkbox-marked"
              uncheckedIcon={"checkbox-blank-outline"}
            />
            <View style={styles.content}>
              <View style={styles.contentItem}>
                <Text style={styles.txt}>Tina Morris</Text>
              </View>
              <View style={styles.contentItem}>
                <Text style={styles.txt}> 04/01/24</Text>
              </View>
              <View style={styles.contentItem}>
                <Image
                  source={imageLookup[greenIcon]}
                  style={styles.alertIcon}
                />
              </View>
            </View>
          </View> */}
        </View>
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
    marginHorizontal: 15,
  },
  labels: {
    alignSelf: "flex-end",
    flexDirection: "row",
    // borderBlockColor: "yellow",
    // borderWidth: 1,
    // width: "82%",
    justifyContent: "space-between",
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
  txt: {
    fontSize: 10,
    fontFamily: "FragmentMono-Regular",
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
    justifyContent: "space-between",
  },
  contentItem: {
    flex: 1,
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
