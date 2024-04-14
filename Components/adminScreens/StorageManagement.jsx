import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import {
  getPackagesStillStored,
  updateAllDeliveriesIsPickedUpToZero,
} from "../../databaseHelper";

const StorageManagement = () => {
  const [storedPackages, setStoredPackages] = useState([]);
  const [expiringPackages, setExpiringPackages] = useState([]);

  //parse the database for all the packages stored
  useEffect(() => {
    getPackagesStillStored(setStoredPackages);
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
          storedPckg: storedPackage,
          receivalDate: dateReceived.toLocaleDateString(),
          disposalDate: disposalDate.toLocaleDateString(),
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
          {expiringPackages.map((exp, index) => (
            <View key={index} style={styles.storageBox}>
              <View style={styles.headers}>
                <Text style={styles.hdrTxt}>
                  Package ID: {exp.storedPckg.DeliveryID}
                </Text>
                <Text style={styles.hdrTxt}>Received: {exp.receivalDate}</Text>
                <Text style={[styles.hdrTxt, styles.hdrTxtRed]}>
                  Dispose: {exp.disposalDate}
                </Text>
              </View>
              <View style={styles.btnHolder}>
                <TouchableOpacity
                  style={styles.btn}
                  // onPress={() => {
                  //   updateAllDeliveriesIsPickedUpToZero();
                  // }}
                >
                  <Text style={styles.btnTxt}>Resolve</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btnTxt}>Notify</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.btn, styles.btnRed]}>
                  <Text style={[styles.btnTxt, styles.btnTxtRed]}>Dispose</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    flex: 3,
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
    flexDirection: "row",
    flex: 2,
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
    fontSize: 8,
    fontFamily: "FragmentMono-Regular",
  },
  btnTxtRed: {
    color: "#fff",
  },
});
