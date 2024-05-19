//screen to calculate and notify the admin of packages that are approaching their disposal date

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import {
  getPackagesStillStored,
  updateAllDeliveriesIsPickedUpToZero,
  deletePackage,
} from "../../databaseHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const StorageManagement = () => {
  const [storedPackages, setStoredPackages] = useState([]);
  const [expiringPackages, setExpiringPackages] = useState([]);
  const [notifiedPackages, setNotifiedPackages] = useState([]);

  useEffect(() => {
    //parse the database for all the packages stored that are not picked up
    getPackagesStillStored(setStoredPackages);

    return () => {
      //reset value of notifiedPackages on component unmount
      setNotifiedPackages([]);
    };
  }, []);

  //call findExceedingstorage when storedPackages is changed
  useEffect(() => {
    findExceedingStorage();
  }, [storedPackages]);

  //function to find all the packages approaching their disposal date
  const findExceedingStorage = () => {
    // packageArray stores packages expiring soon;
    const packageArray = [];

    //stamp the current date
    const currentDate = new Date();

    //for each of the packages still stored, find the ones near their expiration date
    storedPackages.map((storedPackage, index) => {
      //receive date package was scanned in
      const dateReceived = new Date(storedPackage.DateReceived);

      //set the expiration date of the package (normally 2 weeks)
      const disposalDate = new Date(dateReceived);
      disposalDate.setDate(dateReceived.getDate() + 14);

      // Calculate the difference between expiryDate and currentDate in milliseconds
      const timeDifference = disposalDate.getTime() - currentDate.getTime();

      // Convert the time difference to days
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      // Check if the difference is less than 2 days
      if (daysDifference <= 14) {
        // console.log("Package is expiring soon!");

        //add delivery to expiring packages array
        packageArray.push({
          storedPckg: storedPackage, //all package information stored here
          receivalDate: dateReceived.toLocaleDateString(), //stamp date package was received
          disposalDate: disposalDate.toLocaleDateString(), //stamp date package will be disposed
        });
      }

      //set expiringpackages to array of package objects that are expiring soon
      setExpiringPackages(packageArray);
    });
  };

  //notify the user that their package is about to be disposed
  const notifyUser = async (accID, packageID, fname, lname) => {
    //send alert to the user
    try {
      await AsyncStorage.setItem(`${accID}`, "true");
    } catch (e) {
      // Saving error
      Alert.alert(`Error notifying ${fname} ${lname} `, e.message);
    }

    //add package to array of 'notified' packages
    setNotifiedPackages([...notifiedPackages, packageID]);
  };

  //handle the disposal of a package
  const handleDispose = async (id) => {
    try {
      //delete the package from the databases
      await deletePackage(id);
      Alert.alert(
        "Success",
        "Package successfully deleted from database, handle package disposal accordingly."
      );

      //remove package from array of expiring packages
      setExpiringPackages(
        expiringPackages.filter(
          (expPackage) => expPackage.storedPckg.DeliveryID !== id
        )
      );
    } catch (error) {
      Alert.alert("Error", "Failed to delete package from database:", error);
    }
  };

  //render the page
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.boxContainer}>
          {/*display expiring packages*/}
          {expiringPackages.map((exp, index) => {
            const isNotified = notifiedPackages.includes(
              exp.storedPckg.DeliveryID
            );
            if (isNotified) {
              return null;
            }
            return (
              <View key={index} style={styles.storageBox}>
                <View style={styles.headers}>
                  <Text style={styles.hdrTxt}>
                    <Text style={{ fontWeight: "300" }}>Package ID:</Text>{" "}
                    {exp.storedPckg.DeliveryID}
                  </Text>
                  <Text style={styles.hdrTxt}>
                    <Text style={{ fontWeight: "300" }}>Owner:</Text>{" "}
                    {exp.storedPckg.Fname} {exp.storedPckg.Lname}
                  </Text>
                  <Text style={styles.hdrTxt}>
                    <Text style={{ fontWeight: "300" }}>Received:</Text>{" "}
                    {exp.receivalDate}
                  </Text>
                  <Text style={[styles.hdrTxt, styles.hdrTxtRed]}>
                    <Text style={{ fontWeight: "300" }}>Dispose:</Text>{" "}
                    {exp.disposalDate}
                  </Text>
                </View>
                <View style={styles.btnHolder}>
                  {/* FOR TESTING
                  <TouchableOpacity
                    style={styles.btn}
                    // onPress={() => {
                    //   updateAllDeliveriesIsPickedUpToZero();
                    // }}
                  >
                    <Text style={styles.btnTxt}>Resolve</Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() =>
                      notifyUser(
                        exp.storedPckg.AccID,
                        exp.storedPckg.DeliveryID,
                        exp.storedPckg.Fname,
                        exp.storedPckg.Lname
                      )
                    }
                  >
                    <Text style={styles.btnTxt}>Notify</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.btn, styles.btnRed]}
                    onPress={() => {
                      Alert.alert(
                        "Disposal Confirmation",
                        "Are you sure you want to dispose of this package?",
                        [
                          {
                            text: "Cancel",
                            style: "cancel",
                          },
                          {
                            text: "Dispose",
                            onPress: () => {
                              handleDispose(exp.storedPckg.DeliveryID);
                              console.log("Dispose pressed");
                            },
                            style: "destructive",
                            isPreferred: "true",
                          },
                        ]
                      );
                    }}
                  >
                    <Text style={[styles.btnTxt, styles.btnTxtRed]}>
                      Dispose
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
          {(expiringPackages.length === 0 ||
            notifiedPackages.length === expiringPackages.length) && (
            <View
              style={[
                styles.storageBox,
                {
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Text style={[styles.txt]}> No packages to display.</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StorageManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  boxContainer: {
    marginHorizontal: 10,
  },
  storageBox: {
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  headers: {
    flex: 2,
    justifyContent: "space-around",
  },
  hdrTxt: {
    fontSize: 13,
    paddingVertical: 2,
  },
  hdrTxtRed: {
    color: "red",
  },
  btnHolder: {
    flexDirection: "column",
    flex: 1,
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 5,
  },
  btn: {
    borderRadius: 5,
    backgroundColor: "lightgray",
    padding: 10,
    margin: 2,
  },
  btnRed: {
    backgroundColor: "red",
  },
  btnTxt: {
    textAlign: "center",
    fontSize: 10,
  },
  btnTxtRed: {
    color: "#fff",
  },
});
