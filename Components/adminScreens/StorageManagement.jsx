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
    // console.log(storedPackages);

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
      // console.log(storedPackage.DateReceived);
      // console.log(dateReceived);
      // console.log(expiryDate);
      // console.log(packageArray);

      //set expiringpackages to array of package objects that are expiring soon
      setExpiringPackages(packageArray);
    });
  };

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

  const handleDispose = async (id) => {
    try {
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

  // const showExceedingStorage = () => {
  //   // findExceedingStorage();

  //   return expiringPackages.map((exp, index) => {
  //     <View key={index} style={styles.storageBox}>
  //       <View style={styles.headers}>
  //         <Text style={styles.hdrTxt}>
  //           Package ID: {exp.storedPckg.DeliveryID}
  //         </Text>
  //         <Text style={styles.hdrTxt}>Received: 03/31/2024</Text>
  //         <Text style={[styles.hdrTxt, styles.hdrTxtRed]}>
  //           Dispose: 04/13/2024
  //         </Text>
  //       </View>
  //       <View style={styles.btnHolder}>
  //         <TouchableOpacity style={styles.btn}>
  //           <Text style={styles.btnTxt}>Resolve</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={styles.btn}>
  //           <Text style={styles.btnTxt}>Notify</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={[styles.btn, styles.btnRed]}>
  //           <Text style={[styles.btnTxt, styles.btnTxtRed]}>Dispose</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>;
  //   });

  // let notifications = [];
  // for (let i = 0; i < 5; i++) {
  //   notifications.push(
  //     <View key={i} style={styles.storageBox}>
  //       <View style={styles.headers}>
  //         <Text style={styles.hdrTxt}>Package ID: 8117654</Text>
  //         <Text style={styles.hdrTxt}>Received: 03/31/2024</Text>
  //         <Text style={[styles.hdrTxt, styles.hdrTxtRed]}>
  //           Dispose: 04/13/2024
  //         </Text>
  //       </View>
  //       <View style={styles.btnHolder}>
  //         <TouchableOpacity style={styles.btn}>
  //           <Text style={styles.btnTxt}>Resolve</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={styles.btn}>
  //           <Text style={styles.btnTxt}>Notify</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={[styles.btn, styles.btnRed]}>
  //           <Text style={[styles.btnTxt, styles.btnTxtRed]}>Dispose</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
  // }

  // return notifications;
  // };

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
                    Package ID: {exp.storedPckg.DeliveryID}
                  </Text>
                  <Text style={styles.hdrTxt}>
                    Owner: {exp.storedPckg.Fname} {exp.storedPckg.Lname}
                  </Text>
                  <Text style={styles.hdrTxt}>
                    Received: {exp.receivalDate}
                  </Text>
                  <Text style={[styles.hdrTxt, styles.hdrTxtRed]}>
                    Dispose: {exp.disposalDate}
                  </Text>
                </View>
                <View style={styles.btnHolder}>
                  {/* <TouchableOpacity
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
                            // onPress: () => {
                            //   // console.log("cancel pressed");
                            //   // navigation.navigate("Admin Home");
                            // },
                            style: "cancel",
                          },
                          {
                            text: "Dispose",
                            onPress: () => {
                              handleDispose(exp.storedPckg.DeliveryID);
                              console.log("Dispose pressed");
                              // console.log(myDB);
                              // console.log(accounts);
                              // navigation.navigate("Choose Delivery");
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
    // marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  headers: {
    flex: 2,
    // paddingLeft: 10,
    justifyContent: "space-around",
    // borderColor: "yellow",
    // borderWidth: 1,
  },
  hdrTxt: {
    // textAlign: "center",
    // marginLeft: 10,
    fontSize: 12,
    fontFamily: "FragmentMono-Regular",
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
    // columnGap: 5,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  btn: {
    borderRadius: 5,
    backgroundColor: "lightgray",
    padding: 10,
    margin: 2,
  },
  btnRed: {
    backgroundColor: "red",
    // color: "#fff",
  },
  btnTxt: {
    fontSize: 10,
    fontFamily: "FragmentMono-Regular",
  },
  btnTxtRed: {
    color: "#fff",
  },
  txt: {
    fontFamily: "FragmentMono-Regular",
  },
});
